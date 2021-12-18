import React, { useCallback, useEffect, useState } from "react";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie} from 'victory-native';
import { categories } from "../../utils/categories";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Container,
  Header, 
  Title,
  Content,
  ChartContainer,
  ListCategories,
  MonthSelect,
  MonthSelectButton,
  MothSelectIcon,
  Month,
  MessageContainer,
  Message
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { BorderlessButtonProps } from "react-native-gesture-handler";

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

interface ISelectButton  extends BorderlessButtonProps{
  onPress: () => void;
}

export function Resume({onPress, ...rest}: ISelectButton) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);

  const theme = useTheme();

  function handleMonthChange(action: 'prev' | 'next') {
   if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];

    const expenses = transactions
    .filter((transaction: ITransactionDataProps) => transaction.type === 'negative' &&
      new Date(transaction.date).getMonth() === new Date(selectedDate).getMonth() &&
      new Date(transaction.date).getFullYear() === new Date(selectedDate).getFullYear()
    );

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

  useFocusEffect(useCallback(() => {
    loadData();
   }, [selectedDate]));

  return (   
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        <MonthSelect>

          <MonthSelectButton {...rest} onPress={() => handleMonthChange('prev')}>
            <MothSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>
            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
          </Month>

         
          <MonthSelectButton {...rest} onPress={() => handleMonthChange('next')}>
            <MothSelectIcon name="chevron-right" />
          </MonthSelectButton>

        </MonthSelect>
        
        <ChartContainer>
        {totalByCategories.length > 0 ?  (
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
           labelRadius={90}
           x="percent" 
           y="total"
         />
       
          ) : (
            <MessageContainer>
              <Message>Nenhuma transação cadastrada para este mês!</Message>
            </MessageContainer>
          
          )}
         
         
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