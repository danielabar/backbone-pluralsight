var v = new Backbone.View({el: 'body'})
console.log(v.el) // <body>...</body>
console.log(typeof v.el) // object
console.log(v.$el)
console.log(v.$el.html()) // inside contents of body: <div id="test">...</div>
