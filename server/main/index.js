var express = require('express'),
    http = require('http'),
    app = exports.app = express(),
    server = http.createServer(app),
    winston = require('winston'),
    config = require('../config'),
    api = require('../api');


app.configure('production', 'development', function() {
  var winstonStream = {
    write: function(message, encoding){
      winston.info(message.slice(0, -1));
    }
  };
  app.use(express.logger({stream:winstonStream}));
});

app.configure('development', function() {
  winston.setLevels(winston.config.syslog.levels);
});

app.configure(function() {
  app.use(express.static('public'));
  app.use(app.router);
  app.use('/api', api);

  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);

  app.use(express.static(__dirname + '/../../client'));
  app.use(express.static(__dirname + '/../../bower_components'));
});

app.get('/', function(req, res) {
  res.render('index.ejs', {title: "En title"});
});


server.listen(config.server.port);
winston.info('Listening on port '+config.server.port);
