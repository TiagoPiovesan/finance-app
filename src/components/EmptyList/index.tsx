import React from 'react'
import { Container, Title } from './styles'

interface Props{
  title: string;
}

export function EmptyList({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
