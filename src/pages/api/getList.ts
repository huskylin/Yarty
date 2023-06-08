import type { NextApiRequest, NextApiResponse } from 'next';
const apiPath = process.env.API_PATH;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const getItems = await fetch(
        `${apiPath}/api/getListItems?playlistId=${req.query.playlistId}`
    );
    const getListName = await fetch(
        `${apiPath}/api/getListName?playlistId=${req.query.playlistId}`
    );
    const [items, listName] = await Promise.all([getItems.json(), getListName.json()]);

    res.end(JSON.stringify({ items, listName }));
};
