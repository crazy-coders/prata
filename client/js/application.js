window.Prata = Ember.Application.create();

Prata.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    namespace: 'api'
  })
});

Prata.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: 'objectId'
});

//Prata.MessageSerializer = DS.RESTSerializer.extend({
//  normalizeHash: {
//    messages: function(hash) {
//      console.log(hash);
//      return hash;
//    }
//  }
//});
//
