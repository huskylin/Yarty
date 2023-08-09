import React, { useContext, useEffect, useState } from 'react';
import { partyListContext } from '@/context/partyListContext';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { ListColumn, Session } from '@/interface/list';
import { CardTitle, ClearButton, StyledCard, StyledList } from './style';
import { Modal } from 'antd';
import Steps from '../Steps';
import { useSession } from 'next-auth/react';
import Login from '../common/Login';

const PartyPlayList: React.FC<any> = ({ dispatch }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isStepsOpen, setIsStepsOpen] = useState(false);
  const { playlist, playlistKey } = useContext(partyListContext);
  const [partyPlaylistLocal, setPartyPlaylistLocal] = useLocalStorage<
    ListColumn[]
  >('partyPlaylist', []);
  const { data: session } = useSession() as { data: Session | null };

  const openSteps = () => {
    setIsStepsOpen(true);
    setIsLoginOpen(true);
  };

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
    <>
      <StyledCard
        title={<CardTitle>已加入歌曲</CardTitle>}
        bordered={false}
        bodyStyle={{ overflow: 'auto' }}
        extra={
          <>
            <ClearButton onClick={() => resetPartyList()}>清除</ClearButton>
            <ClearButton onClick={() => openSteps()}>匯出</ClearButton>
          </>
        }
      >
        <StyledList data={playlist} key={playlistKey} from={'party'} />
      </StyledCard>
      {!session && (
        <Modal
          title={''}
          open={isLoginOpen}
          onOk={() => setIsLoginOpen(false)}
          onCancel={() => setIsLoginOpen(false)}
          footer={''}
        >
          <Login></Login>
        </Modal>
      )}
      {session && (
        <Modal
          key={playlistKey}
          title="匯出播放清單"
          open={isStepsOpen}
          onOk={() => setIsStepsOpen(false)}
          onCancel={() => setIsStepsOpen(false)}
          footer={[]}
          width={'80%'}
          bodyStyle={{ height: '700px', padding: '10px' }}
        >
          <Steps
            playlist={playlist}
            playlistKey={playlistKey}
            setIsStepsOpen={setIsStepsOpen}
          ></Steps>
        </Modal>
      )}
    </>
  );
};

export default PartyPlayList;
