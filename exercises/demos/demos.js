var Vehicle = Backbone.Model.extend({
  dump: function() {
    console.log(JSON.stringify(this.toJSON()))
  }
})

var v = new Vehicle({
  type: 'car'
})
v.dump() // {"type":"car"}

v.set('color', 'blue')
v.dump() // {"type":"car","color":"blue"}

v.set({
  description: "<script>alert('injection!')</script>",
  weight: 1750
})
v.dump() // {"type":"car","color":"blue","description":"<script>alert('injection!')</script>","weight":1750}

// $('body').append(v.get('description')) // pops up browser alert box!
$('body').append(v.escape('description')) // outputs escaped value in the DOM

// Events Demo

console.log('=== EVENTS DEMO ===')

var ford = new Backbone.Model({
  type: 'car',
  color: 'blue'
})

// bind event handler to change event
ford.on('change', function() {
  console.log('something changed')
})

// register another event handler, but only for changes to color attribute
ford.on('change:color', function() {
  console.log('color changed')
})

// trigger non-color event
ford.set('type', 'scooter') // something changed

// trigger color change event
ford.set('color', 'red') // color changed, something changed
