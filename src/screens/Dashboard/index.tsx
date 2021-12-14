import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionCardProps} from '../../components/TransactionCard';
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
} from './styles';

interface Category {
  name: string;
  icon: string;
}
export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: IDataListProps[] = [
    {
    id: '1',
    type: 'positive',
    title: "Desenvolvimento de aplicações para web",
    amount:"R$ 12.000,00",
    category:{ 
    name: 'Vendas',
    icon: 'dollar-sign',
    },
    date: "10/12/2021",
  },
  {
    id: '2',
    type: 'negative',
    title: "pizza",
    amount:"R$ 49,90",
    category:{ 
    name: 'Alimentação',
    icon: 'dollar-sign',
    },
    date: "10/12/2021",
  },
  {
    id:'3',
    type: 'negative',
    title: "Aluguel da casa",
    amount:"R$ 1.500,00",
    category:{ 
    name: 'Casa',
    icon: 'home',
    },
    date: "10/12/2021",
  },
];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/38004456?v=4'}}/>
            <User>
              <UserGreetings>Olá,</UserGreetings>
              <UserName>Laecio</UserName>
            </User>
          </UserInfo>
          <Icon name="power"/>
        </UserWrapper>
      </Header>
      <HighlightCards >
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 15.400,00"
          lastTransaction="Última entrada dia 10/12/2021"
        /> 
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 2.500,00"
          lastTransaction="Última saída dia 10/12/2021"
        /> 
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 12.900,00"
          lastTransaction="Hoje"
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
    </Container>
  );
}