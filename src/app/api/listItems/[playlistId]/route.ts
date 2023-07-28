import { NextResponse } from 'next/server'
import fetchYT from '../../fetchYT';

export async function GET(_: any, { params }: { params: { playlistId: string } }) {
    const playlistId = params.playlistId;
    const apiName = `playlistItems`
    const parms = `part=id&part=snippet&maxResults=50&playlistId=${playlistId}`
    const playListItems = await fetchYT(apiName, parms);
    
    return NextResponse.json(playListItems)
}
