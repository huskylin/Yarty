import type { NextApiRequest, NextApiResponse } from 'next'
import fetchYT from './fetchYT';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const getItems = fetch(
        `http://localhost:3000/api/getListItems?playlistId=${req.query.playlistId}`
    );
    const getListName = fetch(
        `http://localhost:3000/api/getListName?playlistId=${req.query.playlistId}`
    );
    // const result = await Promise.all([getItems, getListName])
    const items = await (await getItems).json()
    const listName = await (await getListName).json()
    res.end(JSON.stringify({ items, listName }))
}
