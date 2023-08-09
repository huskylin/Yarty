import { ListResponse } from "@/interface/list";
const apiPath = process.env.API_PATH;

export const fetchPlaylist = async (playlistId: string): Promise<any> => {
    try {
        const res = await fetch(`${apiPath}/api/list/${playlistId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch playlist');
        }
        const data: ListResponse = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}; 