import { NextResponse } from 'next/server'
import fetchYT from '../../fetchYT';

export async function GET(_: any, { params }: { params: { playlistId: string } }) {
    const playlistId = params.playlistId;
    const apiName = `playlists`;
    const parms = `part=snippet&id=${playlistId}`;
    const playList = await fetchYT(apiName, parms);

    return NextResponse.json(playList)
}
