import React, { useState } from 'react';
import useListData from '../common/useListData';
import List from '../common/List';
import {
  Container,
  StyledButton,
  StyledCard,
  StyledCardTitle,
  StyledInputNumber,
} from './style';
import CardTitle from '../common/CardTitle';

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

  return (
    <StyledCard
      title={
        <StyledCardTitle>
          <CardTitle playlistRaw={playlistRaw}></CardTitle>
        </StyledCardTitle>
      }
      bordered={false}
      extra={
        <Container>
          <StyledInputNumber
            min={1}
            max={20}
            defaultValue={5}
            controls={true}
            onChange={(value) => {
              if (value) {
                setRandomNumber(value as number);
              }
            }}
          />
          <StyledButton onClick={() => addRandomPartyList()}>隨機</StyledButton>
          <StyledButton onClick={() => addAllPartyList()}>全部</StyledButton>
        </Container>
      }
      bodyStyle={{ overflow: 'auto' }}
    >
      <List
        data={playlist || []}
        key={playlistKey + 's'}
        from={'single'}
      ></List>
    </StyledCard>
  );
};

export default SearchPlaylist;
