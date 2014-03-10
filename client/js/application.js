window.Prata = Ember.Application.create();

Prata.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    namespace: 'api'
  })
});

Prata.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: 'objectId',
  keyForRelationship: function(rel, kind) {
    if (kind === 'belongsTo') {
      return rel + "Id";
    } else {
      var singular = rel.singularize();
      return singular + "Ids";
    }
  }
});