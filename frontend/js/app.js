!(function(win, undefined) {
    var styles = [{
        url: '/css/normalize.css'
    }, {
        url: '/css/main.css'
    }, {
        url: '/css/skin.css'
    }];

    var js = [{
        url: '/js/polyfills.js'
    }, {
        url: '/js/FastQuery.js'
    }, {
        url: '/js/keymage.min.js'
    }, {
        url: '/js/marked.js'
    }, {
        url: '/js/path.min.js'
    }, {
        url: '/js/utilities.js'
    }, {
        url: '/js/routes.js'
    }, {
        url: '/js/lodash.js'
    }, {
        url: '/js/doT.min.js'
    }];

    // {
    //     url: '/bower_components/doT/doT.min.js'
    // },

    // UNCOMMENT to turn on loading cached files from Local Storage (performance boost √)
    // loader.textInjection = true;

    loader.load.apply(loader, styles.concat(js)).then(function() {
        extend(win, {
            disqus_shortname: 'tiyacademyplaybook',
            site_url: location.origin
        });

        makeOpaque(document.body);

        //FastQuery!
        win.$ = new FastQuery();

        //setup some interaction controls
        prepEnvironment();

        //setup vendor prefix for JS-accessible CSS prefixes
        win.vendorPrefix = getVendorPrefix();

        //initialize the router
        debounce(InitRoutes, 60)();

        //The googs
        // InitGoogleAnalytics('UA-47597209-1', 'academy-campus-playbook.herokuapp.com');
    });
})(this, undefined);
