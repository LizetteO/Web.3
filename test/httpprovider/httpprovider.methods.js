var chai         = require('chai');
var assert       = chai.assert;
var expect       = chai.expect;
var httpProvider = require('../../lib/web3/httpprovider');
var u            = require('../test.utils.js');

/* globals it, describe, before */

describe('httpprovider', function () {
    describe('methods', function () {
        var h = new httpProvider(null);
        u.methodExists(h, 'send');
    });

    describe('methods', function () {
        var h;
        before(function () {
            h = new httpProvider(null);
        });

        it('constructs properly', function () {
            assert.equal(h.name, 'HTTP');
            assert.equal(h.host, 'http://localhost:8080');
            assert.property(h, 'handlers');
            assert.isArray(h.handlers);
        });
    });

    describe('SYNC', function () {
        var h = new httpProvider(null);
        var payload = {
            'jsonrpc': '2.0',
            'method': 'eth_coinbase',
            'params': [],
            'id': 12341234
        };

        it('does send SYNC calls', function () {
            var res = h.send(payload);

            expect(res.id).equal(payload.id);
            expect(res.result).not.null;
            expect(res.jsonrpc).not.null;
            expect(res.result).has.length(42);
        });
    });

    describe('ASYNC', function () {
        var h = new httpProvider(null);
        var payload = {
            'jsonrpc': '2.0',
            'method': 'eth_coinbase',
            'params': [],
            'id': 12341234
        };

        it('does send ASYNC calls', function (done) {
            h.send(payload, function (res, status) {
                expect(status).equal(200);
              
                expect(res.id).equal(payload.id);
                expect(res.result).not.null;
                expect(res.jsonrpc).not.null;
                expect(res.result).has.length(42);

                done();
            });
        });
    });
});
