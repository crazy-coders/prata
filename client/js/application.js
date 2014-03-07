window.Prata = Ember.Application.create();

Prata.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

Prata.ApplicationAdapter = DS.FixtureAdapter.extend();