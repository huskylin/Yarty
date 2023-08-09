import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;

export const StyledMediumText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledSmallText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.small};
`;