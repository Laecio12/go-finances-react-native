import { RectButton } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const Container = styled(RectButton)`
  flex-direction: row;
  margin-top: ${RFPercentage(-4)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  border-radius: 5px;
`;
export const Title = styled.Text`
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  padding: ${RFValue(14)}px;
`;
export const ImageContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${RFValue(16)}px;
  justify-content: center;
  align-items: center;
  border-left-width: 1px;
`;
