import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataListProps } from '.';
import { FlatList } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;


export const Header = styled.SafeAreaView.attrs({
  edges: ['top'],
  backgroundColor: ({theme}) => theme.colors.primary
})`
  width: 100%;
  height: ${RFPercentage(42)}px;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.primary};
  align-items: flex-start;
  flex-direction: row;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(18)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(18)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

// Custom a third part component, in this case, a Feather
export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {paddingHorizontal: 24}
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin-bottom: 16px;
`;

export const TransactionList: DataListProps = styled(
    FlatList as new () => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator:false,
  contentContainerStyle: {
    paddingBottom: 30,
  }
})`
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
