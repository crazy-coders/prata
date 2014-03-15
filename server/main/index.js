var express = require('express'),
    http = require('http'),
    app = exports.app = express(),
    server = http.createServer(app),
    winston = require('winston'),
    config = require('../config'),
    api = require('../api'),
    auth = require('../auth'),
    user = require('../user'),
    passport = require('passport');



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
  app.use(express.static(__dirname + '/../../client'));
  app.use(express.static(__dirname + '/../../bower_components'));

  app.use(express.cookieParser());
  app.use(express.session({secret: 'blahblah', cookie: { maxAge: 1000000000 }}));

  app.use('/api', api);
  app.use('/auth', auth);
  app.use('/user', user);

  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
});

app.get('/', auth.ensureAuthenticatedUser, function(req, res) {
  res.render('index.ejs', {title: "En title"});
});


server.listen(config.server.port);
winston.info('Listening on port '+config.server.port);
