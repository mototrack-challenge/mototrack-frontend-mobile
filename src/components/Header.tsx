import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const HeaderContainer = styled.View`
  background-color:rgb(68, 68, 68);
  padding-top: ${StatusBar.currentHeight}px;
  padding: 20px;
`;

export const HeaderTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
