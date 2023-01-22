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

import { ProviderConnectInfo, ProviderRpcError, Web3ProviderEventCallback } from 'web3-types';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import IpcProvider from '../../src/index';

const IPC_DIR_PATH = path.join(__dirname, '..', '..', '..', '..', 'tmp');
const IPC_PATH = path.join(IPC_DIR_PATH, 'some.ipc');
const IPC_ORIGIN_PATH = path.join(IPC_DIR_PATH, 'some.ipc');

const createSymlink = `ln -s ${path.join(IPC_DIR_PATH, 'ipc.ipc')} ${IPC_ORIGIN_PATH}`;

export const waitForOpenConnection = async (provider: IpcProvider) => {
	return new Promise<ProviderConnectInfo>(resolve => {
		provider.on('connect', ((_error, data) => {
			resolve(data as unknown as ProviderConnectInfo);
		}) as Web3ProviderEventCallback<ProviderConnectInfo>);
	});
};

export const waitForCloseConnection = async (provider: IpcProvider) => {
	return new Promise<ProviderRpcError>(resolve => {
		provider.on('disconnect', ((_error, data) => {
			resolve(data as unknown as ProviderRpcError);
		}) as Web3ProviderEventCallback<ProviderRpcError>);
	});
};

const execPromise = async (command: string): Promise<string> =>
	new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
				return;
			}
			if (stderr) {
				reject(stderr);
				return;
			}
			resolve(stdout);
		});
	});

// const getPid = async (port: number): Promise<number> => {
// 	try {
// 		const pidStr = await execPromise(`lsof -Fp -i:${port}| grep '^p'`);
// 		if (pidStr) {
// 			return Number(pidStr.slice(1));
// 		}
// 		return 0;
// 	} catch (e) {
// 		return 0;
// 	}
// };

// export const stopGethServerIFExists = async (port: number) => {
// 	const prevPid = await getPid(port);
// 	if (prevPid > 0) {
// 		// close previous server
// 		await execPromise(`kill -9 ${prevPid}`);
// 	}
// };

export const waitForEvent = async (web3Provider: IpcProvider, eventName: string) =>
	new Promise(resolve => {
		web3Provider.on(eventName, (error: any, data: any) => {
			resolve(data || error);
		});
	});

const removeIfExists = () => {
	if (fs.existsSync(IPC_PATH)) {
		fs.unlinkSync(IPC_PATH);
	}
};
export const startGethServer = async (): Promise<{ path: string; close: () => void }> => {
	removeIfExists();
	await execPromise(createSymlink);
	return {
		path: IPC_PATH,
		close: (): void => {
			removeIfExists();
		},
	};
};

// export const startGethServer = async (
// 	port: number,
// ): Promise<{ pid: number; path: string; close: () => Promise<void> }> => {
// 	await stopGethServerIFExists(port);
// 	// eslint-disable-next-line no-console
// 	console.log('check dir before', await execPromise(`ls ${IPC_DIR_PATH}`));
// 	await execPromise(
// 		`${IPC_DIR_PATH}/geth --ipcpath ${IPC_PATH} --authrpc.port ${port} --ws --ws.addr 0.0.0.0 --ws.port ${
// 			port + 1000
// 		} --http --http.addr 0.0.0.0 --http.port ${
// 			port + 1000
// 		} --nodiscover --nousb --allow-insecure-unlock --dev --dev.period=0 &>/dev/null & \n npx wait-port ${port}`,
// 	);
// 	// eslint-disable-next-line no-console
// 	console.log('finish execute');
// 	// eslint-disable-next-line no-console
// 	console.log('check dir after', await execPromise(`ls ${IPC_DIR_PATH}`));
//
// 	const pid = await getPid(port);
//
// 	return {
// 		pid,
// 		path: IPC_PATH,
// 		close: async (): Promise<void> => {
// 			// eslint-disable-next-line no-console
// 			console.log('close', pid);
// 			if (pid > 0) {
// 				await execPromise(`kill -9 ${pid}`);
// 			}
// 		},
// 	};
// };
