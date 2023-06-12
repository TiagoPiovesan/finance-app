import React from 'react'
import {
  Container,
  Icon,
  Title,
  Button
} from './styles'
import { TouchableOpacityProps } from 'react-native/types';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

type Props = TouchableOpacityProps & {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export default function TrasnsactionTypeButton({title, type, isActive, ...rest}: Props) {
  return (
    <Container
      isActive={isActive}
      type={type}
      {...rest}
    >
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  )
}
