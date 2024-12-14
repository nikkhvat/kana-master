import React from "react";

import { RouteProp } from "@react-navigation/native";

import { EducationPracticeContextProvider } from "./lib/context/education-practice-context";
import { EducationStatisticContextProvider } from "./lib/context/education-statistic-context";
import EducationPractice from "./ui/education-practice";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootStackParamList } from "@/app/navigationTypes";
import { ROUTES } from "@/app/navigationTypes";

type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.PRACTICE_TESTING>;

interface LearnScreenProps {
  route: LearnScreenRouteProp
}

const TestingPage: React.FC<LearnScreenProps> = ({ route }) => {

  return (
    <EducationPracticeContextProvider>
      <EducationStatisticContextProvider>
        <AdaptiveLayout style={{flex: 1}} >
          <EducationPractice route={route} />
        </AdaptiveLayout>
      </EducationStatisticContextProvider>
    </EducationPracticeContextProvider>
  );
}

export default TestingPage;
