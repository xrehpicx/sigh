// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDocsStruct, minioClient } from 'lib/minio'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  path: string
}

const fileTypes: {
  [key: string]: string
} = {
  svg: 'image/svg',
  png: 'image/png',
  md: 'text/md',
  json: "application/json"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log('api', req.query)
  const query = req.query as { file: string[] }
  const serviceName = query.file[0]
  const filePath = query.file.slice(1, query.file.length).join('/')
  console.log(serviceName, filePath)
  const stream = minioClient.getObject(serviceName, filePath);

  fileTypes[filePath.split('.')[1]] && res.setHeader('Content-Type', fileTypes[filePath.split('.')[1]]);
  (await stream).pipe(res)

}
