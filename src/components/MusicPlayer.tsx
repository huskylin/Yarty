import React, { useState, useRef, useContext, useEffect } from 'react';
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
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [isRepeatOne, setIsRepeatOne] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentVideoData, setCurrentVideoData] = useState<any>('');
  const [progress, setProgress] = useState({ value: 0, max: 0 });
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [currentVideoThumbnails, setCurrentVideoThumbnails] = useState<any>('');

  const playerRef = useRef<YouTube | null>(null);
  const { playlist } = useContext(partyListContext);

  const play = () => {
    if (!player) return;
    playerRef.current?.getInternalPlayer().playVideo();
  };
  const pause = () => {
    if (!player) return;
    player?.pauseVideo();
    setIsPlay(false);
  };
  const next = () => {
    if (!player) return;
    player?.nextVideo();
  };
  const previous = () => {
    if (!player) return;
    player?.previousVideo();
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
  };
  const setRepeatOne = (bool: boolean) => {
    setIsRepeatOne((pre) => !pre);
  };

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(() => event.target);
  };
  const onPlay = () => {
    setCurrentVideoData(player.getVideoData());
    setCurrentVideoThumbnails(getSrcById(player.getVideoData().video_id));
    setIsPlay(true);
    updateDuration();
    listenCurrentTime();
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
    }, 1000);
    setTimeoutId(id);
  };
  const getSrcById = (id: string): string => {
    return playlist.find((e) => e.videoId === id).thumbnails as string;
  };

  const setVolume = (value: number) => {
    player.setVolume(value);
  };

  const setTimeAt = (value: number) => {
    player.seekTo(value);
  };

  useEffect(() => {
    if (!player || !player.i) return;
    if (playlist.length < 1) {
      player.loadPlaylist('', 0);
      player.seekTo(0);
      player.stopVideo();
      setCurrentVideoData('');
    }
    try {
      player.cuePlaylist({
        playlist: playlist.map((e) => e.videoId),
      });
      player.pauseVideo();
    } catch (error) {
      console.log(error);
    }
  }, [playlist, player]);

  useEffect(() => {
    if (isRepeatOne && progress.max - progress.value <= 1) {
      setProgress(() => ({
        value: 0,
        max: player.getDuration(),
      }));
      player.seekTo(0, true);
      player.playVideo();
    }
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
            onClick={() => setShuffle(true)}
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
        ref={playerRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default MusicPlayer;
