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
import { EmptyList } from '../../components/EmptyList';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps
  total: HighlightProps
}

function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){
      // Get by max timestemp
      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())
        )
      )

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {month: 'long'})}`
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

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionExpensives}`

    console.log(lastTransactionEntries)
    setTransactions(transactionsFormated)
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries.includes('Nan') ? `Última entrada dia ${lastTransactionEntries}` : 'Sem registros'
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives.includes('Nan') ? `Última saída dia ${lastTransactionExpensives}` : 'Sem registros'
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval.includes('Nan') ? totalInterval : 'Sem registros'
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
            <HighlightCard type='up' title='Entradas' amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} />
            <HighlightCard type='down' title='Saídas' amount={highlightData.expensives.amount}  lastTransaction={highlightData.expensives.lastTransaction} />
            <HighlightCard type='total' title='Total' amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({item}) => <TransactionCard data={item} /> }

              ListHeaderComponent={() => (!transactions.length ?
                <EmptyList title="Sem registros" />
                : null)}
            />
          </Transactions>
        </>
      }
    </Container>
  );
}
