var FormView = Backbone.View.extend({
  // Define DOM events for this view
  events: {
    'click .clickable': 'handleClick', // Listen for clicks on elements with the `clickable` class and call `handleClick`
    'change': 'handleChange' // Listen for change event on ALL elements within this view because there's no selector
  },

  // Define the render function to update the HTML content of the view
  render: function() {
    // Set the inner HTML of the view's element with two input fields
    this.$el.html('<input type="text" class="clickable" placeholder="clickable" /> <input type="text" />')
    return this // Return the view instance for method chaining
  },

  // Event handler for when a clickable element is clicked
  handleClick: function () {
    console.log('handleClick')
  },

  // Event handler for when ANY element in the view triggers a change event
  handleChange: function() {
    console.log('handleChange')
  }
})

// Create a new instance of FormView
var fv = new FormView()

// Append the rendered view to the body element in the DOM
$('body').append(fv.render().el)

// Renders markup as shown below
//
// when the first input is clicked on, `handleClick` is printed to console
// when second input is clicked on, nothing happens
//
// In dev tools Elements -> Event Listeners, can see `click` event with pointer to
// app.js:11 line where `handleClick` function is defined.
//
// Also both inputs have a `change` handler defined,
// try typing into them and hitting Enter or Tab -> triggers change event
//
// <body>
//   <div>
//     <input type="text" class="clickable" placeholder="clickable">
//     <input type="text">
//   </div>
// </body>
