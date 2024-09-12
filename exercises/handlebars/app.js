var source = '<p>Latitude: {{lat}}</p>'

// Must have Handlebars loaded for this to work:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
// Compilation is the slowest part of this process
var compiled = Handlebars.compile(source)

var rendered = compiled({lat: -27})

console.log(rendered) // app.js:5 <p>Latitude: -27</p>
