import { useState, useEffect } from 'react';
import { Item, ListColumn, ListResponse } from '@/interface/list';
import { shuffle } from '@/utils/shuffle';
import { useRegionRestriction } from './useRegion';

export default function useListData(
  playlistsRaw: ListResponse[] | ListResponse
) {
  const [playlist, setPlaylist] = useState<ListColumn[]>([]);
  const [playlistKey, setPlaylistKey] = useState('');
  const [randomPlaylist, setRandomPlaylist] = useState<ListColumn[]>([]);
  const [randomPlaylistKey, setRandomPlaylistKey] = useState('');
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const { data: isRestricted } = useRegionRestriction(videoIds);

  useEffect(() => {
    let allLists;
    if (Array.isArray(playlistsRaw)) {
      if (!playlistsRaw || playlistsRaw.length < 1) return;
      allLists = playlistsRaw.map((list: any) => list.items);
    } else {
      allLists = [playlistsRaw.items];
    }
    const allItems = allLists.map((list: any) => list.items).flat();
    const videoIds = allItems.map(
      (item: Item) => item.snippet.resourceId.videoId
    );
    setVideoIds(videoIds);

    function validItems() {
      return allItems.filter((item: Item, index: number) => {
        return (
          item.snippet.title !== 'Private video' &&
          isRestricted &&
          !isRestricted[index]
        );
      });
    }

    function set() {
      const validatedItems = validItems();
      const listData: ListColumn[] = validatedItems.map((item: Item) => {
        return {
          key: item.id,
          title: item.snippet.title,
          thumbnails: item.snippet.thumbnails?.medium.url || '',
          videoOwnerChannelTitle: item.snippet.videoOwnerChannelTitle,
          videoId: item.snippet.resourceId.videoId,
        };
      });
      const randomListData: ListColumn[] = shuffle([...listData]);
      setRandomPlaylist(randomListData);
      setPlaylist(listData);
      setPlaylistKey(listData.map((e) => e.key).toString());
      setRandomPlaylistKey(randomListData.map((e) => e.key).toString());
    }
    set();
  }, [isRestricted, playlistsRaw]);

  return { playlist, playlistKey, randomPlaylist, randomPlaylistKey };
}
