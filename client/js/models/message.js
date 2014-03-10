Prata.Message = DS.Model.extend({
  message: DS.attr('string'),
  createdAt: DS.attr('string'),
  updated_at: DS.attr('string'),
  object_id: DS.attr('string'),
  userId: DS.attr('string')
  //user: DS.belongsTo('user', {async: true})
});

//Prata.Message.FIXTURES = [
//  {
//    id: 1,
//    message: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
//    user: 1
//  },
//  {
//    id: 2,
//    message: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
//    user: 2
//  }
//];
