import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ListResponse } from '@/interface/list';
import { useRecommendations } from '../common/useRecommendations';
import { SearchInput } from './style';

const apiPath = process.env.API_PATH;

const fetchPlaylist = async (playlistId: string) => {
  try {
    const res = await fetch(`${apiPath}/api/list/${playlistId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch playlist');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const SearchBar: React.FC<{ setPlaylistRaw: (data: ListResponse) => void }> = ({
  setPlaylistRaw,
}) => {
  const [playlistId, setPlaylistId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const recommendations = useRecommendations();
  const { refetch, isLoading } = useQuery(
    ['playList', playlistId],
    () => {
      if (playlistId) {
        return fetchPlaylist(playlistId);
      } else {
        return Promise.resolve();
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!playlistId,
      onSuccess: (data: ListResponse) => {
        if (data.items.items && data.listName.items) {
          setPlaylistRaw(data);
        }
      },
    }
  );
  const onSearch = (playlistIdRaw: string): void => {
    if (!playlistIdRaw) return;
    // is playlist
    const id = playlistIdRaw.match(/(list=)+([a-zA-Z0-9_-]+)/) as string[];
    if (!id || !id[2]) {
      setIsValid(false);
      return;
    }
    // is video
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
    setIsValid(true);
    setPlaylistId(id[2]);
    refetch();
  };
  return (
    <SearchInput
      defaultValue={`https://www.youtube.com/playlist?list=${
        recommendations[Math.floor(Math.random() * recommendations.length)]
      }`}
      allowClear
      onSearch={onSearch}
      loading={isLoading}
      size="large"
      status={isValid ? '' : 'error'}
    />
  );
};

export default SearchBar;