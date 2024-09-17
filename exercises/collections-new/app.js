// Simplest case
var collection = new Backbone.Collection()
console.log(JSON.stringify(collection)) // []

// Custom collection type
var Vehicles = Backbone.Collection.extend({})
// Create instance of our custom collection type
collection = new Vehicles([
  new Backbone.Model({label: 'A'}),
  new Backbone.Model({label: 'B'})
])
console.log(JSON.stringify(collection)) // [{"label":"A"},{"label":"B"}]
