import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton,  GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};

`;

interface IProps {
  isActive: boolean;
}
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${RFValue(19)}px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;

`;

export const Category = styled(RectButton).attrs({ 
  activeOpacity: 0.7,
})<IProps>`
  width: 100%;
  flex-direction: row;
  padding: ${RFValue(15)}px;
  align-items: center;

  background-color: ${({isActive, theme }) => 
    isActive ? theme.colors.secondary_light : theme.colors.background
  };

`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;
export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
