import React from "react";

import { Container, Amount, Title } from "./styles";

interface IProps {
  amount: string;
  title: string;
  color: string;
}

export function HistoryCard({ amount, title, color }: IProps) {
  return (
    <Container color={color}>
       <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}