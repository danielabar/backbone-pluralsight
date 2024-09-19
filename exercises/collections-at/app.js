var collection = new Backbone.Collection([
  {name: 'Fred', age: 6},
  {name: 'Sue', age: 29},
  {name: 'Dave', age: 74}
])

// first model in collection
console.log(JSON.stringify(collection.at(0))) // {"name":"Fred","age":6}

// last model in collection
console.log(JSON.stringify(collection.at(collection.length - 1))) // app.js:11 {"name":"Dave","age":74}
