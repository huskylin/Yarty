const apikey = process.env.YT_KEY;

async function fetchYT(apiName: string, parms: string) {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/${apiName}?${parms}&key=${apikey}`);
    return (await res.json());
};

export default fetchYT;