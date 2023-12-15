import React from "react";

import styled from "styled-components/native"

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../shared/store/hooks";
import { RootState } from "../../shared/store/store";
import { Theme } from "../../shared/constants/profile";
import { setTheme } from "../../shared/store/features/profile/slice";

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

const SectionTitle = styled.Text`
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 15px;
`; 

const SectionButtons = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
`

const Settings: React.FC = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch()

  const theme = useAppSelector((state: RootState) => state.profile.theme)

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme));
  }

  return (
    <Container paddingTop={insets.top}>
      <Title>Profile</Title>

      <SectionTitle>Statistics</SectionTitle>

      <Button
        customStyles={{ marginTop: 0 }}
        title={`View statistics →`}
        onClick={() => {console.log("to stats");}}
        type={"inactive"}
      />

      <SectionTitle>Theme</SectionTitle>

      <SectionButtons>
        <Button
          customStyles={{ marginTop: 15, flex: 1}}
          title={`Light`}
          onClick={() => changeTheme(Theme.Light)}
          type={theme === Theme.Light ? "general" : "inactive"}
        />
        <Button
          customStyles={{ marginTop: 15, flex: 1}}
          title={`Dark`}
          onClick={() => changeTheme(Theme.Dark)}
          type={theme === Theme.Dark ? "general" : "inactive"}
        />
      </SectionButtons>
      <SectionButtons>
        <Button
          customStyles={{ flex: 1 }}
          title={`Auto`}
          onClick={() => changeTheme(Theme.Auto)}
          type={theme === Theme.Auto ? "general" : "inactive"}
        />
        <View style={{flex: 1}} ></View>
      </SectionButtons>

      <SectionTitle>Language</SectionTitle>

      <SectionButtons>
        <Button
          customStyles={{ marginTop: 15, flex: 1}}
          title={`Русский`}
          onClick={() => {console.log("to stats");}}
          type={"general"}
        />
        <Button
          customStyles={{ marginTop: 15, flex: 1}}
          title={`English`}
          onClick={() => {console.log("to stats");}}
          type={"inactive"}
        />
      </SectionButtons>
      <SectionButtons>
        <Button
          customStyles={{ flex: 1 }}
          title={`Español`}
          onClick={() => {console.log("to stats");}}
          type={"inactive"}
        />
        <View style={{flex: 1}} ></View>
      </SectionButtons>
    </Container>
  );
};

export default Settings;
