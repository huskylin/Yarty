import type { NextApiRequest, NextApiResponse } from 'next'
import fetchYT from './fetchYT';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const apiName = `videos`
    const parms = `part=contentDetails, id&id=${req.query.videoIds}`
    const VideoDetails = await fetchYT(apiName, parms);
    
    res.end(JSON.stringify(VideoDetails))
}