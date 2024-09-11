var Vehicle = Backbone.Model.extend({
  validate: function (attrs) {
    console.log('=== RUNNING VEHICLE VALIDATION ===')
    // Define array of valid colors
    var validColors = ['white', 'red', 'blue', 'yellow']

    // Define function to validate model color
    var colorIsValid = function(attrs) {
      // if `color` attribute is not set, that's valid
      if (!attrs.color) return true

      // return true only if the model's color is one of validColors
      return _(validColors).include(attrs.color)
    }

    // Now we can use the colorIsValid function
    if (!colorIsValid(attrs)) {
      return "color must be one of: " + validColors.join(", ")
    }
  }
})

var car = new Vehicle()

// Used to be `error`, now its `invalid`
car.on('invalid', function(model, error) {
  console.log(error)
  // handle validation errors here
})

// no validation errors because we don't have any rules for the `foo` attribute
car.set('foo', 'bar')
console.log(car.isValid()) // true

// populate a valid color
car.set('color', 'blue')
console.log(car.isValid()) // true
console.log(car.get('color')) //blue

// populate a invalid color
car.set('color', 'pink')
console.log(car.isValid()) // false, color must be one of: white, red, blue, yellow
console.log(car.get('color')) // pink -> in this case, it did populate an invalid color

// try validate option
car.set('color', 'mauve', {validate: true}) // color must be one of: white, red, blue, yellow
console.log(car.get('color')) // pink -> because we passed validate option, it hangs on to last set color
