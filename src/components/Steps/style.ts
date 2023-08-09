import styled from 'styled-components';
import { Button, Card } from 'antd';
import { StyledButton as Btn } from '@/styles/global';

export const Content = styled.div`
    text-align: center;
    margin-top: 16px;
    height: calc(100% - 80px);
    display: flex;
`;

export const StyledButton = Btn;

export const FlexContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

export const Option = styled.div`
    display: flex;
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 15px;
    background: gray;
    border-radius: 15px;
`

export const OptionText = styled.span`
    margin: auto;
    font-size: ${(props) => props.theme.fontSizes.extraLarge};
`

export const StyledCardTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export const StyledCard = styled(Card)`
  height: 100%
`;