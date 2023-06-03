import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput).attrs({
  placeholderTextColor: "#ccc"
})`
  padding: 16px 18px;
  width: 100%;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;
