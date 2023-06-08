import React, { useState } from 'react';
import { Input } from 'antd';
import { useQuery } from 'react-query';

const { Search } = Input;
const apiPath = process.env.API_PATH;

const fetchPlaylist = async (playlistId: string) => {
  if (!playlistId) return;
  const res = await fetch(`${apiPath}/api/getList?playlistId=${playlistId}`);
  const data = await res.json();
  return data;
};

const SearchBar: React.FC<any> = ({ setPlaylistRaw }) => {
  const [playlistId, setPlaylistId]: any = useState();
  const { data, isSuccess, refetch } = useQuery(
    ['playList', playlistId],
    () => fetchPlaylist(playlistId),
    {
      refetchOnWindowFocus: false,
      enabled: !!playlistId,
      onSuccess: (data) => {
        setPlaylistRaw(data);
      },
    }
  );
  const onSearch = (playlistId: string) => {
    if (!playlistId) return;
    const id = playlistId.match(/(list=)+([a-zA-Z0-9_-]+)/) as string[];
    if (!id[2]) return;
    setPlaylistId(id[2]);
    refetch();
  };
  return (
    <Search
      defaultValue={
        'https://www.youtube.com/playlist?list=PLWpc_btr7hYDAKu52Icz3-Z09nZ0SVW1A'
      }
      allowClear
      onSearch={onSearch}
      size="large"
      style={{ flex: '0 1 728px' }}
    />
  );
};

export default SearchBar;
