import type {NextApiRequest, NextApiResponse} from 'next'
import {isRecord, Record} from '@/models/Solidify'
import {Response, ResponseData} from "@/models/Network";
import {create} from "@/contracts/solidify";
import env from "@/core/env";
import {TransactionReceipt} from "web3-core";

/**
 * Create record handler
 *
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<TransactionReceipt | null>>
) {
    // Post only
    if (req.method !== 'POST') {
        res.status(405).json(Response.failure('Method Not Allowed'))
        return
    }

    // Validate parameters
    if (!isRecord(req.body)) {
        res.status(400).json(Response.failure('Bad Request'))
        return
    }

    const record: Record = req.body;

    const response = await create(record, env.account)

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
}
