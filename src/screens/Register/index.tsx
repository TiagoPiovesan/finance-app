import React, { useState } from 'react'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'
import { Input } from '../../components/Forms/Input'
import { Button } from '../../components/Forms/Button'
import TrasnsactionTypeButton from '../../components/Forms/TransactionTypeButton'

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypesSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome'/>
          <Input placeholder='Preço'/>
          <TransactionsTypes>
            <TrasnsactionTypeButton
              title="Entrada"
              type="up"
              onPress={() => handleTransactionsTypesSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TrasnsactionTypeButton
              title="Saída"
              type="down"
              onPress={() => handleTransactionsTypesSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
        </Fields>
        <Button title='Enviar' />
      </Form>

    </Container>
  )
}
