import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import CircleProgress from "@/components/CircleProgress";
import { RootStackParamList } from "@/types/navigationTypes";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, "Results">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Results">;

interface LearnResultsScreenProps {
  route: LearnScreenRouteProp;
  navigation: LearnResultsNavigationProp;
}

const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
  `;

const Scroll = styled.ScrollView`
  padding: 20px;
  padding-top: 0;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color4};
  margin-left: 20px;
`;

const DetailsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  margin-top: 30px;
  font-weight: 700;
`;

const DetailsCard = styled.View`
  width: 100%;
  min-height: 84px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-width: 1px;
  margin-top: 15px;
`;

const DetailsCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color3};
  font-size: 17px;
  font-weight: 400;
`;

const DetailsCardValue = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

const StatsCard = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  height: 130px;
  border-color: ${({ theme }) => theme.colors.color2};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;

  flex-direction: row;
  gap: 15px;
`;

const StatsGraph = styled.View`
  width: 100px;
  height: 100px;
  background-color: #3a3a3a;
  border-radius: 100px;
`;

const StatsDescription = styled.View``;

const StatsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

const StatsSubTitleLarge = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 22px;
  margin-top: 5px;
  font-weight: 700;
  margin-right: 4px;
`;

const StatsSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  margin-top: 5px;
  font-weight: 400;
`;

const StatsSubText = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatsSubTime = styled.Text`
  color: ${({ theme }) => theme.colors.color3};
  font-size: 13px;
  font-weight: 400;
  margin-top: 30px;
`;


const DoneButton = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.color4};
  margin-top: 45px;
  border-radius: 12px;

  flex-direction: row;
  justify-content: center;
`;

const DoneText = styled.Text`
  color: ${({ theme }) => theme.colors.color1};
  font-size: 17px;
  font-weight: 600;
`;

function ResultsScreen({ route, navigation }: LearnResultsScreenProps) {
  const { stats } = route.params;

  const insets = useSafeAreaInsets();

    const home = () => {
      navigation.navigate("Root");
    };

  return (
    <Container paddingTop={insets.top}>
      <Title>Practice complete!</Title>

      <StatsCard>
        <StatsGraph>
          <CircleProgress
            progress={(stats.correctAnswers / stats.totalQuestions) * 100}
          />
        </StatsGraph>
        <StatsDescription>
          <StatsTitle>Score</StatsTitle>
          <StatsSubText>
            <StatsSubTitleLarge>{stats.correctAnswers + 1}</StatsSubTitleLarge>
            <StatsSubTitle>/ {stats.totalQuestions + 1}</StatsSubTitle>
          </StatsSubText>
          <StatsSubTime>33.3 sec (2.8 sec / question)</StatsSubTime>
        </StatsDescription>
      </StatsCard>

      <Scroll>
        <DetailsTitle>Details</DetailsTitle>

        <DetailsCard>
          <DetailsCardTitle>Alphabet:</DetailsCardTitle>
          <DetailsCardValue>{stats.alphabets.join(", ")}</DetailsCardValue>
        </DetailsCard>

        <DetailsCard>
          <DetailsCardTitle>The fastest answer:</DetailsCardTitle>
          <DetailsCardValue>
            {stats.fastestAnswer?.letter}: {stats.fastestAnswer?.time} sec.
          </DetailsCardValue>
        </DetailsCard>

        <DetailsCard>
          <DetailsCardTitle>The slowest answer:</DetailsCardTitle>
          <DetailsCardValue>
            {stats.slowestAnswer?.letter}: {stats.slowestAnswer?.time} sec.
          </DetailsCardValue>
        </DetailsCard>

        {stats.incorrectAnswers.length !== 0 && <DetailsCard>
          <DetailsCardTitle>Incorrect answers:</DetailsCardTitle>
          <DetailsCardValue>{stats.incorrectAnswers.join(", ")}</DetailsCardValue>
        </DetailsCard>}

        <DoneButton onPress={home}>
          <DoneText>Done</DoneText>
        </DoneButton>
      </Scroll>
    </Container>
  );
}

export default ResultsScreen;
