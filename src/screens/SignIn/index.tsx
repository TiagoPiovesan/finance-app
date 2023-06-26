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


export default function SignIn() {
  const { user } = useAuth()
  console.log(user)

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
          />

          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppeSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
