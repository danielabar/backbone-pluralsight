var c = new Backbone.Collection([
  {name: 'thing'},
  {name: 'other'}
])

console.log(c.length) // 2
console.log(c.at(0)) // Backbone.Model with name property and value thing
