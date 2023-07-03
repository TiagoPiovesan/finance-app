import React, { useContext, useState } from 'react'
import AppeSvg from '../../assets/apple.svg'
import LogoSvg from '../../assets/logo-full.svg'
import GoogleSvg from '../../assets/google.svg'
import { RFValue } from 'react-native-responsive-fontsize'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import { useAuth } from '../../hook/auth'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { useTheme } from 'styled-components'


export default function SignIn() {
  const [isLoadding, setIsLoadding] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignInButton(){
    try {
      setIsLoadding(true)
      return await signInWithGoogle();
    }catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
      setIsLoadding(false)
    }
    try {
      setIsLoadding(true)
      return await signInWithApple();
    }catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
      setIsLoadding(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(200)}
            height={RFValue(120)}
          />

        <Title>
          Controle suas {'\n'}
          finanças de forma {'\n'}
          muito simples
        </Title>

        </TitleWrapper>

        <SignIndfdddTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignIndfdddTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButtonas
            title="Entrarrrrrasda com Google"
            svg={GoogleSvg}
            onPress={handleSignInButton}
          />

        { Platform.OS === 'ios' &&
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppeSvg}
            onPress={signInWithApple}
          />
        }
        </FooterWrapper>

        { isLoadding && <ActivityIndicator
          color={ theme.colors.shape }
          style={{ marginTop: 18 }}
        /> }

      </Footer>
    </Container>
  )
}
