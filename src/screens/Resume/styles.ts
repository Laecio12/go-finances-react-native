import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';

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

export const Content = styled.View`

`;

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