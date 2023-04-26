import type { NextApiRequest, NextApiResponse } from 'next'
import fetchYT from './fetchYT';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const apiName = `playlists`
    const parms = `part=snippet&id=${req.query.playlistId}`
    const playList = await fetchYT(apiName, parms);
    res.end(JSON.stringify(playList))
}
