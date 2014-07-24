# maxconf.js

A sub-stack lib for loading [MaxCDN](http://www.maxcdn.com/) configuration files using the standard set forth by [MaxCLI](https://github.com/MaxCDN/maxcli).

```javascript
/****
 * option: default   :: description
 * -------------------------------------
 * file:   undefined :: config file to be used, default is
 *                       '$HOME/.maxcdn.yml'
 * [opt]:  n/a       :: set or overide [opt]
 *
 * If callback is undefined, 'fs.readFileSync' method is used and result
 * is returned. Additionally errors are thrown.
 *
 * Otherwise, result is passed via callback along with any errors.
 *
 * YAML parsing is always snyc.
 *
 *  callback(err, result)
 */

var maxconf = require('maxconf');

/*
 * sync usage
 ***/

// basic sync usage
var config = maxconf(); // uses '~/.maxcdn.yml'
console.log(config.alias);

// custom file sync usage
var config = maxconf('/path/to/maxcdn.yml');
console.log(config.alias);

// custom opts sync usage
var opts = {
    file: '/path/to/maxcdn.yml',
    alias: 'ALIAS_OVERIDE'
};
var config = maxconf(opts);
console.log(config.alias);

/*
 * sync usage
 ***/

var callback = function (err, config) {
    if (err) return console.trace(err);
    console.log(config.alias);
};

// basic async usage
maxconf(callback);

// custom file asnyc usage
maxconf('/path/to/maxcdn.yml', callback);

// custom opts asnyc usage
var opts = {
    file: '/path/to/maxcdn.yml',
    alias: 'ALIAS_OVERIDE'
};
maxconf(opts, callback);

```
