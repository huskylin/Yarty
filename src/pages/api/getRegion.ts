import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const region = await fetch('http://ip-api.com/json');
    const data = await region.json();
    res.end(JSON.stringify(data))
}

