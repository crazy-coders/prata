Prata.Message = DS.Model.extend({
  message: DS.attr('string'),
  createdAt: DS.attr('string'),
  updatedAt: DS.attr('string'),
  user: DS.belongsTo('user', {async: true})
});