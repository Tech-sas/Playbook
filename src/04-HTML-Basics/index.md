---
type: [ beginner ]
---
In this section, students will be creating their first webpages with a focus on learning HTML markup.

## What is HTML?

HTML stands for HyperText Markup Language. Let's ignore the HyperText part and focus on the ML (Markup Language).

Markup is a method to help a computer identify content. Markup involves wrapping content with **tags**. So if we want to identify a section of text as a paragraph, then we would wrap the text in `<p></p>` tags.

~~~
<p>I am a paragraph of text.</p>
~~~

### Remember to close tags!

~~~
<h1>Cool awesome title!

<p>Oh no! I forgot the closing tag on my h1!</p>
~~~

Cool fact: Not all tags require closing tags. But most of the tags you are using today do, so practice closing those tags.

## Breaking down a newspaper

Now look at a newspaper and as a group identify the different types of content. How would you markup the newspaper?

- What is the heading for the newspaper? That would be the `h1`.
- What about images?
- Paragraphs?
- Subheaders?

## Beginner HTML tags

There are many HTML tags, each with their own use, meaning, and purpose. When building web apps, however, you'll see a few tags used over and over again.

Make a new webpage and try using each of these tags:

* `html`
* `body`
* `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
* `p`
* `ul`
* `ol`
* `li`

If you are having problems coming up with content for your webpage, try making a cookie recipe webpage like: http://allrecipes.com/recipe/best-chocolate-chip-cookies/

## Using an img tag

If you want to show an image, we need to use the `img` tag. We can't repesent that image as text, so we need to point to the picture we want to display.

We do this by setting the `src` attribute on an `img` tag.

~~~
<img src="YOUR_FILE.png" />
~~~

The image you want to use should be in the same directory as your webpage. You also need the filename + the correct extension. Don't be afraid to ask your instructor for help. :)

## Link all things

Having one webpage would be boring, we need to be able to navigate to other webpages. For this we use the `a` tag and set the `href` attribute.

Create another webpage and then add links to navigate back and forth.

~~~
<a href="your_other_page.html">Click here to go to my other page</a>
~~~

Links can also be to other websites. To link to YouTube we would add:

~~~
<a href="http://www.youtube.com">Click here to go to YouTube</a>
~~~

## MOAR tags!

Knowledge of all modern HTML is, of course, crucial, we are not going to list all the tags available, but here are some more common tags you will run into.

* `head`
* `title`
* `script`
* `link`
* `meta`
* `a`
* `span`
* `div`
* `form`
* `input`
* `textarea`
* `button`

This is a good time to ask your instructor about these tags.

## What's HTML5?

You probably have heard of HTML5 but didn't know what the big fus is all about. HTML5 added more tags so that web developers can more easily identify content for browsers.

As a web developer, it is exciting because it means we have more tools in our toolbox!

Here are a few of the new tags:

* `article`
* `navigation`
* `video`
* `header`
* `footer`
* `canvas`
* **AND MORE**
