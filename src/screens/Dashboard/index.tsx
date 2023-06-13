import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions(){
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : []

    const transactionsFormated: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type ,
          category: item.category,
          date
        }
      }
    );

    setData(transactionsFormated)
    console.log(transactionsFormated)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://avatars.githubusercontent.com/u/20112017" }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Tiago</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>

        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard type='up' title='Entradas' amount='R$ 17.400,00' lastTransaction='Última entrada em 02/04' />
        <HighlightCard type='down' title='Saídas' amount='R$ 5.100,00' lastTransaction='Última entrada em 01/04' />
        <HighlightCard type='total' title='Total' amount='R$ 21.990,00' lastTransaction='02/02 até 02/04' />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} /> }
        >
        </TransactionList>
      </Transactions>
    </Container>
  );
}
