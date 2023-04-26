import type { NextApiRequest, NextApiResponse } from 'next'
import fetchYT from './fetchYT';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const apiName = `playlistItems`
    const parms = `part=id&part=snippet&maxResults=50&playlistId=${req.query.playlistId}`
    const playListItems = await fetchYT(apiName, parms);

    res.end(JSON.stringify(playListItems))
}
