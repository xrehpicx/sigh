import * as Minio from 'minio'

if (!(process.env.MINIO_PORT && process.env.MINIO_EP && process.env.MINIO_ACCESS && process.env.MINIO_SECRET)) {
    throw new Error('Env variables not setup')
}

export const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_EP,
    useSSL: false,
    port: Number(process.env.MINIO_PORT),
    accessKey: process.env.MINIO_ACCESS,
    secretKey: process.env.MINIO_SECRET
});


export async function fetchLatestVersion(bucketName: string) {
    const doc = await getDocsStruct(bucketName)
    const versions = (Array.from(new Set(doc?.map(file => file.name.split('/')[0]))))
    return (versions
        .filter((name) => !name.endsWith('.pre') && !name.includes('rc'))
        .reduce((a, b) =>
            0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
                ? a
                : b
        ));
}

export async function serviceExists(bucketName: string) {
    return await minioClient.bucketExists(bucketName)
}
export async function getAllServices() {
    return await minioClient.listBuckets()
}

export function getAllBucketData(){
    
}

export async function getHomeDoc() {
    // minioClient.get
    if (!(await minioClient.bucketExists("docs-home"))) {
        return
    }

}

export function getDoc(bucketName: string, objectPath: string) {
    return new Promise<string>(async (res, rej) => {
        const chunks: Uint8Array[] = [];
        const stream = await minioClient.getObject(
            bucketName,
            objectPath
        );
        stream.on("data", (data) => {
            chunks.push(data);
        });
        stream.on("error", (err) => {
            console.log(err);
            rej();
        });
        stream.on("end", () => {
            res(Buffer.concat(chunks).toString("utf8"));
        });
    })
}

export async function getDocsStruct(bucketName: string, path: string = '') {
    if (!(await minioClient.bucketExists(bucketName))) {
        return null
    }
    const stream = minioClient.listObjects(bucketName, path, true);

    return await (new Promise<Minio.BucketItem[]>((res, rej) => {
        const data: Minio.BucketItem[] = [];
        stream.on("data", function (obj) {
            data.push(obj);
        });
        stream.on("end", function () {
            res(data);
        });
        stream.on("error", function (err) {
            rej(err);
        });
    }))

}

function getDataFromBucket(bucketName: string, objectName: string) {
    // minioClient.fGetObject(bucket)
}