import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)<ButtonProps>`
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
