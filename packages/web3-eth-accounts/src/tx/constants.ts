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
// eslint-disable-next-line
import * as ethereumCryptography from 'ethereum-cryptography/secp256k1.js';

// eslint-disable-next-line no-console
console.log('ttt_ethereumCryptography', ethereumCryptography);
// eslint-disable-next-line
const secp256k1 = ethereumCryptography.secp256k1;
// eslint-disable-next-line no-console
console.log('ttt_secp256k1', secp256k1);
// eslint-disable-next-line no-console
console.log('ttt_secp256k1.CURVE', secp256k1?.CURVE);
// eslint-disable-next-line no-console
console.log('ttt_secp256k1.CURVE.n', secp256k1?.CURVE?.n);
/**
 * 2^64-1
 */
export const MAX_UINT64 = BigInt('0xffffffffffffffff');

/**
 * The max integer that the evm can handle (2^256-1)
 */
export const MAX_INTEGER = BigInt(
	'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

export const SECP256K1_ORDER =
	secp256k1?.CURVE?.n ??
	BigInt('115792089237316195423570985008687907852837564279074904382605163141518161494337');
export const SECP256K1_ORDER_DIV_2 = SECP256K1_ORDER / BigInt(2);
