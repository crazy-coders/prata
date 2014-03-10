Prata.User = DS.Model.extend({
  name: DS.attr('string'),
  messages: DS.hasMany('message', {async: true})
});

Prata.User.FIXTURES = [
  {
    id: 1,
    name: 'emil',
  },
  {
    id: 2,
    name: 'johan'
  }
];
