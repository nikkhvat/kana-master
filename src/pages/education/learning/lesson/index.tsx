import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable, Text } from "react-native";

import { EducationPracticeContextProvider } from "./lib/context/education-lesson-context";
import Lesson from "./ui/lesson";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootStackParamList } from "@/shared/types/navigationTypes";



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LessonPage">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LessonPage">;

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
