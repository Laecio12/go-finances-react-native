import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import {
  Container, 
  Header, 
  Title, 
  Form, 
  Fields,
  TransactionTypes
} from './styles';
import { useAuth } from "../../hooks/auth";

interface FormData {
 
  name: string;
  amount: string;
}

type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = yup.object().shape({
  name: yup
  .string()
  .required('Nome obrigatório'),
  amount: yup
  .number()
  .required('Valor obrigatório')
  .positive('Valor deve ser positivo')
});


export function Register() {
  const [TransactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const navigation = useNavigation<NavigationProps>();

  async function handleRegister(form: FormData){
    if(!form.name || !form.amount) Alert.alert('Preencha todos os campos');

    if(!TransactionType) Alert.alert('Selecione uma categoria');

    if(category.key === 'category') Alert.alert('Selecione uma categoria');

    if(TransactionType === 'negative' && category.key === 'salary'){
     Alert.alert('Não é possível registrar uma despesa como salário');
     return;
    }
    if(TransactionType === 'positive' && category.key !== 'salary'){
     Alert.alert('Não é possível registrar uma despesa como Income, mude para OutCome');
     return;
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: TransactionType,
      date: new Date(),
    }
    try {
     const dataKey = `@gofinances:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [newTransaction, ...currentData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível cadastrar');
    }
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm( {
    resolver: yupResolver(schema),
  });
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>

            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error= {errors.name && errors.name.message}
            />
            <InputForm 
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error= {errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
              type="positive" 
              title="Income"
              onPress={() => setTransactionType('positive')}
              isActive={TransactionType === 'positive'}
              />
              <TransactionTypeButton 
              type="negative" 
              title="Outcome"
              onPress={() => setTransactionType('negative')}
              isActive={TransactionType === 'negative'}
              />
            </TransactionTypes>
            <CategorySelectButton 
            title={category.name} 
              onPress={() => setCategoryModalOpen(true)}
            />
            </Fields>
          <Button 
            onPress={handleSubmit(handleRegister)}
            title='Enviar'
          />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
          />
        </Modal>
    </Container>
  </TouchableWithoutFeedback>
  )
}