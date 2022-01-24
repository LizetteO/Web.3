import { toChecksumAddress, isAddress, leftPad, hexToNumber } from 'web3-utils';
import { IbanLengthError } from 'web3-common';
import { IbanOptions } from './types';

/**
 * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
 * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
 */
const _iso13616Prepare = (iban: string): string => {
	const A = 'A'.charCodeAt(0);
	const Z = 'Z'.charCodeAt(0);

	const upperIban = iban.toUpperCase();
	const modifiedIban = `${upperIban.substr(4)}${upperIban.substr(0, 4)}`;

	return modifiedIban
		.split('')
		.map(n => {
			const code = n.charCodeAt(0);
			if (code >= A && code <= Z) {
				// A = 10, B = 11, ... Z = 35
				return code - A + 10;
			}
			return n;
		})
		.join('');
};

/**
 * return the bigint of the given string with the specified base
 */
const _parseInt = (str: string, base: number): bigint =>
	[...str].reduce((acc, curr) => BigInt(parseInt(curr, base)) + BigInt(base) * acc, 0n);

/**
 * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
 */
const _mod9710 = (iban: string): number => {
	let remainder = iban;
	let block;

	while (remainder.length > 2) {
		block = remainder.slice(0, 9);
		remainder = `${(parseInt(block, 10) % 97).toString()}${remainder.slice(block.length)}`;
	}

	return parseInt(remainder, 10) % 97;
};

const _isValid = (iban: string): boolean =>
	/^XE[0-9]{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(iban) &&
	_mod9710(_iso13616Prepare(iban)) === 1;

export class Iban {
	private readonly _iban: string;

	public constructor(iban: string) {
		if (_isValid(iban)) {
			// error
		}
		this._iban = iban;
	}

	/**
	 * check if iban number is direct
	 */
	private isDirect() {
		return this._iban.length === 34 || this._iban.length === 35;
	}

	/**
	 * Get the clients direct address from iban
	 */
	public toAddress = (): string => {
		if (this.isDirect()) {
			// check if Iban can be converted to an address
			const base36 = this._iban.substr(4);
			const bigInt = _parseInt(base36, 36); // convert the base36 string to a bigint
			const paddedBigInt = leftPad(bigInt, 40);
			return toChecksumAddress(paddedBigInt);
		}
		throw new IbanLengthError();
	};
	/**
	 * This method should be used to create an ethereum address from a direct iban address
	 */
	public static toAddress = (iban: string): string => {
		const ibanObject = new Iban(iban);
		if (!ibanObject.isDirect()) {
			throw new IbanLengthError();
		}
		return ibanObject.toAddress();
	};

	/**
	 * Convert the passed BBAN to an IBAN for this country specification.
	 * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
	 * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
	 */
	public static fromBban(bban: string): Iban {
		const countryCode = 'XE';

		const remainder = _mod9710(_iso13616Prepare(`${countryCode}00${bban}`));
		const checkDigit = `0${(98 - remainder).toString()}`.slice(-2);

		return new Iban(`${countryCode}${checkDigit}${bban}`);
	}

	/**
	 * This method should be used to create iban object from an ethereum address
	 */
	public static fromAddress(address: string): Iban {
		if (!isAddress(address)) {
			throw new Error(`Provided address is not a valid address: ${address}`);
		}

		const num = BigInt(hexToNumber(address));
		const base36 = num.toString(36);
		const padded = leftPad(base36, 15);
		return Iban.fromBban(padded.toUpperCase());
	}

	/**
	 * This method should be used to create iban address from an ethereum address
	 */
	public static toIban(address: string): string {
		return Iban.fromAddress(address).toString();
	}

	/**
	 * Should be used to create IBAN object for given institution and identifier
	 */
	public static createIndirect(options: IbanOptions): Iban {
		return Iban.fromBban(`ETH${options.institution}${options.identifier}`);
	}

	/**
	 * Should be called to check if iban is correct
	 */
	public isValid() {
		return _isValid(this._iban);
	}

	/**
	 * This method should be used to check if given string is valid iban object
	 */
	public static isValid(iban: string) {
		const i = new Iban(iban);
		return i.isValid();
	}

	public toString(): string {
		return this._iban;
	}

	/**
	 * check if iban number if indirect
	 */
	public isIndirect(): boolean {
		return this._iban.length === 20;
	}
}
