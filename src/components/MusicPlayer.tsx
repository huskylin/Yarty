import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { Button, Slider } from 'antd';
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
import styled from 'styled-components';
import devices from '@/utils/devices';
import Image from 'next/image';
import { shuffle } from '@/utils/shuffle';

const { Text } = Typography;

interface ButtonProps {
  isActive?: boolean;
}
const StyledButton = styled(Button)<ButtonProps>`
  font-size: 18px;
  color: ${(props) =>
    props.isActive ? props.theme.antd.colorPrimary : 'inherit'};
`;

const StyledBigButton = styled(Button)`
  display: flex;
  align-content: center;
  font-size: 32px;
  height: auto;
`;

const StyledSlider = styled(Slider)`
  /* width: 99vw;
  margin-left: -50px;
  position: absolute;
  top: -4px;
  padding-top: 0px; */
`;

const StyledDuration = styled.div`
  display: none;
  @media ${devices.laptop} {
    display: initial;
  }
`;

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

  const play = () => {
    console.log(player, playerRef.current?.getInternalPlayer());
    if (!player) return;
    console.log(playlist);
    if (
      player.getPlaylist()?.length === 0 ||
      !player.getVideoData()?.video_id ||
      player.getPlayerState() === -1
    ) {
      console.log(player.getPlayerState());
      updatePlayingList();
    }

    // updatePlayingList();
    setTimeout(() => {
      player.playVideo();
      console.log(player.getPlaylist(), player.getVideoUrl());
      console.log('play');
    }, 200);
  };
  const pause = () => {
    if (!player) return;
    player?.pauseVideo();
    setIsPlay(false);
  };
  const stop = () => {
    if (!player) return;
    player?.stopVideo();
    onEnd();
  };
  const skipNotPlayableVideo = (num: number) => {
    const playlistIndex = player.playerInfo.playlist
      ? player.playerInfo.playlist?.indexOf(player.getVideoData().video_id)
      : 0;
    let playingIndex = playlistIndex + num;
    console.log('skip', playingList, playingIndex);
    player.cuePlaylist(playingList.videoIds, playingIndex);
  };
  const next = () => {
    console.log(player.getVideoData()?.video_id);
    updatePlayingList();
    if (!player) return;
    setTimeout(() => {
      console.log('next');
      player?.nextVideo();
    }, 1000);
  };
  const previous = () => {
    if (!player) return;
    setTimeout(() => {
      console.log('pre');
      player?.previousVideo();
    }, 1000);
  };
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
    console.log('random', bool, isShuffle);
  };
  const setRepeatOne = (bool: boolean) => {
    setIsRepeatOne((pre) => !pre);
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    const player = event.target;
    console.log(event);
    // setPlayer(playerRef.current?.getInternalPlayer().playVideo());
    if (!player || !player.i || !player.g) return;
    setPlayer(() => player);
  };
  const onPlay = () => {
    setCurrentVideoData(player.getVideoData());
    setCurrentVideoThumbnails(getSrcById(player.getVideoData().video_id));
    setIsPlay(true);
    updateDuration();
    listenCurrentTime();
  };
  const onEnd = () => {
    console.log('on end');
    setCurrentVideoData('');
    setCurrentVideoThumbnails('');
    setIsPlay(false);
  };
  const onStateChange = (state: any) => {
    // console.log(
    //   'onStateChange',
    //   state,
    //   player.playerInfo.playlist.playbackQuality
    // );
  };

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
    console.log(playingList);
    if (playingList.raw.length < 1) return '';
    return playingList.raw.find((e: any) => e.videoId === id)
      .thumbnails as string;
  };

  const setVolume = (value: number) => {
    player.setVolume(value);
  };

  const setTimeAt = (value: number) => {
    player.seekTo(value);
  };

  const updatePlayingList = useCallback(async () => {
    if (!player) return;
    const playlistIndex = player.playerInfo.playlist
      ? player.playerInfo.playlist?.indexOf(player.getVideoData().video_id)
      : 0;
    if (
      (!isRepeat && playlistIndex + 1 >= player.playerInfo.playlist?.length) ||
      playlist.length === 0
    ) {
      console.log('finished!');
      stop();
    }
    let updatedPlaylist =
      playlist.map((e) => e.videoId) !== undefined
        ? playlist.map((e) => e.videoId)
        : [];
    let playingIndex = playlistIndex >= 0 ? playlistIndex : 0;
    if (isShuffle) {
      const random = shuffle([...updatedPlaylist]);
      console.log(
        updatedPlaylist[0],
        random[0],
        player.playerInfo.playlist?.indexOf(random[0]),
        playingIndex
      );
      playingIndex =
        playlist.map((e) => e.videoId).indexOf(random[0]) + 1 === playingIndex
          ? playlist.map((e) => e.videoId).indexOf(random[1])
          : playlist.map((e) => e.videoId).indexOf(random[0]);
      console.log('final indx', playingIndex);
    }
    console.log(updatedPlaylist);

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
      console.log('new playlist', updatedPlaylist, player.getPlaylist());
      stop();
      setTimeout(() => {
        player.cuePlaylist(updatedPlaylist, playingIndex + 1);
      }, 1000);
    } else {
      player.cuePlaylist(updatedPlaylist, playingIndex);
    }

    setPlayingList({ raw: playlist, videoIds: updatedPlaylist });
  }, [isRepeat, player, playlist, isShuffle]);

  useEffect(() => {
    if (!player || !player.i || !player.g) return;
    console.log('playlist change', player.getPlaylist(), playlist);
    if (!isPlay && !player.getPlaylist() && playlist.length > 0) {
      console.log('initial loading');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, player, isRepeatOne]);

  return (
    <>
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <StyledSlider
          value={progress.value}
          max={progress.max}
          style={{
            width: '100vw',
            position: 'absolute',
            paddingTop: '0px',
            margin: '0',
          }}
          tooltip={{
            formatter: (value) => secToMin(value),
            open: isTooltipVisible,
          }}
          handleStyle={{ top: '-4px' }}
          onAfterChange={(value) => setTimeAt(value)}
        />
      </div>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flex: '1 0',
          }}
        >
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
          <div></div>
          {currentVideoData && (
            <StyledDuration>
              {secToMin(progress.value)} / {secToMin(progress.max)}
            </StyledDuration>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: '3 3 200px',
            overflow: 'hidden',
          }}
        >
          {currentVideoData && (
            <>
              <Image
                src={currentVideoThumbnails}
                alt="thumbnails"
                width={'64'}
                height={'36'}
                style={{ margin: '0 10px' }}
              ></Image>
              <div style={{ flexDirection: 'column', display: 'flex' }}>
                <Text
                  strong
                  style={{
                    fontSize: '18px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentVideoData.title}
                </Text>
                <Text> {currentVideoData.author}</Text>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flex: '0 1 10px',
            justifyContent: 'center',
          }}
        >
          <StyledButton
            type="text"
            onClick={() => setRepeatOne(true)}
            isActive={isRepeatOne}
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
            isActive={isShuffle}
          >
            <TbArrowsShuffle />
          </StyledButton>
          <Slider
            min={0}
            max={100}
            defaultValue={100}
            onChange={(value: number) => setVolume(value)}
            style={{ width: '100px', marginRight: '25px' }}
            tooltip={{
              open: false,
            }}
          ></Slider>
        </div>
      </div>

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
