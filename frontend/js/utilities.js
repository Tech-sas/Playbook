// based off of http://stackoverflow.com/a/10372280/938089
/**
 * Execute Web Workers without external files

    Usage is as really simple:

    callableWebworker = webwork(callback);

    - callback takes a single data argument and should return the result
    - callableWebworker is a function that takes the data to send and
    - a node style callback ie function(err, result) {}

    usage:

    var worker = webwork(function (data) {
        return "!!" + data  + "!!";
    });

    worker("Test123", function(err, result) {
        if (err) return alert("goodWorker Errored with " + err.message);
        alert("first goodWorker returned with " + result);
    });

 */

function webwork(callback) {
    // URL.createObjectURL
    window.URL = window.URL || window.webkitURL;

    var response = "onmessage=function(event){postMessage(" + callback + "(event.data));}";

    var blob;
    try {
        blob = new Blob([response], {
            type: 'application/javascript'
        });
    } catch (e) { // Backwards-compatibility
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(response);
        blob = blob.getBlob();
    }

    return function() {
        var worker = new Worker(URL.createObjectURL(blob));
        var args = Array.prototype.slice.call(arguments);
        var callback
        var ran;
        if (typeof args[args.length - 1] === 'function') {
            callback = args.pop();
        } else {
            callback = function() {};
        }

        worker.onmessage = function(e) {
            if (ran) {
                return;
            }
            ran = true;
            callback(null, e.data);
        };
        worker.onerror = function(e) {
            if (ran) {
                return;
            }
            ran = true;

            callback(e);
            return false;
        };
        worker.postMessage.apply(worker, args);
    }
}

/**
 * HTML5 audio/video API reference: http://www.w3schools.com/tags/ref_av_dom.asp
 */

function prepEnvironment() {
    // Disable selecting of text
    // document.onselectstart = function() {
    //     return true;
    // }

    // Break out of frames

    function bust() {
        document.write = "";
        window.top.location = window.self.location;
        setTimeout(function() {
            document.body.innerHTML = ''
        }, 0);
        window.self.onload = function(evt) {
            document.body.innerHTML = ''
        }
    }

    if (window.top !== window.self) {
        try {
            if (window.top.location.host) {} else {
                bust()
            }
        } catch (ex) {
            bust()
        }
    }

    // Disable Context Menu
    // document.oncontextmenu = function() {
    //     return false;
    // }

    // Disable dragging of HTML elements
    document.ondragstart = function() {
        return false;
    }
}

function getOffset(el) {
    var offsetTop = 0,
        offsetLeft = 0;
    do {
        if (!isNaN(el.offsetTop)) {
            offsetTop += el.offsetTop;
        }
        if (!isNaN(el.offsetLeft)) {
            offsetLeft += el.offsetLeft;
        }
    } while (el = el.offsetParent)

    return {
        top: offsetTop,
        left: offsetLeft
    }
}

function scrollBodyTo(to, duration, callback) {
    var start = window.scrollY,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime <= duration) {
            requestAnimationFrame(animateScroll);
        } else {
            callback && callback();
        }
    };
    requestAnimationFrame(animateScroll);
}

function setDisqus(path, url) {
    loader.load({
        url: '//' + window.disqus_shortname + '.disqus.com/embed.js'
    }).then(function() {
        DISQUS.reset({
            reload: true,
            config: function() {
                this.page.identifier = path.replace(" ", "-");
                this.page.url = (url || window.site_url) + "/#!" + path;
            }
        });
    })
}

function debounce(func, wait) {
    var timeout, result;
    return function() {
        var context = this,
            args = arguments;

        var later = function() {
            timeout = null;
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Use custom easing to animate the window's navigation to a certain px margin
 */

function tween(obj, prop, to, duration, callback) {
    var start = parseFloat(obj[prop]),
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animate = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        obj[prop] = val;
        if (currentTime <= duration) {
            requestAnimationFrame(animate);
        } else {
            callback && callback();
        }
    };
    requestAnimationFrame(animate);
}

function browserIs(test, modifiers) {
    var ua = navigator.userAgent,
        modifiers = modifiers || "i",
        isSafari = new RegExp(test, modifiers).test(ua);
    return isSafari;
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function makeOpaque(element) {
    $.setStyles(element, "visibility", "visible");
    $.write(function() {
        $.setStyles(element, "opacity", 1);
    })
}

/**
 * set the window's title
 */

function setTitle(title) {
    title && (document.title = title);
}

/**
 * add the 'loaded' class to an image when it finishes loading
 */

function imgLoaded(element) {
    element.onload = function() {
        $.addClass(element, "loaded");
    };
}

/**
 * load images lazily
 */

function LazyLoadImages(element) {
    var _element = element || document,
        imgs;

    $.read(function() {
        imgs = _element.getElementsByTagName('img');
        if (imgs && imgs.length) {
            for (var i = 0, len = imgs.length; i < len; i++) {
                (function(img) {
                    var data = img.getAttribute('data-src');
                    if (data) {
                        $.write(function() {
                            img.src = data;
                            imgLoaded(img);
                        });
                    }
                })(img[i]);
            }
        }
    })
}

/**
 * animate something in with simple css animation
 */

function fadeIn(element) {
    $.addClass(element, "fadeIn");
}

/**
 * empty an element
 */

function emptyElement(el) {
    forEach(el.children, function(child, i) {
        el.removeChild(child);
    })
}

/**
 * Google Analytics
 */

function InitGoogleAnalytics(ua, url) {
    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', ua, url);
    ga('send', 'pageview');
}

/**
 * returns an object with the js, DOM, css vendor prefix strings
 * @return {Object}
 */

function getVendorPrefix() {
    var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
            .call(styles)
            .join('')
            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
}

/**
 * fetches and stores a template file for use with doT.js / <insert templating lib here>
 */

function loadTemplate(template, cache) {
    var result,
        promise = new loader.promise.Promise();
    if (loader.textInjection) {
        result = loader.get(template);
    }
    if (!result) {
        loader.promise.get(template).then(function(error, result) {
            loader.set(template, result);
            cache && (cache[template] = result);
            promise.done(null, result);
        });
    } else {
        promise.done(null, loader.get(template));
    }
    return promise;
}


/**
 * The App Class.
 */

function App() {
    this.init();
    marked.setOptions({
        sanitize: false,
        smartLists: true,
        smartypants: true
    });
    this.ready = new this.loader.promise.Promise();
}

App.prototype.loader = new Loader();
App.prototype.listTemplate = "{{~it :value:index}}<li><a href='#/{{=value.url}}'><i>{{=value.tag}}</i> {{=value.title}}</a></li>{{~}}";
App.prototype.selectors = {
    sidebar: '.sidebar',
    header: '.header',
    content: '.content',
    ul: '.sidebar > ul.optimized'
}
App.prototype.elements = {}

App.prototype.findElements = function(selectors) {
    var self = this;
    _.each(selectors || this.selectors, function(selector, key) {
        self.elements[key] = document.querySelector(selector);
    })
}

App.prototype.loadArchive = function() {
    var self = this;
    this.loader.promise.get('/archive.json', null, null, true).then(function(error, data) {
        if (error) throw new Error(error);
        self.setArchive(data);
    })
}

App.prototype.setArchive = function(data) {
    var self = this;
    self.archive = JSON.parse(data);
    _.each(self.archive, function(item, index) {
        item.contents = unescape(item.contents);
        item.html = marked(item.contents);
        item.contents = item.contents.replace(/[^0-9a-z ']/igm, ' ');
        item.url = (item.dir + '/' + item.filename + item.extname).replace('/', '--');
        var tag = /\d+/ig.exec(item.dir);
        tag = tag.length ? tag[0] : '00';
        item.tag = tag;
        item.title = item.title || item.dir.replace(/^\d+-/, '').replace(/-/igm, ' ');
        /// set tag and title
    });
    self.ready.done();
    self.setSidebar(self.archive);
}

App.prototype.setSidebar = function(data) {
    var templateFn = doT.template(this.listTemplate),
        resultHtml = templateFn(data || {});

    var self = this;
    $.addClass(self.elements.ul, 'hidden');
    debounce(function() {
        self.elements.ul.innerHTML = resultHtml;
        $.write(function() {
            $.removeClass(self.elements.ul, 'hidden');
        });
    }, 50)();
}

App.prototype.init = function() {
    this.findElements();
    this.loadArchive();
    this.initEvents();
}

App.prototype.initEvents = function() {
    var self = this;
    $.on('keyup', '.filter_articles', function() {
        self.filter(this.value);
    }, this.elements.sidebar)
    $.on('click', '.filter_articles', function() {
        this.value = '';
        self.filter(this.value);
    }, this.elements.sidebar)
    $.on('click', 'a', function(e) {
        var existsOnPage = null,
            hash = this.href.replace(location.origin + '/', '');
        try {
            existsOnPage = self.elements.content.querySelectorAll(hash);
            window.location.hash = '#/' + self.currentFilename + '/' + hash;
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        } catch (e) {
            // window.location = this.href;
        }
    }, this.elements.content)
}

App.prototype.find = function(filename) {
    var selectedItems = _.filter(this.archive, function(item) {
        return (item.dir + '/' + item.filename + item.extname).replace('/', '--') === filename;
    });
    return selectedItems.length ? selectedItems[0] : false;
}

App.prototype.show = function(filename, section, force) {
    var self = this;
    this.ready.then(function() {
        var selected = self.find(filename);
        self.selected = selected;
        if (!selected) {
            window.location = '#/';
            throw new Error('Article not found: ' + filename);
        }
        self.setContent(selected, section, force);
    });
}

App.prototype.filter = debounce(function(str) {
    var keywords = str.replace(/[^0-9a-z ']/igm, ' ').split(' ').filter(function(el) {
        return !!el;
    });
    if (!str.length || !keywords.length) {
        this.setFilteredItems([]);
        _.each(this.archive, function(article) {
            article._html = article.html;
        })
        this.show(this.selected.url, null, true);
        return;
    }
    var filteredItems = _.filter(this.archive, function(article) {
        var highlightedHtml = article.html;
        var result = _.reduce(keywords, function(memo, value, index) {
            var regex = new RegExp(value, 'igm'),
                regex2 = new RegExp('>(.*?)(' + value + ')(.*?)<', 'igm'),
                matches = regex.exec(article.contents);

            highlightedHtml = highlightedHtml.replace(regex2, '>$1<span class="highlighted">$2</span>$3<');
            return memo + (matches ? matches.length : 0);
        }, 0);
        article._html = highlightedHtml;
        return result;
    });
    this.setFilteredItems(filteredItems);
    this.show(this.selected.url, null, true);
}, 150);

App.prototype.showFirst = function() {
    var self = this;
    this.ready.then(function() {
        if (!self.archive.length) return;
        self.show(self.archive[0].url);
    });
}

App.prototype.setContent = function(article, section, force) {
    var self = this;

    function cb() {
        if (section) {
            var _section = document.querySelector(section);
            if (_section) {
                var section_offset = getOffset(_section).top - self.elements.header.offsetHeight - 10;
                scrollBodyTo(section_offset, 150);
            } else {
                scrollBodyTo(section_offset, 0);
            }
        }
    }

    if (self.currentFilename !== article.url || force) {
        $.addClass(self.elements.content, 'hidden');
        debounce(function() {
            self.elements.content.innerHTML = article._html || article.html;
            $.write(function() {
                $.removeClass(self.elements.content, 'hidden');
                self.setActiveItem(article);
                cb && cb();
            });
        }, 250)();
    } else {
        cb && cb();
    }

    self.currentFilename = article.url;
}

App.prototype.setActiveItem = function(selected, _class) {
    _class = _class || 'active';
    var url = selected ? selected.url : null;
    _.each(this.elements.ul.children, function(el) {
        if (!url || el.children[0].href.indexOf(url) == -1) {
            $.hasClass(el, _class) && $.removeClass(el, _class);
        } else {
            !$.hasClass(el, _class) && $.addClass(el, _class);
        }
    });
}

App.prototype.setFilteredItems = function(filtered) {
    var self = this,
        _class = 'filtered';
    _.each(this.elements.ul.children, function(el) {
        var ulHasAFilteredItem = _.any(filtered, function(item) {
            return el.children[0].href.indexOf(item.url) !== -1;
        });
        if (ulHasAFilteredItem) {
            !$.hasClass(el, _class) && $.addClass(el, _class);
        } else {
            $.hasClass(el, _class) && $.removeClass(el, _class);
        }
    });
}
