/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';

import Button from '@/components/Button';
import CardModeView, { CardModeViewProp } from '@/components/CardModeView';
import PreviewCard from '@/components/PreviewCard';
import { CardMode, PracticeScreenMode, TestMode } from '@/constants/kana';
import { RootStackParamList } from '@/types/navigationTypes';

type WordBuildingNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface WordBuildingProps {
  navigation: WordBuildingNavigationProp;
}

const WordBuilding: React.FC<WordBuildingProps> = ({ navigation }) => {
  const cardMode: CardModeViewProp['buttons'] = [
    [
      { title: 'Hira → Kata', key: CardMode.hiraganaToKatakana, type: 'active' },
      { title: 'Hira → Romaji', key: CardMode.hiraganaToRomaji, type: 'inactive' },
      { title: 'Romaji → Hira', key: CardMode.romajiToHiragana, type: 'inactive' },
    ],
    [
      { title: 'Kata → Hira', key: CardMode.katakanaToHiragana, type: 'inactive' },
      { title: 'Kata → Romaji', key: CardMode.katakanaToRomaji, type: 'inactive' },
      { title: 'Romaji → Kata', key: CardMode.romajiToKatakana, type: 'inactive' },
    ],
  ];

  const Mode: CardModeViewProp['buttons'] = [
    [
      { title: 'Choice', key: TestMode.Choice, type: 'active' },
      { title: 'Word building', key: TestMode.WordBuilding, type: 'inactive' },
    ],
    [
      { title: 'Write', key: TestMode.Write, type: 'inactive' },
      { title: 'Find the pair', key: TestMode.FindPair, type: 'inactive' },
    ],
  ];

  const [cardModeState, setCardModeState] = useState(cardMode);
  const [modeState, setModeState] = useState(Mode);

  const toggleButtonState = (
    btnArray: typeof cardMode,
    setBtnArray: (data: {
      title: string;
      type: 'active' | 'inactive' | 'weak' | 'general';
      key: string;
    }[][]) => void,
    indexGroup: number,
    indexButton: number,
    active: 'active' | 'inactive' | 'weak' | 'general',
    mode: 'has_one' | 'no_one'
  ) => {
    const newBtnArray = [...btnArray];
    const currentType = newBtnArray[indexGroup][indexButton].type;

    const isActivePresentInOthers = newBtnArray.some((group, gIndex) =>
      group.some(
        (btn, bIndex) =>
          btn.type === active && (gIndex !== indexGroup || bIndex !== indexButton)
      )
    );

    if (
      mode === 'has_one' &&
      currentType === active &&
      !isActivePresentInOthers
    ) {
      return;
    }

    newBtnArray[indexGroup][indexButton].type =
      currentType === active ? 'inactive' : active;

    setBtnArray(newBtnArray);
  };

  
  const getActiveFromArray = (
    objects: any,
    active: string
  ) => {
    const array = [];

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];

      for (let j = 0; j < object.length; j++) {
        const element = object[j];

        if (element.type === active) {
          array.push(element.key);
        }
      }
    }

    return array;
  };

  return (
    <View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PreviewCard
          imageSource={'wordgame'}
          onEdit={() => navigation.navigate('ChooseAlphabet')}
        />
        <CardModeView
          title={'Card mode'}
          buttons={cardModeState}
          onButtonClick={(groupIndex: number, btnIndex: number) =>
            toggleButtonState(
              cardModeState,
              setCardModeState,
              groupIndex,
              btnIndex,
              'active',
              'has_one'
            )
          }
        />
        <CardModeView
          title={'Mode'}
          buttons={modeState}
          onButtonClick={(groupIndex: number, btnIndex: number) =>
            toggleButtonState(
              modeState,
              setModeState,
              groupIndex,
              btnIndex,
              'active',
              'has_one'
            )
          }
        />

        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={'Start'}
          type={'general'}
          fontSize={17}
          onClick={() => {
            const keysCardModeState = getActiveFromArray(
              cardModeState,
              'active'
            );
            const keysModeState = getActiveFromArray(modeState, 'weak');

            navigation.navigate('Practice', {
              keysCardModeState,
              keysModeState,
              keysDifficultyLevelState: [],
              mode: PracticeScreenMode.WordGame,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default WordBuilding;