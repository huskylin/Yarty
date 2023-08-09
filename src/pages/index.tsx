import React, { useState, useReducer } from 'react';
import { Row, Col, Layout } from 'antd';
import { ListResponse } from '@/interface/list';
import PartyPlaylist from '@/components/PartyPlaylist';
import MusicPlayer from '@/components/MusicPlayer';
import {
  partyListContext,
  partyListInitialState,
  reducer,
} from '@/context/partyListContext';
import SearchPlaylist from '@/components/SearchPlaylist';
import PageHeader from '@/components/PageHeader';

const { Header, Content } = Layout;
export default function Home() {
  const [partyList, dispatch] = useReducer(reducer, partyListInitialState);
  const [playlistRaw, setPlaylistRaw] = useState<ListResponse>();

  return (
    <>
      <partyListContext.Provider value={partyList}>
        <Layout style={{ height: '100vh' }}>
          <PageHeader setPlaylistRaw={setPlaylistRaw}></PageHeader>
          <Content style={{ overflow: 'auto' }}>
            <Row style={{ height: '100%', flexWrap: 'wrap' }}>
              <Col xs={24} sm={12} style={{ padding: 10, flex: '0 0 100%' }}>
                <SearchPlaylist
                  dispatch={dispatch}
                  playlistRaw={playlistRaw}
                ></SearchPlaylist>
              </Col>

              <Col xs={24} sm={12} style={{ padding: 10, flex: '0 0 100%' }}>
                <PartyPlaylist dispatch={dispatch}></PartyPlaylist>
              </Col>
            </Row>
          </Content>
          <Header
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1,
              width: '100%',
              padding: '0',
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
