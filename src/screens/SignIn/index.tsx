import React, { useContext } from 'react'
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
import { Alert } from 'react-native'


export default function SignIn() {
  const { user, signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInButton(){
    try {
      await signInWithGoogle();
    }catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    }

    try {
      await signInWithApple();
    }catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Apple')
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

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInButton}
          />

          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppeSvg}
            onPress={signInWithApple}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
