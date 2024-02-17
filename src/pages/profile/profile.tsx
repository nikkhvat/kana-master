import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Theme } from "@/shared/constants/profile";
import Button from "@/shared/ui/button/button";
import { setLang, setTheme } from "@/store/features/profile/slice";
import { RootState } from "@/store/store";

const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state: RootState) => state.profile.theme);

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  const { t, i18n } = useTranslation();

  const setLanguage = (lang: string) => {
    dispatch(setLang(lang));
  };

  return (
    <Container paddingTop={insets.top}>
      <Title>{t("tabs.profile")}</Title>

      <SectionTitle>{t("profile.statistics")}</SectionTitle>

      <Button
        customStyles={{ marginTop: 0 }}
        title={t("profile.viewStatistics")}
        onClick={() => { }}
        type={"inactive"}
      />

      <SectionTitle>{t("profile.theme")}</SectionTitle>

      <SectionButtons>
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          title={t("profile.light")}
          onClick={() => changeTheme(Theme.Light)}
          type={theme === Theme.Light ? "general" : "inactive"}
        />
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          title={t("profile.dark")}
          onClick={() => changeTheme(Theme.Dark)}
          type={theme === Theme.Dark ? "general" : "inactive"}
        />
      </SectionButtons>
      <SectionButtons>
        <Button
          customStyles={{ flex: 1 }}
          title={t("profile.auto")}
          onClick={() => changeTheme(Theme.Auto)}
          type={theme === Theme.Auto ? "general" : "inactive"}
        />
        <View style={{ flex: 1 }}></View>
      </SectionButtons>

      <SectionTitle>{t("profile.language")}</SectionTitle>

      <SectionButtons>
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          title={"Русский"}
          onClick={() => setLanguage("ru")}
          type={i18n.language === "ru" ? "general" : "inactive"}
        />
        <Button
          customStyles={{ marginTop: 15, flex: 1 }}
          title={"English"}
          onClick={() => setLanguage("en")}
          type={i18n.language === "en" ? "general" : "inactive"}
        />
      </SectionButtons>
    </Container>
  );
};

export default ProfilePage;


const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color4};
`;

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
`;
