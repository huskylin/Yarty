import React, { useState, useReducer } from 'react';
import SearchBar from '@/components/SearchBar';
import { Layout, Button, Modal } from 'antd';
import Image from 'next/image';
import Head from 'next/head';
import Login from '../common/Login';
import { useSession } from 'next-auth/react';
import { ImageButton, StyledButton } from './style';
import { Session } from '@/interface/list';

const { Header } = Layout;

const PageHeader: React.FC<any> = ({ setPlaylistRaw }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession() as { data: Session | null };
  const openLogin = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
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
          <meta
            name="description"
            content="YouTube playlists mixer for party"
          ></meta>
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
          <div>
            {session && (
              <ImageButton onClick={openLogin}>
                <Image
                  src={session.user.image}
                  alt="logo"
                  width={'36'}
                  height={'36'}
                  // style={{ objectFit: 'cover' }}
                ></Image>
              </ImageButton>
            )}
            {!session && <Button onClick={openLogin}>登入</Button>}
          </div>
        </div>
      </Header>
      <Modal
        title={''}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={''}
      >
        <Login></Login>
      </Modal>
    </>
  );
};

export default PageHeader;
