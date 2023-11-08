import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { css } from "styled-components";

interface Props {
  active: boolean;
}

export const Container = styled(TextInput)<Props>`
  padding: 16px 18px;
  width: 100%;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};

  ${({ active, theme }) => active && css`
    border-width: 3px;
    border-color: ${theme.colors.attention}
  `}
`;
