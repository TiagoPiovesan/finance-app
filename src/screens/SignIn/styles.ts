import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`

export const Header = styled(SafeAreaView)`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary };
  justify-content: flex-end;
  align-items: center;
`

export const TitleWrapper = styled.View`
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium };
  color: ${({ theme }) => theme.colors.shape };
  font-size: ${RFValue(28)}px;
  text-align: center;
  margin-top: 40px;
`

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular };
  color: ${({ theme }) => theme.colors.shape };
  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-top: 50px;
  margin-bottom:67px;
`

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary };
  width: 100%;
  height: 30%;
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`


