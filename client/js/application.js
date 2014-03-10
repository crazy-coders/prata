window.Prata = Ember.Application.create();

//Prata.Store = DS.Store.extend({
//  revision: 12,
//  adapter: 'DS.FixtureAdapter'
//});
//
//Prata.ApplicationAdapter = DS.FixtureAdapter.extend();

Prata.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.RESTAdapter'
});


Prata.ApplicationAdapter = DS.RESTAdapter.extend();

DS.RESTAdapter.reopen({
  namespace: 'api'
});