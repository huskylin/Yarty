import styled from 'styled-components';
import List from '@/components/common/List';
import { Button, Card, Typography } from 'antd';

const { Text } = Typography;

export const CardTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledCard = styled(Card)`
  height: 100%;
`;

export const ClearButton = styled(Button)`
  margin-left: 10px;
`;

export const StyledList = styled(List)`
  height: 100%;
`;