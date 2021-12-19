import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionCardProps} from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { 
  HighlightCards,
  Container, 
  Header, 
  UserWrapper,
  UserInfo, 
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadingContainer
} from './styles';

interface Category {
  name: string;
  icon: string;
}
export interface IDataListProps extends ITransactionCardProps {
  id: string;
}
interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightDataProps {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState<IDataListProps[]>([]);
 const [highlightData, setHighlightData] = useState<HighlightDataProps>({} as HighlightDataProps);

 const theme = useTheme();
 const {signOut, user} = useAuth();

 function handleSignOut() {
  Alert.alert("Sair do app", "Deseja sair?", [
    {text: "Não"},
    {text: "Sim", onPress: () => signOut()},
  ]);
  
 }
 function getLastTransactionDate(
   collection: IDataListProps[],
    type: 'positive' | 'negative'
  ){
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter(transaction => transaction.type === type)
    .map(transaction => new Date(transaction.date).getTime())))
    
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
      
    
  }
    

 async function loadTransactions() {
  const dataKey = `@gofinances:transactions_user:${user.id}`;

  const data = await AsyncStorage.getItem(dataKey);
  const transactions = data ? JSON.parse(data) : [];

  let incomesTotal = 0;
  let expensesTotal = 0;

  const transactionsFormatted: IDataListProps[] = transactions
  .map((item: IDataListProps) => {
    if(item.type === 'positive'){
      incomesTotal += Number(item.amount);
    } else {
      expensesTotal += Number(item.amount);
    }
    const amount = Number(item.amount)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

   
    const date = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(new Date(item.date));

    return {
      id: item.id,
      name: item.name,
      amount,
      type: item.type,
      category: item.category,
      date,
    }

  });
  const total = incomesTotal - expensesTotal;
  setData(transactionsFormatted);

  const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
  const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');
  const totalInterval = `01 a ${lastTransactionExpenses}`;
  
 
  setHighlightData({
    entries: {
      amount: incomesTotal
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: 
       lastTransactionEntries !== 'NaN de Invalid Date' ? 
       `Última entrada dia ${lastTransactionEntries}` : 'Não há transações',
    },
    expenses: {
      amount: expensesTotal
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: 
       lastTransactionExpenses !== 'NaN de Invalid Date'? 
       `Última saída dia ${lastTransactionExpenses}` : 'Não há transações',	
    },
    total: {
      amount: total
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      lastTransaction: totalInterval,
    },
  });
 
  setIsLoading(false);
 }

 useEffect(() => {
  loadTransactions();

 }, []);

 useFocusEffect(useCallback(() => {
  loadTransactions();
 }, []));

  return (
    <Container>
      
      {
        isLoading ? 
        <LoadingContainer >
          <ActivityIndicator 
          color={theme.colors.primary}
          size="large"
         />
        </LoadingContainer>   :
        <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo source={{uri: user.avatar_url}}/>
              <User>
                <UserGreetings>Olá,</UserGreetings>
                <UserName>{user.name}</UserName>
              </User>
            </UserInfo>
            <LogoutButton onPress={handleSignOut}>
                <Icon name="power"/>
            </LogoutButton>
          
          </UserWrapper>
        </Header>
        <HighlightCards >
          <HighlightCard
            type="up"
            title="Entradas"
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          /> 
          <HighlightCard
            type="down"
            title="Saídas"
            amount={highlightData.expenses.amount}
            lastTransaction={highlightData.expenses.lastTransaction}
          /> 
          <HighlightCard
            type="total"
            title="Total"
            amount={String(highlightData.total.amount)}
            lastTransaction={highlightData.total.lastTransaction}
          /> 
        </HighlightCards>
        <Transactions>
          <Title>Transações</Title>
          <TransactionList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <TransactionCard data={item}/>}
            
          />
          </Transactions>
        </>
      }
        
    </Container>
  );
}