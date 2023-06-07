import React, { useState } from 'react';
import { Button, Card, InputNumber, Typography } from 'antd';
import useListData from './common/useListData';
import List from './common/List';
const { Text } = Typography;

const SearchPlaylist: React.FC<any> = ({ dispatch, playlistRaw }) => {
  const { playlist, playlistKey, randomPlaylist, randomPlaylistKey } =
    useListData(playlistRaw ? playlistRaw : []);
  const [randomNumber, setRandomNumber] = useState<number>(5);
  const addAllPartyList = () => {
    dispatch({ type: 'add', payload: { playlist, playlistKey } });
  };
  const addRandomPartyList = () => {
    if (!playlistRaw?.items) return;
    dispatch({
      type: 'add',
      payload: {
        playlist: randomPlaylist.slice(0, randomNumber),
        playlistKey: randomPlaylist
          .slice(0, randomNumber)
          .map((e) => e.key)
          .toString(),
      },
    });
  };
  const cardTitle = () => {
    if (playlistRaw && playlistRaw?.items.items.length > 0) {
      return (
        <>
          <Text style={{ fontSize: '21px' }}>
            {playlistRaw.listName.items[0].snippet.title}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Text type={'secondary'} style={{ fontSize: '16px' }}>
              {playlistRaw.listName.items[0].snippet.channelTitle}
            </Text>
          </Text>
        </>
      );
    }
    return <Text style={{ fontSize: '21px' }}>請輸入播放清單</Text>;
  };
  return (
    <Card
      title={cardTitle()}
      bordered={false}
      extra={
        <div style={{ display: 'flex' }}>
          <InputNumber
            min={1}
            max={20}
            defaultValue={5}
            onChange={(value: number | null) => {
              if (value) {
                setRandomNumber(value);
              }
            }}
            style={{ width: '64px' }}
          />
          <Button onClick={() => addRandomPartyList()}>隨機</Button>
          <Button onClick={() => addAllPartyList()}>全部</Button>
        </div>
      }
      bodyStyle={{ height: '80vh', overflow: 'auto' }}
    >
      <List
        data={playlist || []}
        key={playlistKey + 's'}
        from={'single'}
      ></List>
    </Card>
  );
};

export default SearchPlaylist;
