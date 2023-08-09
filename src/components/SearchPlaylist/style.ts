import styled from 'styled-components';
import { Card, InputNumber, Button } from 'antd';

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