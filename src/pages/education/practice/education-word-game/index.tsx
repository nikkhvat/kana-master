import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { EducationPracticeContextProvider } from "./lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "./lib/context/education-statistic-context";
import EducationWordGame from "./ui/education-practice";

import { RootStackParamList } from "@/shared/types/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "EducationWordGame">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "EducationWordGame">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function EducationWordGamePage({ route, navigation }: LearnScreenProps) {

  return (
    <EducationPracticeContextProvider>
      <EducationStatisticContextProvider>
        <EducationWordGame 
          navigation={navigation} 
          route={route} />
      </EducationStatisticContextProvider>
    </EducationPracticeContextProvider>
  );
}

export default EducationWordGamePage;