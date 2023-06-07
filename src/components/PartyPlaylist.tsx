import React, { useContext, useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import List from '@/components/common/List';
import { partyListContext } from '@/context/partyListContext';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { ListColumn } from '@/interface/list';

const { Text } = Typography;

const PartyPlayList: React.FC<any> = ({ dispatch }) => {
  const { playlist, playlistKey } = useContext(partyListContext);
  const [partyPlaylistLocal, setPartyPlaylistLocal] = useLocalStorage<
    ListColumn[]
  >('partyPlaylist', []);

  useEffectOnce(() => {
    dispatch({
      type: 'add',
      payload: { playlist: partyPlaylistLocal, playlistKey: 'local' },
    });
  });

  useEffect(() => {
    setPartyPlaylistLocal(playlist);
  }, [playlist, setPartyPlaylistLocal]);

  const resetPartyList = () => {
    dispatch({ type: 'reset' });
  };
  return (
    <Card
      title={<Text style={{ fontSize: '21px' }}>已加入歌曲</Text>}
      bordered={false}
      bodyStyle={{ height: '80vh', overflow: 'auto' }}
      extra={<Button onClick={() => resetPartyList()}>清除</Button>}
    >
      <List data={playlist} key={playlistKey} from={'party'}></List>
    </Card>
  );
};

export default PartyPlayList;
