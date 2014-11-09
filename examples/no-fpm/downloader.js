var request = require('superagent');
var http = require('https');
var semver = require('semver');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var bowerJson = require('./bower');

var installDirectory = 'components';
var githubRawBase = 'https://raw.githubusercontent.com/';
var githubApiBase =  'https://api.github.com/repos/';

var resolveDependencies = function(bower, cb) {
  resolve(bower.dependencies, function(err, res) {
    if (err) return cb(err);
    if (proccess.argv[2] === '--dev') {
       resolve(bower.devDependencies, function(err, res) {
         if (err) return cb(err);
         return cb();
       });
    } 
    cb();
  });
};

var resolve = function(deps, cb) {
  var n = deps.length;
  var i = 0;
  var name = null;
  for (name in deps) {
    var version = deps[name];
    console.log('resolve '+ name + '@' + version);
    getAvailableTags(name, function(err, json) {
      if (err) return cb(err);
      var tagNames = json.map(function(i) {return i.name;});
      var latestSemver = semver.maxSatisfying(tagNames, version);
      install(name, latestSemver, function(err, bower) {
        if (err) return cb(err);
        // TODO: should also resolve transitive dependencies
        // call recursively 
        // TODO: resolve bower name to GitHub namespace style
        //resolveDependencies(bower, cb);
        
        if (++i === n) cb(); // parallel download
      });
    });
  }
};


var getAvailableTags =function(name, cb) {
  // fetch available tags from github
  request.get(githubApiBase + name + '/tags', function(err, res) {
    if (err) return cb(err);
    cb(null, res.body);
  });
};

var pacakgeName = 'bower.json';

var install =function(name, version, cb) {
    // read entry file: either package.json or bower.json
    var repo = name + '/' + version + '/';
    var outBase = path.join(installDirectory, repo);
    var outBower = path.join(outBase, 'bower.json');
    mkdirp.sync(path.dirname(outBower));
    http.get(githubRawBase + repo + pacakgeName, function(response) {
      var file = fs.createWriteStream(outBower);
      response.pipe(file);
      file.on('error', function(err) {
        fs.unlink(outBower);
        cb(err);
      });
      file.on('finish', function() {
        file.close();
        var bowerJson = JSON.parse(fs.readFileSync(outBower, 'utf8'));
        if (bowerJson.main == null) cb(new Error('could not load package.bowerJson'));
        if (bowerJson.main.length === 0) {
          console.log('nothing to install for ' + name + '@' + version);
          return cb(null, bowerJson);
        }
        var i = 0;
        console.log('installing '+ repo + '@' + version);
        // TODO: we should download all files except the files flaged with ignore
        bowerJson.main.forEach(function(file) {
          var outFile = path.join(outBase, file);
          mkdirp.sync(path.dirname(outFile));
          http.get(githubRawBase + repo + file, function(response) {
            var file = fs.createWriteStream(outFile);
            response.pipe(file);
            file.on('error', function(err) {
              fs.unlink(outBower);
              cb(err);
            });
            file.on('finish', function() {
              file.close();
              if (++i === bowerJson.main.length) cb(null, bowerJson); 
            });
          }); // http.get
        }); // bowerJson.main.forEach
      }); // package.json: file.on finish
    }); // http.get
};

resolveDependencies(bowerJson, function(err){
    if (err) {
      console.log(">>>>>> error:");
      console.error(err);
      return;
    }
    console.log('installed');
});