var yaml = require('js-yaml');
var fs   = require('fs');

var defaultConfig = process.env.HOME + '/.maxcdn.yml';

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
module.exports = function maxconf(opts, callback) {

    // allow for `maxconf(function(...) { ... })`
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    if (typeof opts === 'string') {
        opts = { file: opts };
    }

    var applyOverides = function applyOverides(res) {
        Object.keys(opts).forEach(function(key) {
            if (key !== 'file') {
                res[key] = opts[key];
            }
        });
        return res;
    };

    var file   = opts.file || defaultConfig;

    if (typeof callback === 'undefined') {
        return applyOverides(yaml.safeLoad(fs.readFileSync(file, 'utf8')));
    }

    fs.readFile(file, function (err, raw) {
        if (err) return callback(err);

        try {
            return callback(null, applyOverides(yaml.safeLoad(raw)));
        } catch (e) {
            return callback(e);
        }
    });

};
