import type {NextApiRequest, NextApiResponse} from 'next'
import {Response, ResponseData} from "@/models/Network";
import {erase} from "@/contracts/solidify";
import env from "@/core/env";
import {TransactionReceipt} from "web3-core";

/**
 * Erase record handler
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

    const {recordId} = req.query

    // Validate parameters
    if (recordId == undefined || typeof recordId !== "string") {
        res.status(400).json(Response.failure('Bad Request'))
        return
    }

    const response = await erase(parseInt(recordId), env.account)

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
}
