import styled from 'styled-components';
import { Card, InputNumber, Button, Typography } from 'antd';

const { Text } = Typography;

export const StyledCardTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 64px;
`;

export const StyledButton = styled(Button)`
  margin-left: 8px;
`;

export const Container = styled.div`
  display: flex;
`;

export const StyledCard = styled(Card)`
  height: 100%
`;


export const StyledMediumText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledSmallText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.small};
`;