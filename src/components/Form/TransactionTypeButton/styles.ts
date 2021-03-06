import styled, {css} from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton} from 'react-native-gesture-handler';
interface IProps {
  type: 'positive' | 'negative';
  isActive: boolean;
}
export const Container = styled(RectButton)<IProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  padding: 16px;
  justify-content: center;
  ${({isActive, type}) => isActive && type ===  'positive' ? css`
    background-color: ${({ theme }) => theme.colors.success_light};
    border: none;
    `: isActive && type ===  'negative' ? css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    border: none;
  
  `: css`
    border: 1px solid ${({ theme}) =>  theme.colors.text};
  `}

`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  margin-left: 12px;
  `;
export const Icon = styled(Feather)<IProps>`
  font-size: ${RFValue(24)}px;
  color: ${
    ({ theme, type}) =>
    type === 'positive' ? 
    theme.colors.success 
    : 
    theme.colors.attention};
`;
