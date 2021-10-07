import {
	ResponseError,
	JsonRpcPayload,
	JsonRpcResponseWithError,
	JsonRpcResponseWithResult,
	JsonRpcResult,
	Web3BaseProvider,
	MethodNotImplementedError,
	JsonRpcResponse,
	Web3BaseProviderStatus,
    InvalidClientError
} from 'web3-common';
import fetch from 'cross-fetch';

import { HttpProviderOptions } from './types';

export class HttpProvider extends Web3BaseProvider {
	private readonly clientUrl: string;
	private readonly httpProviderOptions: HttpProviderOptions | undefined;

	public constructor(clientUrl: string, httpProviderOptions?: HttpProviderOptions) {
		super();
		if (!HttpProvider.validateClientUrl(clientUrl)) throw new InvalidClientError(clientUrl);
		this.clientUrl = clientUrl;
		this.httpProviderOptions = httpProviderOptions;
	}

	private static validateClientUrl(clientUrl: string): boolean {
		return typeof clientUrl === 'string' ? /^http(s)?:\/\//i.test(clientUrl) : false;
	}

	public send<T = JsonRpcResult, T2 = unknown[], T3 = RequestInit>(
		payload: JsonRpcPayload<T2>,
		callback: (
			error?: JsonRpcResponseWithError<T>,
			result?: JsonRpcResponseWithResult<T>,
		) => void,
		providerOptions?: T3,
	): void {
		this.request<JsonRpcResponseWithResult<T>, T2, T3>(payload, providerOptions)
			.then(d => callback(undefined, d))
			.catch(e => callback(e, undefined));
	}

	/* eslint-disable class-methods-use-this */
	public getStatus(): Web3BaseProviderStatus {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public supportsSubscriptions() {
		return false;
	}

	public async request<T = JsonRpcResponse, T2 = unknown[], T3 = RequestInit>(
		request: JsonRpcPayload<T2>,
		providerOptions?: T3,
	): Promise<T> {
		const providerOptionsCombined = {
			...this.httpProviderOptions?.providerOptions,
			...providerOptions,
		};
		const response = await fetch(this.clientUrl, {
			...providerOptionsCombined,
			method: 'POST',
			headers: {
				...providerOptionsCombined.headers,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: request.id ?? Math.floor(Math.random() * 999999), // Generate random integer between 0 and 999,999
				jsonrpc: request.jsonrpc ?? '2.0',
				method: request.method,
				params: request.params ?? [],
			}),
		});

		if (!response.ok) throw new ResponseError((await response.json()) as T);

		return (await response.json()) as T;
	}

	/* eslint-disable class-methods-use-this */
	public on() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public removeListener() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public once() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public removeAllListeners() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public connect() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public disconnect() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public reset() {
		throw new MethodNotImplementedError();
	}

	/* eslint-disable class-methods-use-this */
	public reconnect() {
		throw new MethodNotImplementedError();
	}
}
