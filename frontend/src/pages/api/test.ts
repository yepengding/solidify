import type {NextApiRequest, NextApiResponse} from 'next'
import web3 from "@/core/web3";

type Data = {
    author: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({author: 'Yepeng Ding'})
}
