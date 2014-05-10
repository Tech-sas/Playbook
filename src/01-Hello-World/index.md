---
type: [ beginner ]
---

Hello! You are about to learn about making a web page using HTML and CSS.

## Why the web?

Before we start teaching the wonderful world of web development, let's try to
inspire you with the why.

The web is a very interesting place, for many different reasons.  It is a
platform that unifies all computers, tablets, and smart phones.  There is no
other single technology that you can learn to accomplish the same reach of a
web app.  Web apps work everywhere.

This is why so many are betting on the web, and why the developer community is
thriving.  The web developer culture is one of openness, sharing, and brilliance.
StackOverflow will answer most of your questions, and nearly every tool you
need to use to build a state of the art app is free and open source.

Welcome to the modern utopia of web development!  Let's get started.

## Create your first page

Create an empty folder anywhere and create an `index.html` file inside it with _Sublime
Text Editor_. Paste the following text:

```
<html>
  <head>
  <title>This is my page title</title>
  </head>
  <body>
    Hello World!
  </body>
</html>
```


### View the file in Chrome

Now open the file in a web browser but dragging it into the browser window. You should see this!

![00](00.png)

### Review

You just created a web page using "HTML".

- Notice that everything inside `<` and `>` denotes special code. For example, everything inside `<html>` and `</html>` denotes an HTML page.
- Likewise, everything inside `<title>` and `</title>` will be the title of the web page (see it in the screenshot above?)
- Everything inside `<body>` and `</body>` will constitute the actual content of the page.

You should start noticing a pattern here. Everything inside `<SOMETHING>` and `</SOMETHING>` will be used for a certain purpose, depending on its name.

## Manipulate content

Now let's change the body a little bit.

### Edit the file

Edit the content of `index.html` to be the following:

```
<html>
  <head>
  <title>This is my page title</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    This is a web page.
  </body>
</html>
```

### View the file in Chrome

![01](01.png)

### Review

Notice that the "Hello World!" is bigger than the rest of the text.

This is because we wrapped "Hello World!" in `<h1>` and `</h1>`, which is used to denote top-level header text.

In the next section, we will learn more about different HTML tags.
