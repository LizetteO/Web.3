﻿/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { InvalidPropertiesForTransactionTypeError } from 'web3-errors';
import { Web3Context } from 'web3-core';
import { EthExecutionAPI } from 'web3-types';
import HttpProvider from 'web3-providers-http';

import { detectTransactionType } from '../../src/utils/detect_transaction_type';
import {
	transactionType0x0,
	transactionType0x1,
	transactionType0x2,
	transactionType0PostEIP1559,
	transactionTypeUndefined,
	transactionTypeValidationError,
} from '../fixtures/detect_transaction_type';
import {
	preEip1559Block,
	postEip1559Block,
} from '../fixtures/prepare_transaction_for_signing'
import * as rpcMethodWrappers from '../../src/rpc_method_wrappers';


jest.mock('../../src/rpc_method_wrappers');

describe('detectTransactionType', () => {
	afterAll(() => {
		jest.resetAllMocks();
	});
	describe('should override detectTransactionType method', () => {
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.skip('should call override method', async () => {
			const overrideFunction = jest.fn();
			await detectTransactionType(transactionTypeUndefined[0], web3Context);
			expect(overrideFunction).toHaveBeenCalledWith(transactionTypeUndefined[0]);
		});
	});

	describe('should detect transaction type 0x0', () => {
        jest.spyOn(rpcMethodWrappers, 'getBlock').mockResolvedValue(preEip1559Block)
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionType0x0)('%s', async transaction => {
			expect(await detectTransactionType(transaction, web3Context)).toBe('0x0');
		});
	});

	describe('should detect type 0x0 transaction post eip1559 block', () => {
        jest.spyOn(rpcMethodWrappers, 'getBlock').mockResolvedValue(postEip1559Block)
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionType0PostEIP1559)('%s', async transaction => {
			expect(await detectTransactionType(transaction, web3Context)).toBe('0x0');
		});
	});

	describe('should detect transaction type 0x1', () => {
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionType0x1)('%s', async transaction => {
			expect(await detectTransactionType(transaction, web3Context)).toBe('0x1');
		});
	});

	describe('should detect transaction type 0x2', () => {
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionType0x2)('%s', async transaction => {
			expect(await detectTransactionType(transaction, web3Context)).toBe('0x2');
		});
	});

	describe('should not be able to detect transaction type, returning undefined', () => {
        jest.spyOn(rpcMethodWrappers, 'getBlock').mockResolvedValue(postEip1559Block)
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionTypeUndefined)('%s', async transaction => {
			expect(await detectTransactionType(transaction, web3Context)).toBeUndefined();
		});
	});

	describe('should throw validation error', () => {
		const web3Context = new Web3Context<EthExecutionAPI>({
			provider: new HttpProvider('http://127.0.0.1:80'),
		});
		it.each(transactionTypeValidationError)('%s', async transaction => {
			let err;
			try {
				await detectTransactionType(transaction, web3Context);
			} catch (error) {
				err = error;
			}
			expect(err).toBeInstanceOf(InvalidPropertiesForTransactionTypeError);
		});
	});
});
