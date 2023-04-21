import type {NextApiRequest, NextApiResponse} from 'next'
import {Response, ResponseData} from "@/models/Network";
import {retrieve} from "@/contracts/solidify";
import {Mixed} from "web3-utils";

/**
 * Retrieve record handler
 *
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<Mixed | null>>
) {
    // Get only
    if (req.method !== 'GET') {
        res.status(405).json(Response.failure('Method Not Allowed'))
        return
    }

    const {recordId} = req.query

    // Validate parameters
    if (recordId == undefined || typeof recordId !== "string") {
        res.status(400).json(Response.failure('Bad Request'))
        return
    }

    const response = await retrieve(parseInt(recordId))

    if (response.success) {
        res.status(200).json(response);
    } else {
        res.status(400).json(response);
    }
}
