import Contract from "web3-eth-contract";
import env from "@/core/env";
import web3 from "@/core/web3";
import {AbiItem, Mixed} from "web3-utils";
import {Account} from "@/models/Contract";
import {Record} from "@/models/Solidify";
import {TransactionReceipt} from "web3-core";
import {Response, ResponseData} from "@/models/Network";

/**
 * Create a record
 *
 * @param record
 * @param account
 */
export const create = async (record: Record, account: Account): Promise<ResponseData<TransactionReceipt | null>> => {
    const tx = SolidifySingleton.Instance.methods.create(record.id, record.content)
    try {
        // Estimate gas amount
        const gasAmount = await tx.estimateGas({from: account.address})
            .then((gasAmount: number) => gasAmount)
        // Send transaction
        const receipt: TransactionReceipt = await tx
            .send({
                from: account.address,
                gas: gasAmount
            })
            .then((receipt: TransactionReceipt) => receipt);
        return Response.success(receipt)
    } catch (e: any) {
        return Response.failure(e.message)
    }
}

/**
 * Retrieve a record
 *
 * @param id record id
 */
export const retrieve = async (id: number): Promise<ResponseData<Mixed | null>> => {
    try {
        return await SolidifySingleton.Instance.methods.retrieve(id).call()
            .then((returns: Mixed) => Response.success(returns))
    } catch (e: any) {
        return Response.failure(e.message)
    }
}

/**
 * Update a record
 *
 * @param record
 * @param account
 */
export const update = async (record: Record, account: Account): Promise<ResponseData<TransactionReceipt | null>> => {
    const tx = SolidifySingleton.Instance.methods.update(record.id, record.content)
    try {
        // Estimate gas amount
        const gasAmount = await tx.estimateGas({from: account.address})
            .then((gasAmount: number) => gasAmount)
        // Send transaction
        const receipt: TransactionReceipt = await tx
            .send({
                from: account.address,
                gas: gasAmount
            })
            .then((receipt: TransactionReceipt) => receipt);
        return Response.success(receipt)
    } catch (e: any) {
        return Response.failure(e.message)
    }
}

/**
 * Erase a record
 *
 * @param id record id
 * @param account
 */
export const erase = async (id: number, account: Account): Promise<ResponseData<TransactionReceipt | null>> => {
    const tx = SolidifySingleton.Instance.methods.erase(id)
    try {
        // Estimate gas amount
        const gasAmount = await tx.estimateGas({from: account.address})
            .then((gasAmount: number) => gasAmount)
        // Send transaction
        const receipt: TransactionReceipt = await tx
            .send({
                from: account.address,
                gas: gasAmount
            })
            .then((receipt: TransactionReceipt) => receipt);
        return Response.success(receipt)
    } catch (e: any) {
        return Response.failure(e.message)
    }
}

/**
 * Solidify Singleton
 */
class SolidifySingleton {
    private static _instance: Contract

    public static get Instance(): Contract {
        return this._instance || (this._instance = new web3.eth.Contract(this.abi, env.contractAddress))
    }

    private static abi: AbiItem[] = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                }
            ],
            "name": "create",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                }
            ],
            "name": "update",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "erase",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}

