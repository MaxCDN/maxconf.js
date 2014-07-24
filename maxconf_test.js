var tape = require('tape');
var assert = require('assert');
var maxconf = require('./maxconf');

var testOpts = {
    file: './sample.maxcdn.yml'
};

tape('maxconf.js', function (test) {

    test.plan(5);

    var config;

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
    });

});

