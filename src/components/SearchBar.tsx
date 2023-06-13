import React, { useState } from 'react';
import { Input } from 'antd';
import { useQuery } from 'react-query';
import { ListResponse } from '@/interface/list';
import { useRecommendations } from './common/useRecommendations';

const { Search } = Input;
const apiPath = process.env.API_PATH;

const fetchPlaylist = async (playlistId: string) => {
  try {
    const res = await fetch(`${apiPath}/api/getList?playlistId=${playlistId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch playlist');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const SearchBar: React.FC<any> = ({ setPlaylistRaw }) => {
  const [playlistId, setPlaylistId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const recommendations = useRecommendations();
  const { refetch, isLoading } = useQuery(
    ['playList', playlistId],
    () => fetchPlaylist(playlistId),
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
  const onSearch = (playlistIdRaw: string) => {
    if (!playlistIdRaw) return;
    const id = playlistIdRaw.match(/(list=)+([a-zA-Z0-9_-]+)/) as string[];
    if (!id || !id[2]) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setPlaylistId(id[2]);
    refetch();
  };
  return (
    <Search
      defaultValue={`https://www.youtube.com/playlist?list=${
        recommendations[Math.floor(Math.random() * recommendations.length)]
      }`}
      allowClear
      onSearch={onSearch}
      loading={isLoading}
      size="large"
      status={isValid ? '' : 'error'}
      style={{ flex: '0 1 728px' }}
    />
  );
};

export default SearchBar;
