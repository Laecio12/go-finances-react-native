import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';



interface ICategoryData {
  id: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Container = styled.View`
flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.View``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  
`;

export const ListCategories = styled(
  FlatList as new (props: FlatListProps<ICategoryData>) => FlatList<ICategoryData>).attrs(
    {
      showsVerticalScrollIndicator: false,
      contentContainerStyle: { padding: 24 },
    }
  )`
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 24px;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MothSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;
export const MessageContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 24px;
  border-radius: 5px;
  margin: 100px 24px 0 24px;
 

`;
export const Message =  styled.Text`
   font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;