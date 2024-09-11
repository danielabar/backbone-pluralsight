var myModel = new Backbone.Model()
myModel.set('content', 'this is some content')

// Creates a new DOM element
var myView = new Backbone.View({
  model: myModel,
  className: 'model-object'
})

$('body').prepend(myView.el)

// Creates markup
// <body>
//  <div class="model-object"></div>
//  <div id="test"> Test content </div>
// </body>
