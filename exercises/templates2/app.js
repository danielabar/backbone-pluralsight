var V = Backbone.View.extend({
  render: function() {
    // declare data object that template will use
    var data = { lat: -27, lon: 153 }

    // read template string from DOM
    var template = $('#latlon-template').html()
    console.log(template)

    // compile the template
    var compiledTemplate = _.template(template);

    // set html content of view's element
    // invoke compiledTemplate with data
    this.$el.html(
      compiledTemplate(data)
    );
    return this;
  }
})

// Instantiate new instance of the above view and render it
var v = new V({el: 'body'});
v.render();
