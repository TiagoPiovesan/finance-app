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
  LogoutButton,
  LoadContainer
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const theme = useTheme()

  async function loadTransactions(){
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions
      .map(
      (item: DataListProps) => {

        if (item.type === 'positive'){
          entriesTotal += Number(item.amount)
        }else{
          expensiveTotal += Number(item.amount)
        }

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
    )

    const total = entriesTotal - expensiveTotal

    setTransactions(transactionsFormated)
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      { isLoading ?
      <LoadContainer>
        <ActivityIndicator color={
          theme.colors.primary}
          size="large" />
      </LoadContainer> :
        <>
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
            <HighlightCard type='up' title='Entradas' amount={highlightData.entries.amount} lastTransaction='Última entrada em 02/04' />
            <HighlightCard type='down' title='Saídas' amount={highlightData.expensives.amount}  lastTransaction='Última entrada em 01/04' />
            <HighlightCard type='total' title='Total' amount={highlightData.total.amount} lastTransaction='02/02 até 02/04' />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionCard data={item} /> }
            >
            </TransactionList>
          </Transactions>
        </>
      }
    </Container>
  );
}
