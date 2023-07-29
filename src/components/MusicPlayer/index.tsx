import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { partyListContext } from '@/context/partyListContext';
import { Typography } from 'antd';
import {
  TbArrowsShuffle,
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbRepeat,
  TbRepeatOff,
  TbRepeatOnce,
} from 'react-icons/tb';
import { secToMin } from '@/utils/secToMin';
import { shuffle } from '@/utils/shuffle';
import {
  Container,
  ControlButtonsContainer,
  ControlsContainer,
  StyledBigButton,
  StyledButton,
  StyledDuration,
  StyledSlider,
  StyledVolumeSlider,
  ThumbnailsImage,
  VideoInfoContainer,
  VideoInfoTextContainer,
  VideoTitle,
} from './style';

const { Text } = Typography;

const opts: YouTubeProps['opts'] = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 0,
  },
};

const MusicPlayer: React.FC<any> = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(true);
  const [isRepeatOne, setIsRepeatOne] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentVideoData, setCurrentVideoData] = useState<any>('');
  const [progress, setProgress] = useState({ value: 0, max: 0 });
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [currentVideoThumbnails, setCurrentVideoThumbnails] = useState<any>('');
  const [playingList, setPlayingList] = useState<any>({
    raw: [],
    videoIds: [],
  });

  const playerRef = useRef<YouTube | null>(null);
  const { playlist } = useContext(partyListContext);

  // actions
  const stop = useCallback(() => {
    if (!player) return;
    player?.stopVideo();
    onEnd();
  }, [player]);
  const updatePlayingList = useCallback(async () => {
    if (!player) return;
    const playlistIndex = player.playerInfo.playlist
      ? player.playerInfo.playlist?.indexOf(player.getVideoData().video_id)
      : 0;
    if (
      (!isRepeat && playlistIndex + 1 >= player.playerInfo.playlist?.length) ||
      playlist.length === 0
    ) {
      stop();
    }
    let updatedPlaylist =
      playlist.map((e) => e.videoId) !== undefined
        ? playlist.map((e) => e.videoId)
        : [];
    let playingIndex = playlistIndex >= 0 ? playlistIndex : 0;
    if (isShuffle) {
      const random = shuffle([...updatedPlaylist]);
      playingIndex =
        playlist.map((e) => e.videoId).indexOf(random[0]) + 1 === playingIndex
          ? playlist.map((e) => e.videoId).indexOf(random[1])
          : playlist.map((e) => e.videoId).indexOf(random[0]);
    }

    const isChange = (arr1: string[], arr2: string[]) => {
      const array2Sorted = [...arr2].sort();
      return !(
        arr1.length === arr2.length &&
        arr1
          .slice()
          .sort()
          .every((value: string, index: number) => {
            return value === array2Sorted[index];
          })
      );
    };

    if (
      player.getPlaylist() &&
      isChange(updatedPlaylist, player.getPlaylist())
    ) {
      stop();
      setTimeout(() => {
        player.cuePlaylist(updatedPlaylist, playingIndex + 1);
      }, 1000);
    } else {
      player.cuePlaylist(updatedPlaylist, playingIndex);
    }

    setPlayingList({ raw: playlist, videoIds: updatedPlaylist });
  }, [player, isRepeat, playlist, isShuffle, stop]);
  const play = () => {
    if (!player) return;
    if (
      player.getPlaylist()?.length === 0 ||
      !player.getVideoData()?.video_id ||
      player.getPlayerState() === -1
    ) {
      updatePlayingList();
    }

    setTimeout(() => {
      player.playVideo();
    }, 200);
  };
  const pause = () => {
    if (!player) return;
    player?.pauseVideo();
    setIsPlay(false);
  };
  const next = useCallback(() => {
    updatePlayingList();
    if (!player) return;
    setTimeout(() => {
      player?.nextVideo();
    }, 1000);
  }, [player, updatePlayingList]);
  const previous = () => {
    if (!player) return;
    setTimeout(() => {
      player?.previousVideo();
    }, 1000);
  };

  // play option
  const setRepeat = (bool: boolean) => {
    if (!player) return;
    setIsRepeat(bool);
    player?.setLoop(bool);
  };
  const setShuffle = (bool: boolean) => {
    if (!player) return;
    setIsShuffle((pre) => {
      return !pre;
    });
    player?.setShuffle(bool);
  };
  const setRepeatOne = (bool: boolean) => {
    setIsRepeatOne((pre) => !pre);
  };

  // listener
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    if (!player || !player.i || !player.g) return;
    setPlayer(player);
  };
  const onPlay = () => {
    setCurrentVideoData(player.getVideoData());
    setCurrentVideoThumbnails(getSrcById(player.getVideoData().video_id));
    setIsPlay(true);
    updateDuration();
    listenCurrentTime();
  };
  const onEnd = () => {
    setCurrentVideoData('');
    setCurrentVideoThumbnails('');
    setIsPlay(false);
  };
  const onStateChange = (state: any) => {};
  const updateDuration = () => {
    setProgress((progress) => ({
      ...progress,
      max: player.getDuration(),
    }));
  };
  const listenCurrentTime = () => {
    window.clearInterval(timeoutId);
    const id = window.setInterval(() => {
      setProgress((progress) => ({
        ...progress,
        value: player.getCurrentTime(),
      }));
    }, 200);
    setTimeoutId(id);
  };
  const getSrcById = (id: string): string => {
    if (playingList.raw.length < 1) return '';
    return playingList.raw.find((e: any) => e.videoId === id)
      .thumbnails as string;
  };

  useEffect(() => {
    if (!player || !player.i || !player.g) return;
    if (!isPlay && !player.getPlaylist() && playlist.length > 0) {
      updatePlayingList();
    }
  }, [player, isPlay, updatePlayingList, playlist]);

  useEffect(() => {
    if (!player || !player.i || !player.g) return;
    if (progress.max > 0 && progress.max - progress.value <= 1) {
      if (isRepeatOne) {
        setProgress(() => ({
          value: 0,
          max: player.getDuration(),
        }));
        player.seekTo(0, true);
        player.playVideo();
      } else {
        next();
      }
    }
  }, [progress, player, isRepeatOne, next]);

  return (
    <>
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <StyledSlider
          value={progress.value}
          max={progress.max}
          tooltip={{
            formatter: (value) => secToMin(value),
            open: isTooltipVisible,
          }}
          handleStyle={{ top: '-4px' }}
          trackStyle={{
            background:
              'linear-gradient(to right, rgba(255, 0, 177, 0.5), rgba(255, 216, 0, 0.5))',
          }}
          onAfterChange={(value) => player.seekTo(value)}
        />
      </div>
      <Container>
        <ControlsContainer>
          <StyledButton type="text" onClick={() => previous()}>
            <TbPlayerSkipBackFilled />
          </StyledButton>

          {isPlay ? (
            <StyledBigButton type="text" onClick={() => pause()}>
              <TbPlayerPauseFilled />
            </StyledBigButton>
          ) : (
            <StyledBigButton type="text" onClick={() => play()}>
              <TbPlayerPlayFilled />
            </StyledBigButton>
          )}

          <StyledButton type="text" onClick={() => next()}>
            <TbPlayerSkipForwardFilled />
          </StyledButton>

          {currentVideoData && (
            <StyledDuration>
              {secToMin(progress.value)} / {secToMin(progress.max)}
            </StyledDuration>
          )}
        </ControlsContainer>

        <VideoInfoContainer>
          {currentVideoData && (
            <>
              <ThumbnailsImage
                src={currentVideoThumbnails}
                alt="thumbnails"
                width={64}
                height={36}
              />
              <VideoInfoTextContainer>
                <VideoTitle strong>{currentVideoData.title}</VideoTitle>
                <Text> {currentVideoData.author}</Text>
              </VideoInfoTextContainer>
            </>
          )}
        </VideoInfoContainer>

        <ControlButtonsContainer>
          <StyledButton
            type="text"
            onClick={() => setRepeatOne(true)}
            isactive={isRepeatOne.toString()}
          >
            <TbRepeatOnce />
          </StyledButton>

          {isRepeat ? (
            <StyledButton type="text" onClick={() => setRepeat(false)}>
              <TbRepeat />
            </StyledButton>
          ) : (
            <StyledButton type="text" onClick={() => setRepeat(true)}>
              <TbRepeatOff />
            </StyledButton>
          )}

          <StyledButton
            type="text"
            onClick={() => setShuffle(!isShuffle)}
            isactive={isShuffle.toString()}
          >
            <TbArrowsShuffle />
          </StyledButton>

          <StyledVolumeSlider
            min={0}
            max={100}
            defaultValue={100}
            onChange={(value) => player.setVolume(value)}
            tooltip={{
              open: false,
            }}
          ></StyledVolumeSlider>
        </ControlButtonsContainer>
      </Container>

      <YouTube
        opts={opts}
        onReady={onPlayerReady}
        onPlay={onPlay}
        onPause={() => setIsPlay(false)}
        onEnd={onEnd}
        onStateChange={(state) => onStateChange(state)}
        ref={playerRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default MusicPlayer;
