'use strict';

require('should');

const parser = require('../index.js');

describe('mongo url parser', function ( ) {

    it('should parse a basic Mongo URL', function ( ) {

        const url = 'mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin';
        const parsed = parser(url);

        parsed.usingSrv.should.equal(false);
        parsed.servers[0].host.should.equal('mongodb0.example.com');
        parsed.servers[0].port.should.equal(27017);
        parsed.auth.user.should.equal('myDBReader');
        parsed.auth.password.should.equal('D1fficultP@ssw0rd');
    });

    it('should parse a mongodb+srv URL', function ( ) {

        const url = 'mongodb+srv://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin';
        const parsed = parser(url);

        parsed.usingSrv.should.equal(true);
        parsed.servers[0].host.should.equal('mongodb0.example.com');
        parsed.servers[0].port.should.equal(27017);
        parsed.auth.user.should.equal('myDBReader');
        parsed.auth.password.should.equal('D1fficultP@ssw0rd');
    });

});
