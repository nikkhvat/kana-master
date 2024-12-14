import React from "react";

import { EducationPracticeContextProvider } from "./lib/context/education-lesson-context";
import Lesson from "./ui/lesson";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";

import type { StaticScreenProps } from '@react-navigation/native';
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";

type LessonsPageProps = StaticScreenProps<{
  lesson: AutoLesson | ManuallyLesson
}>;

const LessonPage: React.FC<LessonsPageProps> = ({ route }) => {
  return (
    <EducationPracticeContextProvider>
      <AdaptiveLayout style={{ flex: 1 }} >
        <Lesson lesson={route.params.lesson} />  
      </AdaptiveLayout>
    </EducationPracticeContextProvider>
  );
};

export default LessonPage;
