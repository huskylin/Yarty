import { NextResponse } from 'next/server'
const apiPath = process.env.API_PATH;


export async function GET(_: any, { params }: { params: { playlistId: string } }) {
    const playlistId = params.playlistId
    const getItems = fetch(
        `${apiPath}/api/listItems/${playlistId}`
    );
    const getListName = fetch(
        `${apiPath}/api/listNames/${playlistId}`
    );
    const [itemsResponse, listNameResponse] = await Promise.all([getItems, getListName]);

    const items = await itemsResponse.json();
    const listName = await listNameResponse.json();

    return NextResponse.json({ items, listName })
}