import styled from 'styled-components';
import { Table, Typography } from 'antd';
import Image from 'next/image';

const { Title, Text } = Typography;

const TitleContainer = styled.div`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 40px;
  }
`;

const StyledTitle = styled(Title) <TitleProps>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.lines ? props.lines : '2')};
  -webkit-box-orient: vertical; /* 配合 -webkit-line-clamp 使用垂直排列 */
`;

const StyledText = styled(Text) <TitleProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.lines ? props.lines : '2')};
  -webkit-box-orient: vertical; /* 配合 -webkit-line-clamp 使用垂直排列 */
`;

const StyledTable = styled(Table) <any>`
  tbody {
    tr {
      td {
        padding: 8px !important;
      }
    }
  }
`;

const StyledImage = styled(Image)`
  border-radius: '8px';
  object-fit: 'cover';
`

export { TitleContainer, StyledTitle, StyledText, StyledTable, StyledImage };