import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const apiPath = process.env.API_PATH
    const getItems = fetch(
        `${apiPath}/api/getListItems?playlistId=${req.query.playlistId}`
    );
    const getListName = fetch(
        `${apiPath}/api/getListName?playlistId=${req.query.playlistId}`
    );
    const items = await (await getItems).json()
    const listName = await (await getListName).json()
    res.end(JSON.stringify({ items, listName }))
}
