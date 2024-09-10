<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Backbone.js Fundamentals](#backbonejs-fundamentals)
  - [Intro](#intro)
  - [Models](#models)
    - [Overview](#overview)
    - [Defining New Model Types](#defining-new-model-types)
    - [Instantiating Models](#instantiating-models)
    - [Inheritance](#inheritance)
  - [Views](#views)
  - [Templating](#templating)
  - [Routing](#routing)
  - [Collections](#collections)
  - [Connecting to a Server](#connecting-to-a-server)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Backbone.js Fundamentals

Learning Backbone with Pluralsight.

## Intro

Course using Backbone.js v0.9.2, should work up to v 1.4.0

Latest as of 2024-08-28 is https://www.npmjs.com/package/backbone/v/1.6.0

Backbone is not a *framework* and not MVC, not MVVM.

Backbone is a *library* of tools to help build a richer web.

NOTE: A framework calls your code, whereas with libraries, your code calls the library.

Frameworks control how you design app - eg where what kind of files should go, and how to do things. Useful for getting started quickly, but not very flexible.

Provides structure to web apps with:
1. Models with key-value bindings and custom events
2. Collections with enumerable functions
3. Views with declarative event handling
4. Connects to a REST style JSON API

It's about moving state away from back-end/server and into client/browser.

**Anatomy of a Backbone.js Application**

When user navigates to app on their browser, the entire app is downloaded to their computer.

App consists of:
* Router(s) for handling page transitions
* View(s) for rendering models
* Model(s) for representing data in application
* Collection(s) for managing many models at once

Server is responsible for serving initial application, then providing RESTful endpoints serving JSON data over HTTP.

**Pros**

* Fast (initial cost of downloading entire app but can be cached for subsequent visits)
* JSON models transferred asynchronously so user hardly ever has to wait
* Highly interactive
* Scalable because a lot of work transferred to client, server only provides REST API

**Cons**

* Not indexed by search engines (requires additional effort)
* Difficult to test because most code depends on DOM, and there will be lots of interactions between components
* Security issues - entire app source is sent to all users

**Why Backbone?**

![backbone structure](doc-images/backbone-structure.jpg "backbone structure")

- Models represent data required by app
- Models hold app data, and raise events when data changes
- Collections group models, also forward events for models they contain, can also raise events of their own
- Collections depend on Models
- Backbone connects components indirectly via events
- Events travel in opposite direction to dependency shown
- Views handle events from Models and Collections
- Views responsible for rendering markup
- Views are the only Backbone component that interacts with the DOM
- Views can also handle events from DOM
- Routers simulate page changes, and provide support for page history and bookmarks

**Dependencies**

1. Underscore.js
2. jQuery (for DOM and ajax)

**Minimal Backbone.js Environment**

```htm
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My App</title>

    <!-- jQuery 1.7.2 CDN -->
    <script src="https://code.jquery.com/jquery-1.7.2.min.js"></script>

    <!-- Underscore.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.6/underscore-min.js"></script>

    <!-- Backbone.js CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.1/backbone-min.js"></script>
  </head>
  <body>
  </body>
</html>
```

With the above running in the browser via a static web server `npx http-server`, open browser dev tools Console:

`Backbone` is an Object that is in scope. It has properties for Collection, Events, Model, Router, etc.

`Backbone.Model` is a function, function is a JavaScript constructor for creating new model objects. Eg:

```javascript
var book = new Backbone.Model({
  title: 'White Tiger',
  author: 'Aravind Adiga'
})
book.get('title') // White Tiger
book.set('title', 'The Stripey Tiger')
book.toJSON() // {title: 'The Stripey Tiger', author: 'Aravind Adiga'}
```

Backbone models do not store user provided attributes as properties on the object, rather they provide a `get` method that must be used. Similarly, use `set` method to write a property.

**A Backbone Example**

[Example](simple-example/index.html)

Let's build a simple app to render rectangles on a canvas. Rectangles will be Backbone models:
- rectangle has width and height
- rectangle has position
- rectangle has color

Will use a Backbone view for rendering a rectangle model.

Disable caching when running static server to immediately see js changes:
```bash
npx http-server -c-1
```

## Models

### Overview



### Defining New Model Types

### Instantiating Models

### Inheritance

## Views

## Templating

## Routing

## Collections

## Connecting to a Server
