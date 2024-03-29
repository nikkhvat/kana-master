import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { EducationPracticeContextProvider } from "./lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "./lib/context/education-statistic-context";
import EducationPractice from "./ui/education-practice";

import { RootStackParamList } from "@/shared/types/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "EducationPractice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "EducationPractice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function TestingPage({ route, navigation }: LearnScreenProps) {

  return (
    <EducationPracticeContextProvider>
      <EducationStatisticContextProvider>
        <EducationPractice 
          navigation={navigation} 
          route={route} />
      </EducationStatisticContextProvider>
    </EducationPracticeContextProvider>
  );
}

export default TestingPage;
