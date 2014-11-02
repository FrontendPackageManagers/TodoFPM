var express = require('express')
  , morgan = require('morgan')
  , app = express()
  , path = require('path');

var config = require('../config');
var rootPath = path.resolve(__dirname, '..');

app.use(morgan('dev'));
config.examples.forEach(function(example) {
    var directory = path.join(rootPath, config.dir, example.prefix);
    var url = path.join('/', config.dir, example.prefix);
    app.use(url, express.static(path.join(directory, 'build')));
    app.get(url, function(req, res){
      res.sendFile(path.join(directory, 'index.html'));
    });
});

app.get('/', function(req, res){
  res.render(path.join(__dirname, 'index.jade'), {config: config});
});

console.log("express is listening on 3000");
app.listen(3000);
