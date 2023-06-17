import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import { addMonths, subMonths, format } from "date-fns"
import { ptBR } from "date-fns/locale";

import HistoryCard from "../../components/HistoryCard";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month
} from "./styles";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { LoadContainer } from "../Dashboard/styles";
import { ActivityIndicator } from "react-native";


interface TransactionData {
  id: string;
  type: 'positive' | 'negative',
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  id: string;
  percentFormatted: string;
  percent: number;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme()

  function handleDateChange(action: 'next' | 'prev'){
    if (action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    }else{
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = '@gofinance:transactions'
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
      return accumulator +  Number(expensive.amount)
    }, 0)

    const totalByCategory : CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      })

      if (categorySum > 0){
        const total = categorySum.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        const percent = (categorySum / expensivesTotal * 100)
        const percentFormatted = `${percent.toFixed(0)}%`

        totalByCategory.push({
          id: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent,
          percentFormatted,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  // function from navigation, its like useEffect, but it works also in change screens
  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      { isLoading ?
        <LoadContainer>
          <ActivityIndicator color={
            theme.colors.primary}
            size="large" />
        </LoadContainer>
      :
        <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 24,
              paddingBottom: useBottomTabBarHeight()
            }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {
                format(selectedDate, 'MMMM, yyyy', { locale: ptBR })
              }
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x={"percentFormatted"}
              y={"total"}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
            />
          </ChartContainer>

          {
            totalByCategories.map(item => (
              <HistoryCard
                key={item.id}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))
          }

        </Content>
      }
    </Container>
  );
}

