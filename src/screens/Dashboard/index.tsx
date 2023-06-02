import React from 'react';
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
  TransactionList
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';


export function Dashboard() {
  const data = [{
      title: 'desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dolar-sign'
      },
      date: "13/04/2023"
    },
    {
      title: 'desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dolar-sign'
      },
      date: "13/04/2023"
    },
    {
      title: 'desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dolar-sign'
      },
      date: "13/04/2023"
    }
  ];

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
          <Icon name="power" />
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
          renderItem={({item}) => <TransactionCard data={item} /> }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        >

        </TransactionList>
      </Transactions>


    </Container>
  );
}
