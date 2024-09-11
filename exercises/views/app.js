var V = Backbone.View.extend({
  tagName: 'li',
  id: 'thing',
  className: 'active',
  attributes: {
    'data-value': 12345
  }
})

var v = new V()
$('body').prepend(v.el)

// Renders markup
// <body>
//   <li data-value="12345" id="thing" class="active"></li>
// </body>
