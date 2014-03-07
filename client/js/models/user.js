Prata.User = DS.Model.extend({
  name: DS.attr('string'),
  messages: DS.hasMany('message')
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
