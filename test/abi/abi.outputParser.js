var chai = require('chai');
var expect = chai.expect;
var BigNumber = require('bignumber.js');
var abi = require('../../lib/solidity/abi.js');
var clone = function (object) {
    return JSON.parse(JSON.stringify(object));
};

/* globals describe, it */

var description = [{
    "name": "test",
    "type": "function",
    "inputs": [{
        "name": "a",
        "type": "uint256"
    }],
    "outputs": [{
        "name": "d",
        "type": "uint256"
    }]
}];

describe('abi', function () {
    describe('outputParser', function () {
        it('should parse output uint', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'uint'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toString(10))
                .equal(new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16).toString(10));

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toString(10))
                .equal(new BigNumber("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0", 16).toString(10));
        });

        it('should parse output uint256', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'uint256'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toString(10)).equal(
                new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16).toString(10));

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toString(10)).equal(
                new BigNumber("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0", 16).toString(10));
        });

        it('should parse output uint128', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'uint128'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toString(10))
                .equal(new BigNumber("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16).toString(10));

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toString(10))
                .equal(new BigNumber("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0", 16).toString(10));
        });

        it('should parse output int', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'int'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toNumber())
                .equal(-1);

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toNumber())
                .equal(-16);

        });

        it('should parse output int256', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'int256'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toNumber())
                .equal(-1);

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toNumber())
                .equal(-16);

        });

        it('should parse output int128', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'int128'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);

            expect(parser.test("0x000000000000000000000000000000000000000000000000000000000000000a")[0].toNumber())
                .equal(10);

            expect(parser.test("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")[0].toNumber())
                .equal(-1);

            expect(parser.test("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0")[0].toNumber())
                .equal(-16);

        });

        it('should parse output address', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'address'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1")[0])
                .equal("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
        });

        it('should parse output bool', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'bool'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000001")[0])
                .equal(true);

            expect(parser.test("0x0000000000000000000000000000000000000000000000000000000000000000")[0])
                .equal(false);
        });

        it('should parse output real', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'real'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000100000000000000000000000000000000")[0].toNumber())
                .equal(1);

            expect(parser.test("0x0000000000000000000000000000000220000000000000000000000000000000")[0].toNumber())
                .equal(2.125);

            expect(parser.test("0x0000000000000000000000000000000880000000000000000000000000000000")[0].toNumber())
                .equal(8.5);

            expect(parser.test("0xffffffffffffffffffffffffffffffff00000000000000000000000000000000")[0].toNumber())
                .equal(-1);
        });

        it('should parse output ureal', function () {

            // given
            var d = clone(description);

            d[0].outputs = [{
                type: 'ureal'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x0000000000000000000000000000000100000000000000000000000000000000")[0].toNumber())
                .equal(1);

            expect(parser.test("0x0000000000000000000000000000000220000000000000000000000000000000")[0].toNumber())
                .equal(2.125);

            expect(parser.test("0x0000000000000000000000000000000880000000000000000000000000000000")[0].toNumber())
                .equal(8.5);


        });


        it('should use proper method name', function () {

            // given
            var d = clone(description);
            d[0].name = 'helloworld(int)';
            d[0].outputs = [{
                type: "int"
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.helloworld("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())

            .equal(1);


            expect(parser.helloworld.int("0x0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber())
                .equal(1);
        });


        it('should parse multiple methods', function () {

            // given
            var d = [{
                name: "test",
                type: "function",
                inputs: [{
                    type: "int"
                }],
                outputs: [{
                    type: "int"
                }]
            }, {
                name: "test2",
                type: "function",
                inputs: [{
                    type: "bytes"
                }],
                outputs: [{
                    type: "bytes"
                }]
            }];

            // when
            var parser = abi.outputParser(d);

            //then
            expect(parser.test("0000000000000000000000000000000000000000000000000000000000000001")[0].toNumber()).equal(1);
            expect(parser.test2("0x" +
                "0000000000000000000000000000000000000000000000000000000000000005" +
                "68656c6c6f000000000000000000000000000000000000000000000000000000")[0]).equal(
                "hello"
            );

        });

        it('should parse output array', function () {

            // given
            var d = clone(description);
            d[0].outputs = [{
                type: 'int[]'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x" +
                    "0000000000000000000000000000000000000000000000000000000000000002" +
                    "0000000000000000000000000000000000000000000000000000000000000005" +
                    "0000000000000000000000000000000000000000000000000000000000000006")[0][0].toNumber())
                .equal(5);

            expect(parser.test("0x" +
                    "0000000000000000000000000000000000000000000000000000000000000002" +
                    "0000000000000000000000000000000000000000000000000000000000000005" +
                    "0000000000000000000000000000000000000000000000000000000000000006")[0][1].toNumber())
                .equal(6);

        });

        it('should parse 0x value', function () {

            // given
            var d = clone(description);
            d[0].outputs = [{
                type: 'int'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x")[0].toNumber()).equal(0);

        });

        it('should parse 0x value', function () {

            // given
            var d = clone(description);
            d[0].outputs = [{
                type: 'uint'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(parser.test("0x")[0].toNumber()).equal(0);

        });

        it('should throw an incorrect type error', function () {

            // given
            var d = clone(description);
            d[0].outputs = [{
                type: 'uin'
            }];

            // when
            var parser = abi.outputParser(d);

            // then
            expect(function () {
                parser.test('0x');
            }).to.throw(/parser does not support/);
        });
    });
});
