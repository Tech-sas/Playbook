var Metalsmith = require('metalsmith'),
    templates = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    handlebars = require('handlebars'),
    watch = require('watch');

var path = require('path'),
    basename = path.basename,
    dirname = path.dirname,
    extname = path.extname;

var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    overrider = require('method-override'),
    http = require('http'),
    myth = require('myth'),
    fs = require('fs'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

function addMetadata() {
    return function(files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            var data = files[file],
                dir = dirname(file),
                ext = extname(file),
                filename = basename(file, ext);
            data.dir = dir;
            data.extname = ext;
            data.filename = filename;
        });
    };
}

handlebars.registerHelper('jsonEscape', function(str) {
    return escape(str);
});

function convertArchiveToJson(options) {
    var keys = [];

    console.log('Converting archive to JSON.')

    return function(files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            if (!isArchive(file)) return;
            var data = files[file];
            var dir = dirname(file);
            var name = basename(file, extname(file)) + '.json';
            if ('.' != dir) name = dir + '/' + name;
            delete files[file];
            files[name] = data;
        });
    };
}

function isArchive(file) {
    return /archive.md/.test(file);
}

function isCSS(file) {
    return /.css/.test(file);
}

// express server

function checkForTIY(obj) {
    return obj.emails.filter(function(email) {
        return email.value.indexOf('@theironyard.com') !== -1;
    });
}

function build() {
    Metalsmith(__dirname)
        // .use(watch({}))
        .use(addMetadata())
        .use(collections({
            archive: {
                pattern: '*/*.md',
                sortBy: 'dir'
            }
        }))
        .use(convertArchiveToJson())
        .use(templates('handlebars'))
        .destination('./build')
        .build();
}

function startWatching() {
    var watch = require('watch')
    watch.createMonitor(__dirname+'/src', function(monitor) {
        monitor.on("created", function(f, stat) {
            // Handle new files
            build();
        })
        monitor.on("changed", function(f, curr, prev) {
            // Handle file changes
            build();
        })
        monitor.on("removed", function(f, stat) {
            // Handle removed files
            build();
        })
    })
}

build();
startWatching();

// if (cluster.isMaster) {
// Fork workers.
// for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
// }
//     cluster.on('exit', function(worker, code, signal) {
//         console.log('worker ' + worker.process.pid + ' died');
//         cluster.fork();
//     });
// } else {
// }

var app = express();

// all environments
app.set('port', parseInt(process.env.PORT || 3000));

var isProd = ('production' === process.env['ENV']),
    url = isProd ? 'http://techsas-playbook.herokuapp.com' : 'http://localhost:' + app.get('port');

app.get("*.css", function(req, res) { //*.css
    var path = __dirname + '/frontend' + req.url;
    fs.readFile(path, "utf8", function(err, data) {
        if (err) return;
        res.header("Content-type", "text/css");
        try {
            res.send(myth(data));
        } catch (e) {
            console.log(e);
            res.send(data);
        }
    });
});

app.use(cookieParser());
app.use(bodyParser());
app.use(overrider());
app.use(session({
    key: 'rabdargab',
    secret: 'aijnsdias d8sah89 dhas8hd9 auhsid jnskaj ndhoauhsohd0u a9u9 U)*UADIAjsouih a90ud9su0 aj',
    cookie: {
        httpOnly: false,
        maxAge: 5 * 60 * 1000,
        path: '/'
    }
}));

app.get('/', function(req, res) {
    res.sendfile('./views/app.html');
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'src_images')));

app.listen(app.get('port'), function() {
    console.log('now listening on:', app.get('port'));
});
