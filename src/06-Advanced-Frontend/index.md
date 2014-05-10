---
type: [ coach ]
---

This is a list of topics, with links/resources and discussion points for the Advanced discussions.

## Overview

The topics here will be focused around:

- Advanced HTML and CSS topics
- Some JavaScript-y things, mostly native non-framework stuff

## Vertically Centering things with CSS

![](http://cl.ly/image/2t3B103x0k3a/Screen%20Shot%202014-05-09%20at%2010.46.26%20AM.png)

```
.absolutely-centered {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
```

## Responsive CSS Grids

Especially when using `Bootstrap`/`ZURB`/`<insert random CSS framework here>`, CSS can sometimes feel like this:

![](http://cl.ly/image/3B1h212J2219/css.gif)

As an example of something using a custom grid: [Dropbox folder](https://www.dropbox.com/sh/sw9vo2ccryi412g/U5nY195nB5).


```
/**
 * ------------------------------------------------------- grids
 */
 .grid {
    text-align: justify;      /* <<----- really important, spreads items equally across the whole row */
    line-height: 0;
}

.grid > * {
    display: inline-block;
    text-align: left;
    vertical-align: top;
    line-height: 1.5em;
    position: relative;
}

.grid:after {
    content: '';
    display: inline-block;
    width: 100%;
    font-size: 0.1px;
}
/**
 * ------------------------------------------------------- 2 columns
 */
 .grid-2 > * {
    width: 50%;
}
/**
 * ------------------------------------------------------- 3 columns
 */
 .grid-3 > * {
    width: 33.3%;
}
```

In your HTML:

```
<div class="grid grid-2">
	<a href="#">...</a>
	<a href="#">...</a>
</div>
```

**Bonus:** make the grid collapse based on width of the device:

```
@media (max-width: 800px) {
	/* make a grid into a 1 column grid at < 800px */
    .grid-1-800 > * {
        width:100%;
    }
}
```

And just add the class to the element:

```
<div class="grid grid-2 grid-1-800"> <!-- this works because of "CSS precedence", the more rules, the more priority a style carries -->
	<a href="#">...</a>
	<a href="#">...</a>
</div>
```

## The Float-Label Pattern

Example: [Codepen](http://codepen.io/matthiasak/pen/nkChz).

## ng-di

### Angular-esque Dependency Injection

```
function Injector(){}
Injector.prototype.dependencies = {};
Injector.prototype.run = function(target){
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var text = target.toString();
    var args = text.match(FN_ARGS)[1].split(',');
    target.apply(target, this.getDependencies(args));
}
Injector.prototype.getDependencies = function(arr) {
    var self = this;
    return arr.map(function(value) {
        return self.dependencies[value];
    });
}
Injector.prototype.inject = function(name, dependency) {
    this.dependencies[name] = dependency;
}
```

Define two objects with a function `greet()`:

```
var RobotGreeter = {
  greet: function() {
    return 'Domo Arigato';
  }
};

var OtherGreeter = {
    greet: function() {
      return 'That will do pig.';
    }
};
```

Randomly register a different greeter to show that WelcomeController is truly dynamic:

```
var ninja = new Injector();
ninja.inject('Greeter', Math.random() > 0.5 ? RobotGreeter : OtherGreeter);

function WelcomeController(Greeter) {
    alert(Greeter.greet());
}

ninja.run(WelcomeController);
```

## An intro to CSS4, and Myth.io

[Myth.io - the CSS Post Processor of your dreams](http://www.myth.io/)

## CSS Animations

- Keyframe syntax - [Chris Coyier on CSS Keyframe Animations](http://css-tricks.com/snippets/css/keyframe-animation-syntax/)
- Tweenable Properties - [Brad Shaw](http://css3.bradshawenterprises.com/transitions/)
- CSS Transforms - [Brad Shaw](http://css3.bradshawenterprises.com/transforms/)

## Layout Cost and High Performance CSS

Browsers render to the screen in this order:

1. Recalculate styles (box model - width, height, etc)
2. Layout (figure out positioning)
3. Paint (create a bitmap to be sent to the GPU)
4. Composite Layers **where GPU acceleration happens** (the GPU transposes images on top of each other to render)

![](http://cl.ly/image/0W260K3K3s3h/talks-css-rendering-process.png)

Styles that, when changed, trigger a new `layout()`:

![](http://cl.ly/image/0f0b0J1r2X2I/talks-css-layout.png)

Styles that, when changed, trigger a new `paint()`:

![](http://cl.ly/image/2S2E0L1F0A2O/talks-css-paint.png)

Styles that, when changed, only trigger a new `compose()`:

![](http://cl.ly/image/3P3y2F0V3Y1R/talks-css-GPU-accelerated.png)

Want to `debug` your CSS? Try Continuous Paint Mode:

![](http://cl.ly/image/20161X0F200e/talks-css-chrome-continuous-paint.png)

## jQuery is Dead, Long Live jQuery

**jQuery.** It is the heart and soul of the web developer's toolkit, and more importantly the bread-and-butter of the JavaScript arsenal.

What is the first import or `<script>` tag you typically make? We're probably in the same boat, you and I.

Here's a list of some of my favorite jQuery features:

1. DOM selection!

	~~~
	$('tag')
	$('.class')
	$('#id')
	$('img[alt]')
	~~~

2. Toggling classes

	~~~
	$('#id').addClass('activeClass')
	$('#id').removeClass('activeClass')
	~~~

3. DOM manipulation!

	~~~
	var $el = $('<span>some text!</span>')
	$('#id').append($el)
	~~~

4. Events!

	~~~
	$(#id').on('click', 'button', function(){
		//--> handle click element
	})
	~~~

Now, all of the wonderful utilities jQuery provides are nice — however jQuery has proven to be slower than I previously thought. When is the last time you understood what your jQuery code did under the hood?

There is a nice spread of native JavaScript functions that provide us with a fast and very clean way to query and manipulate the DOM. Moreover, by demystifying the magic behind jQuery, I will introduce you and get you started on the process of optimizing your JavaScript with minimal effort.

Obviously native methods are faster than jQuery methods. That is because jQuery provides a plethora of ways to do the same thing, and supports really old browsers while doing so. This is by no means an anti-jQuery book, but understanding how to use C++ methods provided by your browser will give you a tremendous performance boost. What is our responsibility is knowing when to do this, and knowing why.

### Replacing Common jQuery Uses with Faster Native Procedures

jQuery's core functionality revolves around selections. This involves querying the DOM for elements that match a particular CSS selector.

For example:

~~~
var $el = $('#id')
	, $el2 = $('.someClass')
	, $el3 = $('div', '.someClass')
	, $el4 = $el3.children('span')
	, $el5 = $el2.filter('button')
	, $el6 = $el5.filter('[type=submit]');
~~~

> **TIP:** I like to name any elements that represent DOM elements or jQuery selections with a $ prepended to the name. This implies what the object references. Moreover, this helps me understand what the code does, especially when reviewing thousands of lines of code.

---

Selectors can take a CSS string and will retrieve the elements in the DOM that match that selector. This can be done in-part with a handful of native JavaScript functions supported by pretty much every browser you can think of. All but one of the following is supported by IE8:

1. `document.getElementById()`
2. `document.getElementsByClassName()` (IE9+)
3. `document.getElementsByTagName()`
4. `document.querySelector()`
5. `document.querySelectorAll()`

We will address each of these by comparing with common jQuery uses.

**Get all `<DIV>`s on a page**

~~~
/* jQuery */
$("div")

/* native equivalent */
document.getElementsByTagName("div")

/* or */
document.querySelectorAll("div")
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/get-all-divs-on-a-page](http://jsperf.com/get-all-divs-on-a-page).

**Get all by CSS class**

~~~
/* jQuery */
$(".my-class")

/* native equivalent */
document.querySelectorAll(".my-class")

/* FASTER native equivalent (IE9+) */
document.getElementsByClassName("my-class")
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/get-all-divs-by-class-on-a-page](http://jsperf.com/get-all-divs-by-class-on-a-page).

**Get by CSS selector**

~~~
/* jQuery */
$(".my-class li:first-child")

/* native equivalent */
document.querySelectorAll(".my-class li:first-child")

/* FASTER native equivalent */
var $els = document.getElementsByClassName("my-class")
	, result = []
	, $el;

for(var i = 0, len = $els.length; i < len; i++){
	($el = $els[i].firstChild) && $el.tagName === "LI" && result.push($el);
}
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/get-by-css-selector](http://jsperf.com/get-by-css-selector).

**Get first by CSS selector**

~~~
/* jQuery */
$(".my-class").get(0)

/* jQuery alternative */
$(".my-class").first()

/* native equivalent */
document.querySelector(".my-class")

/* FASTER native equivalent */
document.getElementsByClassName("my-class")[0]
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/get-first-by-css-selector](http://jsperf.com/get-first-by-css-selector).

**Append HTML elements**

~~~
var html_string = "<div id='myDiv'><img src='...'/></div>",
	$body = $("body");

/* jQuery */
$("body").append(html_string);

/* jQuery alternative */
$body.append(html_string);

/* POOR native equivalent */
document.body.innerHTML += html_string;

/* GOOD native equivalent */
var myDiv = document.createElement("div")
        , im = document.createElement("img");

myDiv.id = "myDiv";
im.src = "im.gif";
myDiv.appendChild(im);
document.body.appendChild(myDiv);

/* MUCH BETTER native equivalent */
var frag = document.createDocumentFragment()
	, myDiv = document.createElement("div")
	, im = document.createElement("img");

myDiv.id = "myDiv";
im.src = "im.gif";
myDiv.appendChild(im);
frag.appendChild(myDiv);
document.body.appendChild(frag);
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/append-html-elements](http://jsperf.com/append-html-elements).

**Prepend HTML elements**

~~~
/* jQuery */
$("body").prepend("<div id='myDiv'><img src='...'/></div>");

/* POOR native equivalent */
document.body.innerHTML = "<div id='myDiv'><img src='...'/></div>" + document.body.innerHTML;

// MUCH BETTER native equivalent (same as append example except for last line)
document.body.insertBefore(frag, document.body.firstChild);
~~~

**Adding a CSS class**

~~~
var el = document.querySelector(".main-content")
	, $el = $(el);

/* jQuery */
$(el).addClass("someClass");

/* native equivalent (IE9+) */
el.classList.add("someClass");

/* native equivalent (IE8-) */
el.className += " someClass";
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/adding-a-css-class](http://jsperf.com/adding-a-css-class).

**Removing a CSS class**

~~~
/* jQuery */
$(".main-content").removeClass("someClass");

/* native equivalent (IE9+) */
var el = document.querySelector(".main-content");
el.classList.remove("someClass");

/* native equivalent (IE8-) */
el.className = el.className.replace("someClass", "");
~~~

**Testing for a CSS class**

~~~
/* jQuery */
if($(el).hasClass("someClass")){
	...
}

/* native equivalent (IE9+) */
if(el.classList.contains("someClass")){
	...
}

/* native equivalent (IE8-) */
if(el.className.match(new RegExp("((someClass(\s))|((\s)someClass))")).length > 0){
	...
}
~~~

**Setting multiple CSS properties**

~~~
// get reference to a DOM element
var el = document.querySelector(".main-content")
	, $el = $(el);

/* jQuery */
$el.css({
	background: "#FF0000",
	"box-shadow": "1px 1px 5px 5px red",
	width: "100px",
	height: "100px",
	display: "block"
});

/* native equivalent */
el.style.background = "#FF0000";
el.style.width = "100px";
el.style.height = "100px";
el.style.display = "block";
el.style.boxShadow = "1px 1px 5px 5px red";
~~~

Want to compare the speed of these? Check this guy out: [http://jsperf.com/setting-multiple-css-properties](http://jsperf.com/setting-multiple-css-properties).

#### Want more? see [YouMightNotNeedjQuery](http://youmightnotneedjquery.com/) [Vanilla-js](http://vanilla-js.com/)

## The Triforce - Promises, Pubsub, and Client-side Routing

See [Building Your Own Single Page App Framework](http://matthiasak.github.io/Building-an-SPA-Framework/)

Monolithic Frameworks vs. DIY approach:

![](http://cl.ly/image/472M1a1d352d/talks-big-vs-micro-frameworks.png)

## Polyfills and you

- [CanIUseIt!?!?!?](http://caniuse.com)
- [Modernizr and Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)

## How JavaScript Prototypes Work

[Link to blog post](http://www.toptal.com/javascript/javascript-prototypes-scopes-and-performance-what-you-need-to-know)

## LocalStorage

- [CanIUse?](http://caniuse.com/#feat=namevalue-storage)
- [Demo](http://html5demos.com/storage)

## Chrome Debugging and Breakpoints

- [Google Dev Blog](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging)