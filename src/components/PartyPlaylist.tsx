import React, { useState, useContext, useEffect, useReducer } from 'react';
import { Button, Card, Typography } from 'antd';
import List from '@/components/common/List';
import { Item, ListResponse } from '@/interface/list';
import useListData from './common/useListData';
import {
  partyListContext,
  partyListInitialState,
  reducer,
} from '@/context/partyListContext';
const { Text } = Typography;

const PartyPlayList: React.FC<any> = ({ resetPartyList }) => {
  const { playlist, playlistKey } = useContext(partyListContext);
  const handleReset = () => resetPartyList();
  return (
    <Card
      title={
        <>
          <Text style={{ fontSize: '21px' }}>已加入歌曲</Text>
        </>
      }
      bordered={false}
      bodyStyle={{ height: '80vh', overflow: 'auto' }}
      extra={<Button onClick={() => handleReset()}>清除</Button>}
    >
      <List data={playlist} key={playlistKey} from={'party'}></List>
    </Card>
  );
};

export default PartyPlayList;
