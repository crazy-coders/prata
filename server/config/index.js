var kaskade = require("kaskade"),
    fs = require('fs'),
    env = process.env,
    envSpecific = './'+env.NODE_ENV+'.js';

// Load default config
var config = require('./default');

// Load envirement based config
if (env.NODE_ENV === undefined) throw new Error('Need to provide a NODE_ENV');
if ( ! fs.existsSync('./server/config/'+envSpecific)) throw new Error("Provided envirenment doesn't have a config file");

kaskade(config, require(envSpecific));

module.exports = config;
