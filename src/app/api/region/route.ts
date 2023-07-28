import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const region = await fetch('http://ip-api.com/json');
    const data = await region.json();

    return NextResponse.json(data)
}

