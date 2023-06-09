import React from 'react'
import { Container, Title } from './styles'
import { RectButtonProps } from 'react-native-gesture-handler'


type Props = RectButtonProps & { title: string }

export function Button({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
