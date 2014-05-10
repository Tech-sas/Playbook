---
type: [ beginner ]
---

In this section, students will be styling the pages they worked on in previous section about HTML basics.

## What are styles?

HTML provides the meaning for the content, but doesn't dictate how that content should be displayed in a browser. If you want to change your `h1`'s color to green, you will update it's style.

~~~
  <h1 style='color: green'>I am green now!</h1>
~~~

Updating an HTML element's style using the `style` attribute, is called setting an **inline style**.

Using inline styles, change the style on your webpage using some of these options:

- color
- font-size
- text-align
- margin
- font-family
- background

## Hex-a-what?

Browsers have been coded to understand some basic colors like red, green, blue, etc. But what about all the different shades of color out there. A computer doesn't understand "off white with a hint of green".

To set more specific colors, we provide a hexadecimal number. It sounds complex but is really quite simple. We have three different colors we mix together to form other colors. The values can be between 0 and 255.

Hexadecimal is a shorthand / computer friendly way of representing numbers between 0-255.

Why 255? Because computers think in binary 1 or 0 (on or off). So data is stored in squares of little bits. 4 bits = byte. 2^16 = 256 = 255 + 1 (the 0)

~~~
Red   Green   Blue
0-255 0-255 0-255
00-FF 00-FF 0-FF
~~~

Flash back to when you were in elementary art and working with paints. If you wanted to create a purple, what two colors would you mix? ... Red and Blue right?

So if we want to make our h1 have purple background, we would set that by using:

~~~
  <h1 style="background: #880088">I have a purple background</h1>
~~~

You would read the hexadecimal color like: `88` red, `00` green, and `88` blue.


You can also use `rgb(150, 0, 150)` to set a color. Hexadecimal is just the most common / preferred way of identifying colors. So when in Rome, do as the Romans: Use hexidecimals to identify colors.

Use hexadecimal colors to change the text color and backgrounds on different HTML tags on you webpage.

## Style tag

Besides adding styles inline as an attribute on the HTML tag, you can create styles inside a `style` tag.

~~~
<style>
  h1 {
    color: #FF0000;
  }
</style>
~~~

Generally, you place the `style` tag inside a `head` tag of your webpage. So at a high level, your webpage would have this general structure:

~~~
<html>
  <head>
    <style>
      YOU CAN PUT YOUR STYLES HERE
    </style>
  </head>
  <body>
    YOUR CONTENT GOES HERE
  </body>
</html>
~~~

Now, move your styles from being inline to being inside a `style` tag in your webpage's `head` tag.

## Grouping styles with classes

Currently we can change the style of any HTML element. But what if you want to have some elements styled different than others?

With html, we can set classes on our HTML elements and then style the classes. With classes we can even share styles between different HTML elements.

~~~
<style>
  .red-is-best {
    color: #FF0000;
  }
</style>
~~~
~~~
<h1>I am not red</h1>
<h1 class="red-is-best">I am red!</h1>
<p class="red-is-best">I am red too!</p>
~~~

Give your styles classes and update your HTML.

## Cascading Styles

Styles can also be inherited from parent elements. HTML is hierarchical. That means that HTML tags can be within other HTML tags.

Besides adding extra meaning to the content, this is helpful when wanting to change the styles of groups of HTML elements.

~~~
<style>
  .important {
    font-weight: bold;
    font-size: 36px;
  }
</style>
~~~

~~~
<div class="important">
  This is important so it is bold and has a large font size.
  <p>
    I am imporant too and inherit the style from my parent element.
    <p>And another p tag inside this p tag inherits the same style because the style cascades down.</p>
  </p>
</div>
~~~

As you can see, styles are inherited and are said to **cascade** down. 
