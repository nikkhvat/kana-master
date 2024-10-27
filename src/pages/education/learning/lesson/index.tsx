import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { EducationPracticeContextProvider } from "./lib/context/education-lesson-context";
import Lesson from "./ui/lesson";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootStackParamList } from "@/app/navigationTypes";
import { ROUTES } from "@/app/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.LESSON_PAGE>;
type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.LESSON_PAGE>;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const LessonPage = ({ route, navigation }: LearnScreenProps) => {
  return (
    <EducationPracticeContextProvider>
      <AdaptiveLayout style={{ flex: 1 }} >
        <Lesson route={route} navigation={navigation} />  
      </AdaptiveLayout>
    </EducationPracticeContextProvider>
  );
};

export default LessonPage;
