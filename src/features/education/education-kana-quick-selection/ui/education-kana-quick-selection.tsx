import React, { useEffect } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled, { useTheme } from "styled-components/native";


import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Colors } from "@/shared/constants/app";
import { Kana, KanaMode, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import { countAvailableWords, setKanaSelected } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

type ChooseAlphabetNavigationProp = StackNavigationProp<RootStackParamList, "ChooseAlphabet">;

interface EducationKanaQuickSelectionProps {
  screen: "Learning" | "Practice" | "WordBuilding";
  navigation: ChooseAlphabetNavigationProp
}

const EducationKanaQuickSelection: React.FC<EducationKanaQuickSelectionProps> = ({
  screen,
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const SHOW_ALLOWED_WORDS = screen === "WordBuilding";

  const hiraganaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.hiragana);
  const katakanaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.katakana);

  const selected = useAppSelector((state: RootState) => state.kana.selected);

  const selectedLettersHiragana = useAppSelector(
    (state: RootState) => state.kana.selectedLettersHiragana
  );
  const selectedLettersKatakana = useAppSelector(
    (state: RootState) => state.kana.selectedLettersKatakana
  );
  const selectedLetters = useAppSelector(
    (state: RootState) => state.kana.selectedLetters
  );

  useEffect(() => {
    if (SHOW_ALLOWED_WORDS) {
      dispatch(countAvailableWords());
    }
  }, [SHOW_ALLOWED_WORDS, dispatch, selected]);


  const IS_KANA_SELECTED =
    selected.base.katakana.length ===
    LETTERS_COUNT[KanaSection.BasicKatakana] &&
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana] &&
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana] &&
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const IS_HIRA_SELECTED =
    selected.base.hiragana.length ===
    LETTERS_COUNT[KanaSection.BasicHiragana] &&
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana] &&
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

  const IS_BASIC =
    selected.base.hiragana.length ===
    LETTERS_COUNT[KanaSection.BasicHiragana] &&
    selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];

  const IS_DAKUON =
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana] &&
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana];

  const IS_HANDAKUON =
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana];

  const IS_YOON =
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana] &&
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const IS_BASIC_HIRA =
    selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana];
  const IS_DAKUON_HIRA =
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana];
  const IS_HANDAKUON_HIRA =
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana];
  const IS_YOON_HIRA =
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

  const IS_BASIC_KATA =
    selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];
  const IS_DAKUON_KATA =
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana];
  const IS_HANDAKUON_KATA =
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana];
  const IS_YOON_KATA =
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const set = (
    value:
      | KanaSection.BasicHiragana
      | KanaSection.BasicKatakana
      | KanaSection.DakuonKatakana
      | KanaSection.DakuonHiragana
      | KanaSection.HandakuonKatakana
      | KanaSection.HandakuonHiragana
      | KanaSection.YoonKatakana
      | KanaSection.YoonHiragana
      | Kana.Hiragana
      | Kana.Katakana
      | KanaMode.Basic
      | KanaMode.Dakuon
      | KanaMode.Handakuon
      | KanaMode.Yoon
  ) => {
    dispatch(setKanaSelected(value));
  };

  const colors = useTheme().colors as Colors;

  return (
    <View>
      <InfoContainer>
        <InfoBlock>
          <InfoTitle>{selectedLetters}</InfoTitle>
          <InfoSubTitle>Entries in scope</InfoSubTitle>
        </InfoBlock>
        {SHOW_ALLOWED_WORDS && <VerticalBorder />}
        {SHOW_ALLOWED_WORDS && (
          <InfoBlock>
            <InfoTitle>
              {hiraganaSelectedWords.length + katakanaSelectedWords.length}
            </InfoTitle>
            <InfoSubTitle>Available words</InfoSubTitle>
          </InfoBlock>
        )}
      </InfoContainer>

      <Scroll>
        <KanaStatContainer>
          <KanaCard>
            <KanaCardTitle>Hiragana</KanaCardTitle>
            <KanaCardSubTitle>{selectedLettersHiragana}</KanaCardSubTitle>
          </KanaCard>
          <KanaCard>
            <KanaCardTitle>Katakana</KanaCardTitle>
            <KanaCardSubTitle>{selectedLettersKatakana}</KanaCardSubTitle>
          </KanaCard>
        </KanaStatContainer>

        <SelectionTitle>Kana quick selection</SelectionTitle>

        <SelectionContainer>
          <SelectionRow>
            <SelectionButton empty></SelectionButton>
            <SelectionButton
              onPress={() => set(Kana.Hiragana)}
              selected={IS_HIRA_SELECTED}
              type="text"
            >
              <SelectionText active={IS_HIRA_SELECTED}>Hiragana</SelectionText>
            </SelectionButton>
            <SelectionButton
              onPress={() => set(Kana.Katakana)}
              selected={IS_KANA_SELECTED}
              type="text"
            >
              <SelectionText active={IS_KANA_SELECTED}>Katakana</SelectionText>
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton
              onPress={() => set(KanaMode.Basic)}
              selected={IS_BASIC}
              type="text"
            >
              <SelectionText active={IS_BASIC}>Basic</SelectionText>
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.BasicHiragana)}
              selected={IS_BASIC_HIRA}
            >
              <Icon
                name={IS_BASIC_HIRA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.BasicKatakana)}
              selected={IS_BASIC_KATA}
            >
              <Icon
                name={IS_BASIC_KATA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton
              onPress={() => set(KanaMode.Dakuon)}
              selected={IS_DAKUON}
              type="text"
            >
              <SelectionText active={IS_DAKUON}>Dakuon</SelectionText>
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.DakuonHiragana)}
              selected={IS_DAKUON_HIRA}
            >
              <Icon
                name={IS_DAKUON_HIRA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.DakuonKatakana)}
              selected={IS_DAKUON_KATA}
            >
              <Icon
                name={IS_DAKUON_KATA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton
              onPress={() => set(KanaMode.Handakuon)}
              selected={IS_HANDAKUON}
              type="text"
            >
              <SelectionText active={IS_HANDAKUON}>Handakuon</SelectionText>
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.HandakuonHiragana)}
              selected={IS_HANDAKUON_HIRA}
            >
              <Icon
                name={IS_HANDAKUON_HIRA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.HandakuonKatakana)}
              selected={IS_HANDAKUON_KATA}
            >
              <Icon
                name={IS_HANDAKUON_KATA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton
              onPress={() => set(KanaMode.Yoon)}
              selected={IS_YOON}
              type="text"
            >
              <SelectionText active={IS_YOON}>Yoon</SelectionText>
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.YoonHiragana)}
              selected={IS_YOON_HIRA}
            >
              <Icon
                name={IS_YOON_HIRA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
            <SelectionButton
              onPress={() => set(KanaSection.YoonKatakana)}
              selected={IS_YOON_KATA}
            >
              <Icon
                name={IS_YOON_KATA ? "check" : "close"}
                size={24}
                color={colors.color4}
              />
            </SelectionButton>
          </SelectionRow>
        </SelectionContainer>
        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={"Confirm"}
          type={"general"}
          fontSize={17}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </Scroll>
    </View>
  );
};

export default EducationKanaQuickSelection;

const InfoContainer = styled.View`
  height: 120px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-bottom-width: 1px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const InfoBlock = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
`;

const InfoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 34px;
  font-weight: 700;
`;

const InfoSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 15px;
  font-weight: 400;
  margin-top: 10px;
`;

const VerticalBorder = styled.View`
  width: 1px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.color2};
`;

const Scroll = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

const KanaStatContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 30px;
`;

const KanaCard = styled.View`
  width: 108px;
  height: 85px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-width: 1px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const KanaCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 13px;
  font-weight: 700;
`;

const KanaCardSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.second_color3};
  font-size: 22px;
  font-weight: 700;
`;

const SelectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const SelectionContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const SelectionRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

type SelectionButtonProp = {
  empty?: boolean;
  selected?: boolean;
  type?: "text" | "container";
};

const SelectionButton = styled.Pressable<SelectionButtonProp>`
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border-width: ${({ empty }) => (empty ? "0px" : "1px")};
  border-color: ${({ theme }) => theme.colors.color2};
  background-color: ${({ theme, selected, type }) =>
    selected
      ? type == "text"
        ? theme.colors.second_color3
        : theme.colors.second_color4
      : "transparent"};
  flex: 1;
`;

const SelectionText = styled.Text<{ active?: boolean }>`
  color: ${({ theme, active }) => active ? theme.colors.color5 : theme.colors.color4};
  font-size: 13px;
  font-weight: 700;
`;

