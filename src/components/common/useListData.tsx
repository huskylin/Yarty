import React, { useState, useEffect } from 'react';
import { Item, Items, ListResponse } from '@/interface/list';

interface ListColumn {
  key: string;
  title: string;
  thumbnails: string;
  videoOwnerChannelTitle: string;
}

function shuffle(array: any) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function useListData(
  playlistsRaw: ListResponse[] | ListResponse
) {
  const [playlist, setPlaylist] = useState<ListColumn[]>([]);
  const [playlistKey, setPlaylistKey] = useState('');
  const [randomPlaylist, setRandomPlaylist] = useState<ListColumn[]>([]);
  const [randomPlaylistKey, setRandomPlaylistKey] = useState('');

  useEffect(() => {
    let allLists;
    if (Array.isArray(playlistsRaw)) {
      if (!playlistsRaw || playlistsRaw.length < 1) return;
      allLists = playlistsRaw.map((list: any) => list.items);
    } else {
      allLists = [playlistsRaw.items];
    }
    const allItems = allLists.map((list: any) => list.items).flat();
    const validItems = allItems.filter(
      (item: Item) => item.snippet.title !== 'Private video'
    );
    const listData: ListColumn[] = validItems.map((item: Item) => {
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
  }, [playlistsRaw]);

  return { playlist, playlistKey, randomPlaylist, randomPlaylistKey };
}
