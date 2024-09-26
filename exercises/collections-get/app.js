var collection = new Backbone.Collection([
  { name: 'Fred', age: 6}
])

console.log(collection.at(0).cid) // c1

// getByCid not a function!
console.log(JSON.stringify(collection.getByCid('c1')))
