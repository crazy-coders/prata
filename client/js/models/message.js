Prata.Message = DS.Model.extend({
  message: DS.attr('string'),
  objectId: DS.attr('string'),
  userId: 1
  //user: DS.belongsTo('user')
});
