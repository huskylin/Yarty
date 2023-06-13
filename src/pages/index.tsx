import React, { useState, useReducer } from 'react';
import { Row, Col, Layout, Typography } from 'antd';
import { ListResponse } from '@/interface/list';
import SearchBar from '@/components/SearchBar';
import PartyPlaylist from '@/components/PartyPlaylist';
import MusicPlayer from '@/components/MusicPlayer';
import {
  partyListContext,
  partyListInitialState,
  reducer,
} from '@/context/partyListContext';
import SearchPlaylist from '@/components/SearchPlaylist';
import Image from 'next/image';
import Head from 'next/head';

const { Header, Content } = Layout;
export default function Home() {
  const [partyList, dispatch] = useReducer(reducer, partyListInitialState);
  const [playlistRaw, setPlaylistRaw] = useState<ListResponse>();

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
              padding: '16px',
            }}
          >
            <Head>
              <title>Yarty - Party Playlist</title>
            </Head>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ display: 'flex' }}>
                <Image
                  src={'/YartyLogo2.png'}
                  alt="logo"
                  width={'117'}
                  height={'45'}
                  style={{ marginRight: '16px' }}
                ></Image>
              </span>
              <SearchBar setPlaylistRaw={setPlaylistRaw}></SearchBar>
              <div style={{ width: '0 2 225px' }}></div>
            </div>
          </Header>
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
