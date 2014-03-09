window.Prata = Ember.Application.create();

Prata.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.create({
    namespace: 'api'
  })
});

//Prata.ApplicationAdapter = DS.RESTAdapter.extend();

Prata.Router.map(function () {
  this.resource('index', {path: '/'}); // Is is default
});

Prata.IndexRoute = Ember.Route.extend({
  model: function() {
    return {
      messages: this.store.find('message'),
      users: this.store.find('user')
    }
  }
});

Prata.IndexView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['isAdministrator']
});



Prata.IndexController = Ember.ArrayController.extend({
  actions: {
    createMessage: function() {

      // Get the todo title set by the "New Message" text field
      var messageText = this.get('newMessage');
      if (!messageText.trim()) { return; }

      // Create the new Message model
      var store = this.store;

      var m = Prata.Message.createRecord({
        message: messageText,
        user: store.find('user', 1) // Set user
      });

      // Clear the "New Message" text field
      this.set('newMessage', '');

      // Save the new model
      m.save();
    }
  }
});
