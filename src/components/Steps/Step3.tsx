import { Button } from 'antd';
import CardTitle from '../common/CardTitle';
import List from '../common/List';
import { StyledCard, StyledCardTitle } from './style';

export const Step3: React.FC<any> = ({
  playlistRaw,
  playlistKey,
  playlist,
}) => {
  return (
    <>
      {/* <StyledCard
        title={
          <StyledCardTitle>
            <CardTitle playlistRaw={playlistRaw}></CardTitle>
          </StyledCardTitle>
        }
        bordered={false}
        bodyStyle={{ overflow: 'auto', height: '90%' }}
      >
        <List
          data={playlist || []}
          key={playlistKey + 's'}
          from={'single'}
        ></List>
      </StyledCard> */}
      <div style={{ width: 800, margin: 'auto' }}>
        已匯出至您的 YouTube 播放清單!
      </div>
    </>
  );
};
