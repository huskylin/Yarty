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

const { Header, Content } = Layout;
const { Title } = Typography;

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
            }}
          >
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image
                src={'/logo.png'}
                alt="logo"
                width={'36'}
                height={'36'}
              ></Image>
              <Title level={3} style={{ margin: '0 30px' }}>
                Youtube Partylist
              </Title>
              <SearchBar setPlaylistRaw={setPlaylistRaw}></SearchBar>
            </div>
          </Header>
          <Content>
            <Row style={{ height: '100%' }}>
              <Col span={12} style={{ padding: 10 }}>
                <SearchPlaylist
                  dispatch={dispatch}
                  playlistRaw={playlistRaw}
                ></SearchPlaylist>
              </Col>

              <Col span={12} style={{ padding: 10 }}>
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
