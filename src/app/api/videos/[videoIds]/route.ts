import { NextResponse } from 'next/server'
import fetchYT from '../../fetchYT';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const videoIds = searchParams.get('videoIds')
    const apiName = `videos`
    const parms = `part=contentDetails, id&id=${videoIds}`
    const VideoDetails = await fetchYT(apiName, parms);

    return NextResponse.json(VideoDetails)
}