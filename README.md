<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Backbone.js Fundamentals](#backbonejs-fundamentals)
  - [Intro](#intro)
  - [Models](#models)
    - [Purpose of Models](#purpose-of-models)
    - [Defining New Model Types](#defining-new-model-types)
    - [Instantiating Models](#instantiating-models)
    - [Inheritance](#inheritance)
    - [Attributes](#attributes)
    - [Events](#events)
    - [Identity](#identity)
    - [Defaults](#defaults)
    - [Validation](#validation)
    - [toJSON](#tojson)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Backbone.js Fundamentals

Learning Backbone with Pluralsight. [Docs](https://backbonejs.org/#)

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

### Purpose of Models

- Models form core of application
- Contain state, logic, behaviour
- Single point of truth for data
- Provide a lifecycle
- Communicate state changes to app by raising events -> changes to a model can ripple through app without direct coupling

### Defining New Model Types

[Example](define-model-type/defineModelType.js)

* Create new Model types by extending Backbone.Model.
* Argument passed to `extend` method is an object containing configuration of new model type.
* Passing empty object `{}` results in a new model type that behaves exactly the same as `Backbone.Model`
* `extend()` function shared by Model, Collection, Router, View: Establishes inheritance relationship between two objects

```javascript
// `Vehicle` is a new constructor function that inherits from `Backbone.Model`
// Starts with uppercase `V` -> convention for constructor function naming in JS
var Vehicle = Backbone.Model.extend({
  prop1: '1'
})

// Create a few model instances
var v = new Vehicle();
var v2 = new Vehicle();

// modify a property
v.prop1 = 'one';

console.log(v.prop1) // one
console.log(v2.prop1) // 1
```

Can also define class properties with a second argument to `extend()`. They become available on the type rather than instances of the type:

```javascript
var Vehicle = Backbone.Model.extend({}, {
  summary: function() {
    return 'Vehicles are for travelling'
  }
})

Vehicle.summary() // Vehicles are for travelling
```

### Instantiating Models

To create a new model object, call its constructor function with the `new` operator

If there's nothing unique about your model, no need to define a custom model type, just use `Backbone.Model`:

```javascript
var myModel = new Backbone.Model()
```

Usually will be using custom types:

```javascript
var Vehicle = Backbone.Model.extend({})
var ford = new Vehicle()
```

Common pattern is to instantiate model with property values:

```javascript
var model = new Backbone.Model({
  name: 'Jane',
  age: 52
})
```

If model type has an `initialize` function, it gets called when model is instantiated:

```javascript
var Vehicle = Backbone.Model.extend({
  initialize: function() {
    console.log('vehicle created')
  }
})

var ford = new Vehicle() // vehicle created
```

### Inheritance

Models can inherit from other models:

```javascript
var Vehicle = Backbone.Model.extend({})
var Car = Vehicle.extend({})
```

```javascript
var A = Backbone.Model.extend({
  initialize: function() {
    console.log('initialize A')
  },

  asString: function() {
    return JSON.stringify(this.toJSON())
  }
})

var a = new A({
  one: '1',
  two: '2'
}) // initialize A
console.log(a.asString()) // {"one":"1","two":"2"}

var B = A.extend({})
var b = new B({
  three: '3'
}) // initialize A -> B inherits A's constructor
console.log(b.asString()) // {"three":"3"} -> B inherits A's asString function
```

Use `instanceof` operator to see the type of objects:

```javascript
console.log(b instanceof B) // true
console.log(b instanceof A) // true
console.log(b instanceof Backbone.Model) // true
console.log(a instanceof A) // true
console.log(a instanceof Backbone.Model) // true
console.log(a instanceof B) // false
```

### Attributes

Attributes hold a model's data.

Can be set by passing an object ot a model type's constructor, or using `set` method, which accepts a name and value:

```javascript
var ford = new Vehicle()
ford.set('type', 'car')
```

Can also set multiple properties at once:

```javascript
ford.set({
  'maximumSpeed': '99',
  'color': 'blue'
})
```

Access attribute values with `get` method:

```javascript
ford.get('type') // car
```

`escape` method is similar to `get`, but output is HTML escaped, useful for preventing XSS:

```javascript
ford.set('description', '<script>alert("script injection!"</script>')
ford.escape('description') // &lt;script&gt;alert(&quot;script injection!&quot;&lt;/script&gt;
```

**Demo**

```javascript
var Vehicle = Backbone.Model.extend({
  dump: function() {
    console.log(JSON.stringify(this.toJSON()))
  }
})

var v = new Vehicle({
  type: 'car'
})
v.dump() // {"type":"car"}

v.set('color', 'blue')
v.dump() // {"type":"car","color":"blue"}

v.set({
  description: "<script>alert('injection!')</script>",
  weight: 1750
})
v.dump() // {"type":"car","color":"blue","description":"<script>alert('injection!')</script>","weight":1750}

$('body').append(v.get('description')) // pops up browser alert box!
$('body').append(v.escape('description')) // outputs escaped value in the DOM
```

**Test for an Attribute**

Given a model object, how to know whether it contains an attribute or not? Use `has` predicate method:

```javascript
var ford = new Vehicle()
ford.set('type', 'car)
ford.has('type') // true
ford.has('year') // false
```

### Events

[Demo](demos/demos.js)

Models raise events when their state changes -> valuable feature.

This is why you have to use `get` and `set` functions when working with model attributes, so Backbone has a chance to raise events as part of these functions.

To detect a change to a model, listen for `change` event, using `on` function. First arg to `on` is event to listen for, second arg is function to execute when that event is triggered:

```javascript
ford.on('change', function() {
  // do something
})
```

`change` event is triggered anytime the model is changed.

Can also listen to change to a specific property using "event namespacing":

```javascript
ford.on('change:color', function() {
  // do something when color property of ford model instance has changed
})
```

Note that if color property of `ford` model is changed, will trigger *both* `change:color` and `change` events:

```javascript
var ford = new Backbone.Model({
  type: 'car',
  color: 'blue'
})

// bind event handler to change event
ford.on('change', function() {
  console.log('something changed')
})

// register another event handler, but only for changes to color attribute
ford.on('change:color', function() {
  console.log('color changed')
})

// trigger non-color event
ford.set('type', 'scooter') // something changed

// trigger color change event
ford.set('color', 'red') // color changed, something changed
```

**Custom Model Events**

[Example](custom-events/app.js)

Powerful tool for decoupling components.

Can define, trigger, and observe custom model events.

Events are identified by string identifiers.

Convention is to namespace events using `:`.

Use `on` method to bind to an event.

Second argument to `on` function is a callback that will be executed when event is triggered:

```javascript
ford.on('retired', function() {
  // do something when custom `retired` event is triggered
})
```

Use `trigger` method to trigger a custom event. Any arguments following event name are forwarded to event handler:

```javascript
ford.trigger('retired')
```

There's also an `off` method to remove event handler.

`on`, `off`, and `trigger` methods are provided by [Backbone.Events](https://backbonejs.org/#Events) module. Can be included in any JavaScript object, not just Backbone Models.

```javascript
// Using underscore's extend function, which is similar to Backbone's extend
// We extend an empty object, then mixin Backbone.Events
var volcano = _.extend({}, Backbone.Events)
// now volcano has functions: bind, off, on, once, trigger, unbind, etc

// Register an event handler for a custom event
// Using namespacing convention: The event is `eruption` and it's in the `disaster` namespace
volcano.on('disaster:eruption', function(options) {
  if (options) {
    console.log('duck and cover - ' + options.plan)
  } else {
    console.log('duck and cover')
  }
})

// Trigger our custom event
volcano.trigger('disaster:eruption') // duck and cover

// Can also forward additional arguments to event handler
volcano.trigger('disaster:eruption', {plan: 'run'}) // duck and cover - run

// Remove all event handlers for the `disaster:eruption` event
volcano.off('disaster:eruption')
volcano.trigger('disaster:eruption') // nothing happens
```

### Identity

**Model Identity**

`id` property is model's persistent identity and is unique.

`id` is `undefined` until model has been saved, meaning saved on server, at this point, the model's `id` gets populated with the server's `id` for this model.

`cid` is temporary identifier used until model gets assigned `id`

Model objects have `isNew()` function to test if model has `id` or not, i.e. has it been saved to server or not.

```javascript
var ford = new Backbone.Model({})
ford.id // undefined
ford.cid // c0
ford.isNew() // true
```

### Defaults

`defaults` property specifies default values for attributes that are not set in the constructor.

Useful for documenting a model type's properties.

```javascript
var Vehicle = Backbone.Model.extend({
  defaults: {
    'color': 'white',
    'type': 'car'
  }
})

// Create a new Vehicle model, but do not initialize any values in constructor.
var car = new Vehicle()
car.get('color') // white
car.get('type') // car
```

### Validation

[Example](validation/app.js)

Backbone provides two functions for model validation:

1. `validate` Tests validity of model and returns errors if any are found.
2. `isValid` Returns boolean true/false if model is currently valid according to the `validate` method

A model can become invalid for example, if `set(...)` is called in a way that does not trigger validation.

`validate` is called by Backbone prior to performing `set` or `save` operations.

Actually, requires `{validate: true}` option passed to `set` if you want to trigger validation. See [Model validate docs](https://backbonejs.org/#Model-validate) for details.

If call `save` and model is invalid, operation is cancelled and error event is triggered on model.

To add validation on model, must provide implementation of `validate` method when declaring model type.

`validate` method will be called with a hash of the model instance's attributes.

Must register an error event handler on the model instance to detect validation issues.

Callback that handles validation errors gets called with a reference to the model instance that raised the error, and the error. TODO: What if there's more than one validation error???

```javascript
var Vehicle = Backbone.Model.extend({
  validate: function (attrs) {
    console.log('=== RUNNING VEHICLE VALIDATION ===')
    // Define array of valid colors
    var validColors = ['white', 'red', 'blue', 'yellow']

    // Define function to validate model color
    var colorIsValid = function(attrs) {
      // if `color` attribute is not set, that's valid
      if (!attrs.color) return true

      // return true only if the model's color is one of validColors
      return _(validColors).include(attrs.color)
    }

    // Now we can use the colorIsValid function
    if (!colorIsValid(attrs)) {
      return "color must be one of: " + validColors.join(", ")
    }
  }
})

var car = new Vehicle()

// Used to be `error`, now its `invalid`
car.on('invalid', function(model, error) {
  console.log(error)
  // handle validation errors here
})

// no validation errors because we don't have any rules for the `foo` attribute
car.set('foo', 'bar')
console.log(car.isValid()) // true

// populate a valid color
car.set('color', 'blue')
console.log(car.isValid()) // true
console.log(car.get('color')) //blue

// populate a invalid color
car.set('color', 'pink')
console.log(car.isValid()) // false, color must be one of: white, red, blue, yellow
console.log(car.get('color')) // pink -> in this case, it did populate an invalid color

// try validate option
car.set('color', 'mauve', {validate: true}) // color must be one of: white, red, blue, yellow
console.log(car.get('color')) // pink -> because we passed validate option, it hangs on to last set color
```

### toJSON

WIP...
