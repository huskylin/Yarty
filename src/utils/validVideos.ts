import { YouTubeVideosResponse } from "@/interface/Videos";

export const getRegion = async () => {
    let region = 'TW';
    try {
        const res = await fetch(`http://ip-api.com/json`);
        const data = await res.json();
        region = data.countryCode;
    } catch (error) {
        console.log(error);
        region = navigator.language.split('-')[1];
    }
    console.log('region', region);
    return region;
};
export const checkRegionRestriction = async (videoIds: string[]) => {
    console.log(videoIds);
    if (videoIds.length === 0) return;
    const videoIdsParm = videoIds.join(',');
    const res = await fetch(
        `http://localhost:3000/api/getVideos?videoIds=${videoIdsParm}`
    );
    const data: YouTubeVideosResponse = await res.json();
    const region = await getRegion();
    return data.items.map((e) => {
        if (e.contentDetails.regionRestriction && e.contentDetails.regionRestriction.blocked) {
            e.contentDetails.regionRestriction.blocked.includes(region);
            return true;
        } else {
            return false;
        }
    });
};