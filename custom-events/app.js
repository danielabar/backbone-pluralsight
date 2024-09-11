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
