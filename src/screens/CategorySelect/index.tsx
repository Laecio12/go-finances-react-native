import React from 'react';
import { categories } from '../../utils/categories';
import { FlatList } from 'react-native';
import { 
  Container,
  Title,
  Header,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

import { Button } from '../../components/Form/Button';

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: string;
  setCategory: (category: string) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props){ 
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList 
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
        />
        <Footer>
          <Button title="Selecionar" />
        </Footer>
    </Container>
  )
}