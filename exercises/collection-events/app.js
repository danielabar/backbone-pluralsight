var collection = new Backbone.Collection()

var model = new Backbone.Model({name: 'Sue', age: 29})

collection.on('add', function(model, _collection) {
  console.log(JSON.stringify(model) + ' added')
})

collection.add(model) // {"name":"Sue","age":29} added

collection.on('remove', function(model, _collection) {
  console.log(JSON.stringify(model) + ' removed')
})

collection.remove(model) // {"name":"Sue","age":29} removed
