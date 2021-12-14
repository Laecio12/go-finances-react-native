import React, { useState } from "react";
import { Input } from "../../components/Form/Input";
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

export function Register() {
  const [TransactionType, setTransactionType] = useState('');
  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>

          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Preço"
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
          </Fields>
        <Button title='Enviar'/>
      </Form>
    </Container>
  )
}