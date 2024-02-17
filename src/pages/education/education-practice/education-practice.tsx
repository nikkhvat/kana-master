import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { EducationPracticeContextProvider } from "@/features/education/education-practice/lib/context/education-practice-context";
import EducationPractice from "@/features/education/education-practice/ui/education-practice";
import { RootStackParamList } from "@/shared/types/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Practice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Practice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function EducationPracticePage({ route, navigation }: LearnScreenProps) {

  return (
    <EducationPracticeContextProvider>
      <EducationPractice 
        navigation={navigation} 
        route={route} />
    </EducationPracticeContextProvider>
  );
}

export default EducationPracticePage;