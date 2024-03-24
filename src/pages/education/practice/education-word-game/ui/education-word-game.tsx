import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "@/shared/types/navigationTypes";
import { EducationPracticeContextProvider } from "@/widgets/education/education-word-game/lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "@/widgets/education/education-word-game/lib/context/education-statistic-context";
import EducationWordGame from "@/widgets/education/education-word-game/ui/education-practice";

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