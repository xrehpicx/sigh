export function linktree(links: string[]) {

    type restype = { name: string, children: restype, path: string }[]
    let result: restype = [];
    let level: { [key: string]: { result: restype } | restype; result: restype } = { result };

    links.forEach((path: string) => {
        // @ts-ignore
        path.split('/').reduce((r, name, i, a) => {
            if (!r[name]) {
                r[name] = { result: [] };
                // @ts-ignore
                r.result.push({ name, children: r[name].result, path })
            }
            return r[name];
        }, level)
    })

    return result as restype

}