// Define router
var Workspace = Backbone.Router.extend({
  routes: {
    'search/:query': 'search'
  },

  search: function(query) {
    console.log(`search called for ${query}`)
  }
})

// Instantiate router so we can use it
var router = new Workspace()

// Tell Backbone to start listening for address/history changes
Backbone.history.start()

// Trigger client side navigation
// trigger: true tells Backbone to also execute the route handler
// trigger: false tells Backbone to only change url
router.navigate('search/cats', {trigger: true})

// When this app runs, browser url is: http://127.0.0.1:8080/router/#search/cats
// console has: search called for cats
