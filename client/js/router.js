Prata.Router.map(function () {
  this.resource('messages', { path: '/' });
});

Prata.MessagesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('message');
  }
});