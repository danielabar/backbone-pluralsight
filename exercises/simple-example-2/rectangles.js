(function () {

  // Extend an empty JS object
  var Rectangle = Backbone.Model.extend({})

  // The view is responsible for providing a visual representation of the Rectangle model.
  // We must specify some properties, plus any number of arbitrary functions
  var RectangleView = Backbone.View.extend({
    // type of element to be rendered for this view
    tagName: 'div',

    // css class that will be added to the element for this view
    className: 'rectangle',

    // declare events that this view responds to, and what it should do
    events: {
      'click': 'move'
    },

    // `render` function is called to render this view to the DOM
    render: function() {
      // call some custom functions
      this.setDimensions()
      this.setPosition()
      this.setColor()

      // convention: return the view object
      return this;
    },

    // `this.$el` returns a jQuery wrapped element for this view
    // `this.model` returns the model associated with this view
    setDimensions: function() {
      this.$el.css({
        width: this.model.get('width') + 'px',
        height: this.model.get('height') + 'px'
      })
    },

    setPosition: function() {
      var position = this.model.get('position')
      this.$el.css({
        left: position.x,
        top: position.yk
      })
    },

    setColor: function() {
      this.$el.css('background-color', this.model.get('color'))
    },

    // Move element 10px to the right relative to where it is currently.
    move: function() {
      this.$el.css('left', this.$el.position().left + 10)
    }
  })

  // Define an array of models
  var models = [
    new Rectangle({
      width: 100,
      height: 60,
      position: { x: 300, y: 150 },
      color: 'rebeccapurple'
    }),
    new Rectangle({
      width: 26,
      height: 300,
      position: { x: 500, y: 75 },
      color: 'coral'
    }),
    new Rectangle({
      width: 300,
      height: 70,
      position: { x: 310, y: 200 },
      color: 'mediumaquamarine'
    })
  ]

  // Render a view for each model and append to the canvas element
  _(models).each(function(model) {
    $('div#canvas').append(new RectangleView({ model: model }).render().el)
  })
k})();
