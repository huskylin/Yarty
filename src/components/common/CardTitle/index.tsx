import { StyledMediumText, StyledSmallText } from './style';

const CardTitle: React.FC<any> = ({ playlistRaw }) => {
  if (playlistRaw?.listName?.items?.length ?? false) {
    return (
      <>
        <StyledMediumText>
          {playlistRaw.listName.items[0].snippet.title}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <StyledSmallText type={'secondary'} style={{ fontSize: '16px' }}>
            {playlistRaw.listName.items[0].snippet.channelTitle}
          </StyledSmallText>
        </StyledMediumText>
      </>
    );
  }
  return <StyledMediumText>請輸入播放清單</StyledMediumText>;
};

export default CardTitle;
