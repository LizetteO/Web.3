import { Address } from 'web3-utils';
import { RevertInstructionError } from 'web3-common';
import { NonPayableCallOptions, TransactionReceipt, Contract } from 'web3-eth-contract';
import { RESOLVER } from './abi/resolver';
import { Registry } from './registry';
import { registryContractAddress } from './config';
import { Resolver } from './resolver';

export class ENS {
	public _registryAddress: string;
	private readonly registry: Registry;
	private readonly resolver: Resolver;

	public constructor(registryAddr?: string) {
		this.registry = new Registry(registryAddr);
		this._registryAddress = registryAddr ?? registryContractAddress; // TODO change this when eth.net is finished
		this.resolver = new Resolver(this.registry);
	}

	/**
	 * Returns the Resolver by the given address
	 */
	public async getResolver(name: string): Promise<Contract<typeof RESOLVER>> {
		return this.registry.getResolver(name);
	}

	/**
	 * set the resolver of the given name
	 */
	public async setResolver(
		name: string,
		address: Address,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setResolver(name, address, txConfig);
	}

	/**
	 * Sets the owner, resolver and TTL for a subdomain, creating it if necessary.
	 */
	public async setSubnodeRecord(
		name: string,
		label: string,
		owner: Address,
		resolver: Address,
		ttl: number,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setSubnodeRecord(name, label, owner, resolver, ttl, txConfig);
	}

	/**
	 * Sets or clears an approval by the given operator.
	 */
	public async setApprovalForAll(
		operator: Address,
		approved: boolean,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setApprovalForAll(operator, approved, txConfig);
	}

	/**
	 * Returns true if the operator is approved
	 */
	public async isApprovedForAll(owner: Address, operator: Address): Promise<unknown> {
		return this.registry.isApprovedForAll(owner, operator);
	}

	/**
	 * Returns true if the record exists
	 */
	public async recordExists(name: string): Promise<unknown> {
		return this.registry.recordExists(name);
	}

	/**
	 * Returns the address of the owner of an ENS name.
	 */
	public async setSubnodeOwner(
		name: string,
		label: string,
		address: Address,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setSubnodeOwner(name, label, address, txConfig);
	}

	/**
	 * Returns the address of the owner of an ENS name.
	 */
	public async getTTL(name: string): Promise<unknown> {
		return this.registry.getTTL(name);
	}

	/**
	 * Returns the address of the owner of an ENS name.
	 */
	public async setTTL(
		name: string,
		ttl: number,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setTTL(name, ttl, txConfig);
	}

	/**
	 * Returns the owner by the given name and current configured or detected Registry
	 */
	public async getOwner(name: string): Promise<unknown> {
		return this.registry.getOwner(name);
	}

	/**
	 * Returns the address of the owner of an ENS name.
	 */
	public async setOwner(
		name: string,
		address: Address,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.registry.setOwner(name, address, txConfig);
	}

	/*
	 * Sets the address of an ENS name in his resolver.
	 */
	public async setAddress(
		name: string,
		address: Address,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.resolver.setAddress(name, address, txConfig);
	}

	/*
	 * Sets the SECP256k1 public key associated with an ENS node.
	 */
	public async setPubkey(
		name: string,
		x: string,
		y: string,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.resolver.setPubkey(name, x, y, txConfig);
	}

	/*
	 * Sets the content hash associated with an ENS node.
	 */
	public async setContenthash(
		name: string,
		hash: string,
		txConfig: NonPayableCallOptions,
	): Promise<TransactionReceipt | RevertInstructionError> {
		return this.resolver.setContenthash(name, hash, txConfig);
	}

	/*
	 * Resolves an ENS name to an Ethereum address.
	 */
	public async getAddress(ENSName: string) {
		return this.resolver.getAddress(ENSName);
	}

	/*
	 * Returns the X and Y coordinates of the curve point for the public key.
	 */
	public async getPubkey(ENSName: string) {
		return this.resolver.getPubkey(ENSName);
	}

	/*
	 * Returns the content hash object associated with an ENS node.
	 */
	public async getContenthash(ENSName: string) {
		return this.resolver.getContenthash(ENSName);
	}

	// TODO after eth.net.getNetworkType is complete
	// public checkNetwork (): boolean {
	// return true;
	//  };
}
