import React, { useCallback, useEffect, useState } from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie} from 'victory-native';
import { categories } from "../../utils/categories";
import { useTheme } from "styled-components";
import {
  Container,
  Header, 
  Title,
  Content,
  ChartContainer,
  ListCategories
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";

interface ITransactionDataProps  {
  type: 'positive' | 'negative';
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  
}

interface ICategoryData {
  id: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {

  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  const theme = useTheme();
  async function loadData() {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];

    const expenses = transactions
    .filter((transaction: ITransactionDataProps) => transaction.type === 'negative');

    const expensiveTotal = expenses.reduce((accumulator: number, transaction: ITransactionDataProps) => {
      return accumulator + Number(transaction.amount);
    }, 0);
    
    const totalByCategory: ICategoryData[]  = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expenses: ITransactionDataProps) => {
        if(expenses.category === category.key) {
          categorySum += Number(expenses.amount);
        }
      });
      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
        const percent = `${((categorySum / expensiveTotal) * 100).toFixed(0)}%`;
        totalByCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        })
      }
    })
    
    setTotalByCategories(totalByCategory);
  }
  useEffect(() => {
    loadData(); 
  }, []);

  useFocusEffect(useCallback(() => {
    loadData();
   }, []));

  return (   
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>
      </Content>
        <ListCategories
          data={totalByCategories}
          keyExtractor={ item => item.id}
          renderItem={({item}) => (
            <HistoryCard 
              key={item.id}
              amount={item.totalFormatted}
              title={item.name}
              color={item.color}
            />
          )}
        />
    </Container>
  );
}