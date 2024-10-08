var collection = new Backbone.Collection()

collection.on('change', function(model, options) {
  console.log(JSON.stringify(model) + ' changed')
})

var model = new Backbone.Model();
collection.add(model)

collection.on('change:name', function(model, options) {
  console.log(JSON.stringify(model) + ' name property changed')
})

model.set('age', 57) // {"age":57} changed
model.set('name', 'Jimmy') // {"age":57,"name":"Jimmy"} name property changed
