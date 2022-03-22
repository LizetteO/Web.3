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

export class InvalidStringError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid string');
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

export class NibbleWidthError extends Web3Error {
	public constructor(value: string) {
		super(value, 'value greater than the nibble width');
	}
}

export class InvalidTypeError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid type, type not supported');
	}
}

export class InvalidBooleanError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid boolean.');
	}
}

export class InvalidUnsignedIntegerError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'not a valid unsigned integer.');
	}
}

export class InvalidSizeError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid size given.');
	}
}

export class InvalidLargeValueError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'value is larger than size.');
	}
}

export class InvalidBlockError extends Web3Error {
	public constructor(value: string) {
		super(value, 'invalid string given');
	}
}

export class InvalidTypeAbiInputError extends Web3Error {
	public constructor(value: string) {
		super(value, 'components found but type is not tuple');
	}
}

export class InvalidDesiredTypeError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid desired type for conversion given');
	}
}

export class InvalidConvertibleObjectError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid object for conversion given');
	}
}

export class InvalidConvertiblePropertiesListError extends Web3Error {
	public constructor(value: unknown) {
		super(value, 'invalid list of convertible properties for conversion given');
	}
}

export class InvalidConvertibleValueError extends Web3Error {
	public constructor() {
		super(undefined, 'cannot convert undefined');
	}
}
