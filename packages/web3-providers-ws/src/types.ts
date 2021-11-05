import { JsonRpcPayload, JsonRpcResponse } from 'web3-common';
import { DeferredPromise } from './deferredPromise';

export type ReconnectOptions = {
	autoReconnect: boolean;
	delay: number;
	maxAttempts: number;
};

export interface WSRequestItem<T = unknown[], T2 = JsonRpcResponse> {
	payload: JsonRpcPayload<T>;
	deferredPromise: DeferredPromise<T2>;
}
