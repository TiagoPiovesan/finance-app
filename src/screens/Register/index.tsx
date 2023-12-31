import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import * as Yup from 'yup'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'
import { Button } from '../../components/Forms/Button'
import TrasnsactionTypeButton from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import InputForm from '../../components/Forms/InputForm'
import { useAuth } from '../../hook/auth'

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
  .required('Nome é obrigatório'),

  amount: Yup.number()
  .typeError("Informe um valor numérico")
  .positive("O valor não pode ser negativo")
  .required('Valor é obrigatório'),
})

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const { user } = useAuth();

  const natigation = useNavigation()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypesSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: FormData){
    if (!transactionType)
      return Alert.alert('Selecione o Tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`
      const storageData = await AsyncStorage.getItem(dataKey);
      const currentData = storageData ? JSON.parse(storageData) : []

      const dataFromatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFromatted));

      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      natigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>

            <InputForm
              placeholder='Nome'
              name="name"
              control={control}
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message.toString()}
            />
            <InputForm
              placeholder='Preço'
              name="amount"
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message.toString()}
            />

            <TransactionsTypes>
              <TrasnsactionTypeButton
                title="Entrada"
                type="up"
                onPress={() => handleTransactionsTypesSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TrasnsactionTypeButton
                title="Saída"
                type="down"
                onPress={() => handleTransactionsTypesSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} animationType="slide" presentationStyle="pageSheet">
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
