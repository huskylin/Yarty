import React, { useContext, useEffect } from 'react';
import { partyListContext } from '@/context/partyListContext';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { ListColumn } from '@/interface/list';
import { CardTitle, ClearButton, StyledCard, StyledList } from './style';

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
    <StyledCard
      title={<CardTitle>已加入歌曲</CardTitle>}
      bordered={false}
      bodyStyle={{ overflow: 'auto' }}
      extra={<ClearButton onClick={() => resetPartyList()}>清除</ClearButton>}
    >
      <StyledList data={playlist} key={playlistKey} from={'party'} />
    </StyledCard>
  );
};

export default PartyPlayList;
