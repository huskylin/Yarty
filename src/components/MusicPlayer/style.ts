import styled from 'styled-components';
import { Button, Slider, Typography } from 'antd';
import Image from 'next/image';
import devices from '@/utils/devices';

const { Text } = Typography;

export const StyledButton = styled(Button) <ButtonProps>`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) =>
        String(props.isactive).toLowerCase() === 'true'
            ? props.theme.antd.colorPrimary
            : 'inherit'};
`;

export const StyledBigButton = styled(Button)`
  display: flex;
  align-content: center;
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
  height: auto;
`;

export const StyledSlider = styled(Slider)`
  width: 100vw;
  position: absolute;
  padding-top: 0px;
  margin: 0;
`;

export const StyledDuration = styled.div`
  display: none;
  @media ${devices.laptop} {
    display: initial;
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ControlsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1 0;
`;

export const VideoInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 3 3 200px;
  overflow: hidden;
`;

export const ThumbnailsImage = styled(Image)`
   margin: 0 10px;
`;

export const VideoInfoTextContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export const VideoTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.small};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ControlButtonsContainer = styled.div`
  display: flex;
  flex: 0 1 10px;
  justify-content: center;
`;

export const StyledVolumeSlider = styled(Slider)`
  width: 100px;
  margin-right: 25px;
`;