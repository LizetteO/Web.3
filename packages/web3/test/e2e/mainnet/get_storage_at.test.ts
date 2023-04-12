/*
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
import Web3, { Numbers } from '../../../src';
import { getSystemE2ETestProvider } from '../e2e_utils';
import {
	closeOpenConnection,
	getSystemTestBackend,
} from '../../shared_fixtures/system_tests_utils';
import { toAllVariants } from '../../shared_fixtures/utils';

describe(`${getSystemTestBackend()} tests - getStorageAt`, () => {
	const provider = getSystemE2ETestProvider();
	const blockData: {
		earliest: 'earliest';
		latest: 'latest';
		pending: 'pending';
		finalized: 'finalized';
		safe: 'safe';
		blockNumber: number;
		blockHash: string;
	} = {
		earliest: 'earliest',
		latest: 'latest',
		pending: 'pending',
		finalized: 'finalized',
		safe: 'safe',
		blockNumber: 17029884,
		blockHash: '0x2850e4a813762b2de589fa5268eacb92572defaf9520608deb129699e504cab2',
	};

	let web3: Web3;

	beforeAll(() => {
		web3 = new Web3(provider);
	});

	afterAll(async () => {
		await closeOpenConnection(web3);
	});

	it.each(
		toAllVariants<{
			storageSlot: Numbers;
			block:
				| 'earliest'
				| 'latest'
				| 'pending'
				| 'finalized'
				| 'safe'
				| 'blockHash'
				| 'blockNumber';
		}>({
			storageSlot: ['0x1', '1', 1, BigInt(1)],
			block: [
				'earliest',
				'latest',
				'pending',
				'safe',
				'finalized',
				'blockHash',
				'blockNumber',
			],
		}),
	)('getStorageAt', async ({ storageSlot, block }) => {
		const result = await web3.eth.getStorageAt(
			'0xdAC17F958D2ee523a2206206994597C13D831ec7',
			storageSlot,
			blockData[block],
		);

		if (blockData[block] === 'earliest') {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(result).toMatch(/0[xX][0-9a-fA-F]{64}/i);
		} else {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(result).toMatch(/0[xX][0-9a-fA-F]{64}/i);
		}
	});
});
