var Vehicle = Backbone.Model.extend({
  prop1: '1'
})

var Vehicles = Backbone.Collection.extend({
  model: Vehicle,
  comparator: function(vehicle) {
    return vehicle.get('sequence')
  }
})

var vehicles = new Vehicles([
  { color: 'red', sequence: 2},
  { color: 'blue', sequence: 1}
])

console.log(JSON.stringify(vehicles)) // [{"color":"blue","sequence":1},{"color":"red","sequence":2}]
