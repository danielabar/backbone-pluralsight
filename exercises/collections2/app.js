var Vehicle = Backbone.Model.extend({})

var Vehicles = Backbone.Collection.extend({
  model: Vehicle
})

var vehicles = new Vehicles([
  { color: 'blue' },
  { color: 'red' }
])

console.log(vehicles.length) // 2

// serialize second element in collection
console.log(JSON.stringify(vehicles.at(1))) // {"color":"red"}

// serialize entire collection
console.log(JSON.stringify(vehicles)) // [{"color":"blue"},{"color":"red"}]
