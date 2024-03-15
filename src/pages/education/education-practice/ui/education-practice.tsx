import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "@/shared/types/navigationTypes";
import { EducationPracticeContextProvider } from "@/widgets/education/education-practice/lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "@/widgets/education/education-practice/lib/context/education-statistic-context";
import EducationPractice from "@/widgets/education/education-practice/ui/education-practice";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Practice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Practice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function EducationPracticePage({ route, navigation }: LearnScreenProps) {

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

export default EducationPracticePage;
