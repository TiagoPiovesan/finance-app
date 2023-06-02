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
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard/index';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [{
      id: '1',
      type: 'positive',
      title: 'desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2023"
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburger pra galera',
      amount: 'R$ 1.500,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "04/01/2023"
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 2.320,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: "01/01/2023"
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
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item} /> }
        >
        </TransactionList>
      </Transactions>
    </Container>
  );
}
