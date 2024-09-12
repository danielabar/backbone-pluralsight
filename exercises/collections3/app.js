var Vehicle = Backbone.Model.extend({})

var Vehicles = Backbone.Collection.extend({
  model: Vehicle
}, {
  oneVehicle: function() {
    return new Vehicle({color: 'green'})
  }
})

// Use class property
var v = Vehicles.oneVehicle()
console.log(JSON.stringify(v)) // {"color":"green"}
