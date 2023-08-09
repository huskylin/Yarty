
import { NextResponse } from 'next/server'
import { postYT } from '../fetchYT';
import { headers } from 'next/headers'

export async function POST(request: Request) {
    const res = await request.json()
    const title = res.title
    const description = res.description || ''
    const parm = 'part=id,snippet,status'
    const headersInstance = headers()
    const authorization = headersInstance.get('authorization')
    try {
        const insertPlaylist = postYT(
            'playlists',
            parm,
            { authorization },
            {
                snippet: {
                    title,
                    description,
                },
                status: {
                    "privacyStatus": 'public'
                },
            },
        );

        const response = await insertPlaylist;
        return response
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
