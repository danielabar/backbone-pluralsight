// a view that auto refreshes when its model data changes
// use `initialize` method to setup binding to the model
// `this.model` is how to reference the view's model
// when the model changes, we want to re-render the view
// need to pass the view object `this` to the model's `on` method to set the context for the event handler
var RefreshingView = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', function() {
      this.render();
    }, this)
  },

  // access the views jQuery wrapped element with `this.$el`
  // use jQuery's `html` function to replace the contents of the element
  // specifically we replace the content with the model's `text` property.
  render: function() {
    this.$el.html(this.model.get('text'))
  }
})

// Create a new model with a `text` property that is the current date
var m = new Backbone.Model({
  text: new Date().toString()
})

// Create an instance of the RefreshingView with the model we just created
// And the element being the document body
var rf = new RefreshingView({
  model: m,
  el: 'body'
})

// Now let's render the view
rf.render()

// To demonstrate auto updating view, use a timer to keep updating the model every second
setInterval(() => {
  m.set('text', new Date().toString())
}, 1000);

// Renders and updates every one second:
// <body>
//  <text>Thu Sep 12 2024 08:37:20 GMT-0400 (Eastern Daylight Time)</text>
// </body>

// Refreshing page updates the date display
// NOTE: <text>...</text> is NOT a valid html element
