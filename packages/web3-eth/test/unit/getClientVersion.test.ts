import Web3ProvidersHttp from 'web3-providers-http';

import Web3Eth from '../../src';

describe('getClientVersion', () => {
    let web3ProvidersHttpRequestSpy: jest.SpyInstance;
    let web3Eth: Web3Eth;

    beforeAll(() => {
        const chainIdResult = {
            id: 42,
            jsonrpc: '2.0',
            result: '0x1',
        };

        Web3ProvidersHttp.prototype.request = jest.fn();
        web3ProvidersHttpRequestSpy = jest.spyOn(
            Web3ProvidersHttp.prototype,
            'request'
        );
        // Web3ProviderHttp makes a request to get chainId of
        // connected client upon instantiation, so we mock the reponse
        // @ts-ignore mockReturnValueOnce added by jest
        Web3ProvidersHttp.prototype.request.mockReturnValueOnce(chainIdResult);
        web3Eth = new Web3Eth({ web3Client: 'http://127.0.0.1:8545' });
    });

    it('should make request with expected requestArguments', async () => {
        const expectedResult = {
            id: 42,
            jsonrpc: '2.0',
            result: 'Mist/v0.9.3/darwin/go1.4.1',
        };
        // @ts-ignore mockReturnValueOnce added by jest
        Web3ProvidersHttp.prototype.request.mockReturnValueOnce(expectedResult);

        const result = await web3Eth.getClientVersion();
        expect(result).toStrictEqual(expectedResult);
        expect(web3ProvidersHttpRequestSpy).toHaveBeenCalledWith({
            method: 'web3_clientVersion',
            params: [],
        });
    });
});
