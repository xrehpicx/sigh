// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import FuzzySearch from 'fuzzy-search';
import { getDocsStruct, minioClient } from 'lib/minio'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {

    res.send('ok')

}
