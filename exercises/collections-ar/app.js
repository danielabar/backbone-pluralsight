var collection = new Backbone.Collection()
collection.add(new Backbone.Model({name: 'Fred', age: 6}))
console.log(JSON.stringify(collection)) // [{"name":"Fred","age":6}]

// Not necessary to add Backbone model, can also add plain JavaScript object
// Collection will transform the plain JavaScript object into a Backbone Model
collection.add({name: 'Jane', age: 7})
console.log(JSON.stringify(collection)) // [{"name":"Fred","age":6},{"name":"Jane","age":7}]

// Can add array of Backbone Models
collection.add([
  new Backbone.Model({name: 'Sue', age: 28}),
  new Backbone.Model({name: 'Dave', age: 74})
])

// Models are listed in the order in which they were added to the collection
console.log(JSON.stringify(collection)) // [{"name":"Fred","age":6},{"name":"Jane","age":7},{"name":"Sue","age":28},{"name":"Dave","age":74}]

// Can add array of plain JS objects
collection.add([
  {name: 'Lisa', age: 1},
  {name: 'Sarah', age: 2}
])
console.log(JSON.stringify(collection))
// [{"name":"Fred","age":6},{"name":"Jane","age":7},{"name":"Sue","age":28},{"name":"Dave","age":74},{"name":"Lisa","age":1},{"name":"Sarah","age":2}]

collection.remove(collection.at(1))
console.log(JSON.stringify(collection))
// removed second element which was Jane
// app.js:28 [{"name":"Fred","age":6},{"name":"Sue","age":28},{"name":"Dave","age":74},{"name":"Lisa","age":1},{"name":"Sarah","age":2}]

// When model is added to collection, it triggers the `add` event that you can optionally handle
collection.on('add', function(model, col, options) {
  console.log('added ' + model.get('name') + ' at index ' + options.index)
})
collection.add({name: 'Troy', age: 12}) // added Troy at index undefined
// NOTE: options.index only populated if used `at` option when calling collection.add


// when adding, can also specify an options obj
collection.add({name: 'Eric', age: 64}, {at: 3}) // added Eric at index 3
console.log(JSON.stringify(collection))
// NOTE that index is 0-based
// [{"name":"Fred","age":6},{"name":"Sue","age":28},{"name":"Dave","age":74},{"name":"Eric","age":64},{"name":"Lisa","age":1},{"name":"Sarah","age":2},{"name":"Troy","age":12}]

// Use `silent` option to avoid triggering the `add` event
collection.add({name: 'Erica', age: 74}, {at: 3, silent: true})
console.log(JSON.stringify(collection))
// [{"name":"Fred","age":6},{"name":"Sue","age":28},{"name":"Dave","age":74},{"name":"Erica","age":74},{"name":"Eric","age":64},{"name":"Lisa","age":1},{"name":"Sarah","age":2},{"name":"Troy","age":12}]
