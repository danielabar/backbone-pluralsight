var Vehicle = Backbone.Model.extend({
  prop1: '1'
})

var v = new Vehicle();
var v2 = new Vehicle();

v.prop1 = 'one';

console.log(v.prop1) // one
console.log(v2.prop1) // 1

var A = Backbone.Model.extend({
  initialize: function() {
    console.log('initialize A')
  },

  asString: function() {
    return JSON.stringify(this.toJSON())
  }
})

var a = new A({
  one: '1',
  two: '2'
})
console.log(a.asString())

var B = A.extend({})
var b = new B({
  three: '3'
})
console.log(b.asString())

console.log(b instanceof B) // true
console.log(b instanceof A) // true
console.log(b instanceof Backbone.Model) // true
console.log(a instanceof A) // true
console.log(a instanceof Backbone.Model) // true
console.log(a instanceof B) // false

var ford = new Vehicle()
ford.set('description', '<script>alert("script injection!"</script>')
console.log(ford.escape('description'))
