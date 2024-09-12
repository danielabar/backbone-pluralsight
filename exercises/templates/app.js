var V = Backbone.View.extend({
  el: 'body',
  render: function() {
    // declare data object that template will use
    var data = { lat: -27, lon: 153 }

    // compile the template
    var compiledTemplate = _.template('<%= lat %> <%= lon %>');

    // set html content of view's element
    // invoke compiledTemplate with data
    this.$el.html(
      compiledTemplate(data)
    );
    return this;
  }
})

// Instantiate new instance of the above view and render it
var v = new V();
v.render();
