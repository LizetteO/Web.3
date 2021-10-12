/* eslint-disable max-classes-per-file */

export abstract class Web3Error extends Error {
	public readonly name: string;

	public constructor(value: unknown, msg: string) {
		super(`Invalid value given "${String(value)}". Error: ${msg}.`);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, Web3Error);
	}

	public toJSON() {
		return { name: this.name, message: this.message };
	}
}

export class NegativeIntegersInByteArrayError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'contains negative values');
	}
}
export class HighValueIntegerInByteArrayError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'contains numbers greater than 255');
	}
}
export class InvalidIntegerInByteArrayError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'contains invalid integer values');
	}
}

export class InvalidIntegerError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid integer');
	}
}

export class InvalidNumberError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid number');
	}
}

export class InvalidStringError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid string');
	}
}

export class InvalidHexStringError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid hex string');
	}
}

export class InvalidBytesError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'can not parse as byte data');
	}
}

export class InvalidUnitError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid unit');
	}
}

export class InvalidAddressError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid ethereum address');
	}
}

export class HexProcessingError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'can not be converted to hex');
	}
}

export class InvalidDenominatorError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'denominator must be number power of 10');
	}
}

export class NibbleWidthError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'value greater than the nibble width');
	}
}