import { NextResponse } from "next/server";

const apikey = process.env.YT_KEY;

async function fetchYT(apiName: string, parms: string) {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/${apiName}?${parms}&key=${apikey}`);
    return (await res.json());
};

export async function postYT(apiName: string, parms: string, headers: any, body: object) {
    try {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/${apiName}?${parms}&key=${apikey}`,
            {
                method: "POST",
                headers: {
                    authorization: headers.authorization
                },
                body: JSON.stringify(body)
            });
        const response = await res.json()
        return new NextResponse(JSON.stringify(response), {
            status: response.error ? response.error.code : 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchYT;