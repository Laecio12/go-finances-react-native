import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import {
  Container, 
  Header, 
  Title, 
  Form, 
  Fields,
  TransactionTypes
} from './styles';
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
  name: string;
  amount: string;
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

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleRegister(form: FormData){
    if(!form.name || !form.amount) Alert.alert('Preencha todos os campos');

    if(!TransactionType) Alert.alert('Selecione uma categoria');

    if(category.key === 'category') Alert.alert('Selecione uma categoria');
    
    const data = {
      name: form.name,
      amount: form.amount,
      category: category.key,
      TransactionType
    }

    console.log(data);
  }

  const {
    control,
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
              type="up" 
              title="Income"
              onPress={() => setTransactionType('up')}
              isActive={TransactionType === 'up'}
              />
              <TransactionTypeButton 
              type="down" 
              title="Outcome"
              onPress={() => setTransactionType('down')}
              isActive={TransactionType === 'down'}
              />
            </TransactionTypes>
            <CategorySelectButton 
            title={category.name} 
              onPress={() => setCategoryModalOpen(true)}
            />
            </Fields>
          <Button 
            onPress={handleSubmit(handleRegister)} 
            title='Enviar'/>
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