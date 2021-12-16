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
  category: Category;
  setCategory: (category: Category) => void;
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
          <Category
            onPress={() => setCategory(item)}
            isActive={item.key === category.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
        />
        <Footer>
          <Button 
          title="Selecionar"
          onPress={closeSelectCategory}
          
          />
        </Footer>
    </Container>
  )
}