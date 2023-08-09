
import { NextResponse } from 'next/server'
import { postYT } from '../fetchYT';
import { headers } from 'next/headers'

export async function POST(request: Request) {
    try {
        const res = await request.json()
        const playlistId = res.playlistId
        const resourceId = res.resourceId
        const delayBetweenRequests = 300;
        const response = []

        for (const videoId of resourceId) {
            const parm = 'part=id,snippet,status';
            const headersInstance = headers();
            const authorization = headersInstance.get('authorization');
            const insertPlaylist = postYT(
                'playlistItems',
                parm,
                { authorization },
                {
                    snippet: {
                        playlistId,
                        resourceId: {
                            kind: 'youtube#video',
                            videoId: videoId
                        }
                    }
                }
            );

            response.push(await insertPlaylist);
            await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
        }
        return NextResponse.json({ message: 'Batch request completed', data: response });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}