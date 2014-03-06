var express = require('express'),
    app = module.exports = express(),
    config = require('../config/');


// This needs to check for valid return handling
app.get('/messages',
  function(req, res) {
    res.json(
      {
        'messages': [
          {'message': 'Hejsan', 'user': {id: 1, name: 'johan'}},
          {'message': 'Svejsan', 'user': {id: 1, name: 'johan'}},
          {'message': 'Tjohejsan', 'user': {id: 2, name: 'johan'}},
        ]
      }
    );
  }
);
