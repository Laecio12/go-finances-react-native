import styled, {css} from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";
interface ICardPros  {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<ICardPros>`
  background-color: ${({ theme, type }) =>
  type === 'total' ? theme.colors.secondary : theme.colors.shape};

  width: ${RFValue(300)}px;
  margin-right: ${RFValue(16)}px; 
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

`;


export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;


export const Title = styled.Text<ICardPros>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  
  color: ${({ theme, type }) =>
  type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;


export const Icon = styled(Feather)<ICardPros>`
  font-size: ${RFValue(40)}px;
  color: ${({ theme, type }) => 
    type === 'up' ? theme.colors.success 
    : 
    type === 'down' ? theme.colors.attention 
    : 
    theme.colors.shape};
  
`;


export const Footer = styled.View`

`;


export const Amount = styled.Text<ICardPros>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;

  color: ${({ theme, type }) =>
  type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;


export const LastTransaction = styled.Text<ICardPros>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
 
  color: ${({ theme, type }) =>
  type === 'total' ? theme.colors.shape : theme.colors.text};
`;


