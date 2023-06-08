import type { NextApiRequest, NextApiResponse } from 'next';
const apiPath = process.env.API_PATH;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const getItems = fetch(
        `${apiPath}/api/getListItems?playlistId=${req.query.playlistId}`
    );
    const getListName = fetch(
        `${apiPath}/api/getListName?playlistId=${req.query.playlistId}`
    );
    const [itemsResponse, listNameResponse] = await Promise.all([getItems, getListName]);
    const items = await itemsResponse.json();
    const listName = await listNameResponse.json();

    res.end(JSON.stringify({ items, listName }));
};
