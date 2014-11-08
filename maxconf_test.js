var os = require('os');
var fs = require('fs');
var path = require('path');
var tape = require('tape');
var assert = require('assert');

// this must be set prior to requiring maxconf
process.env.HOME = os.tmpDir();

var maxconf = require('./maxconf');

var testOpts = {
    file: './sample.maxcdn.yml'
};

var tmpDefault = path.join(process.env.HOME, '.maxcdn.yml');

function setup() {
    fs.writeFileSync(tmpDefault, fs.readFileSync(testOpts.file));
}

function teardown() {
    fs.unlink(tmpDefault);
}

tape('maxconf.js', function (test) {
    setup();

    test.plan(6);

    var config;

    // with default
    config = maxconf();
    test.equal(config.alias, 'YOUR_ALIAS');

    // with object
    config = maxconf(testOpts);
    test.equal(config.alias, 'YOUR_ALIAS');

    // with string
    config = maxconf(testOpts.file);
    test.equal(config.alias, 'YOUR_ALIAS');

    testOpts.alias = 'ALIAS_OVERIDE';

    config = maxconf(testOpts);
    test.equal(config.alias, 'ALIAS_OVERIDE');

    maxconf(testOpts, function (err, config) {
        test.error(err);
        test.equal(config.token, 'YOUR_TOKEN');

        teardown();
    });

});

