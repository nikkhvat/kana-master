import React from "react";

import styled from "styled-components/native"

import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View<{paddingTop: number}>`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
`

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color4 };
`

const Settings: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top} >
      <Title>Profile</Title>
    </Container>
  );
};

export default Settings;
