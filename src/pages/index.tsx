import React, { useState, useReducer } from 'react';
import List from '@/components/common/List';
import SearchBar from '@/components/SearchBar';
import { Card, Row, Col, Layout, InputNumber } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
import { ListResponse } from '@/interface/list';
import PartyPlaylist from '@/components/PartyPlaylist';
import useListData from '@/components/common/useListData';
import MusicPlayer from '@/components/MusicPlayer';
import {
  partyListContext,
  partyListInitialState,
  reducer,
} from '@/context/partyListContext';

const { Header, Content } = Layout;
const { Text } = Typography;

export default function Home() {
  const [playlistRaw, setPlaylistRaw] = useState<ListResponse>();
  const [partyList, dispatch] = useReducer(reducer, partyListInitialState);
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
  const resetPartyList = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <>
      <partyListContext.Provider value={partyList}>
        <Layout style={{ height: '100vh' }}>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SearchBar setPlaylistRaw={setPlaylistRaw}></SearchBar>
            </div>
          </Header>
          <Content>
            <Row style={{ height: '100%' }}>
              <Col span={12} style={{ padding: 10 }}>
                {playlistRaw && playlistRaw?.items.items.length > 0 && (
                  <Card
                    title={
                      <>
                        <Text style={{ fontSize: '21px' }}>
                          {playlistRaw.listName.items[0].snippet.title}
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <Text type={'secondary'} style={{ fontSize: '16px' }}>
                            {playlistRaw.listName.items[0].snippet.channelTitle}
                          </Text>
                        </Text>
                      </>
                    }
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
                        <Button onClick={() => addRandomPartyList()}>
                          隨機
                        </Button>
                        <Button onClick={() => addAllPartyList()}>全部</Button>
                      </div>
                    }
                    bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
                  >
                    <List
                      data={playlist}
                      key={playlistKey}
                      from={'single'}
                    ></List>
                  </Card>
                )}
              </Col>

              <Col span={12} style={{ padding: 10 }}>
                <PartyPlaylist resetPartyList={resetPartyList}></PartyPlaylist>
              </Col>
            </Row>
          </Content>
          <Header
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              width: '100%',
              paddingInline: '0',
              backgroundColor: '#ffffff',
            }}
          >
            <MusicPlayer></MusicPlayer>
          </Header>
        </Layout>
      </partyListContext.Provider>
    </>
  );
}
