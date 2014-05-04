//requestAnimationFrame polyfill
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc) {
    if (win.addEventListener) return; //No need to polyfill

    function docHijack(p) {
        var old = doc[p];
        doc[p] = function(v) {
            return addListen(old(v))
        }
    }

    function addEvent(on, fn, self) {
        return (self = this).attachEvent('on' + on, function(e) {
            var e = e || win.event;
            e.preventDefault = e.preventDefault || function() {
                e.returnValue = false
            }
            e.stopPropagation = e.stopPropagation || function() {
                e.cancelBubble = true
            }
            fn.call(self, e);
        });
    }

    function addListen(obj, i) {
        if (i = obj.length)
            while (i--) obj[i].addEventListener = addEvent;
        else obj.addEventListener = addEvent;
        return obj;
    }

    addListen([doc, win]);
    if ('Element' in win) win.Element.prototype.addEventListener = addEvent; //IE8
    else { //IE < 8
        doc.attachEvent('onreadystatechange', function() {
            addListen(doc.all)
        }); //Make sure we also init at domReady
        docHijack('getElementsByTagName');
        docHijack('getElementById');
        docHijack('createElement');
        addListen(doc.all);
    }
})(window, document);

if(!window.debounce){
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
}

if(!window.extend) {
    function extend(){
        var args = [].slice.call(arguments);
        var result = args[0] || {};
        var numArgs = args.length;

        for(var i = 1; i < numArgs; i++){
            var arg = args[i];
            for(var key in arg){
                if(arg.hasOwnProperty(key)){
                    result[key] = arg[key];
                }
            }
        }

        return result;
    }
}

if(!window.bind){
    function bind(fn, context /**, args **/ ) {
        var args = [].slice.call(arguments);
        args.splice(0, 2);
        return function() {
            fn.apply(context, args.concat([].slice.call(arguments)));
        }
    }
}

if(!window.forEach){
    function forEach(arr, cb) {
        arr = arr instanceof Array ? arr : [].slice.call(arr);
        for (var i = 0, len = arr.length; i < len; i++) {
            cb(arr[i], i);
        }
    }
}
