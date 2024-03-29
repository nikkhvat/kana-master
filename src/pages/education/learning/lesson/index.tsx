import React from "react";

import { EducationPracticeContextProvider } from "./lib/context/education-lesson-context";
import Lesson from "./ui/lesson";

const LessonPage = () => {
  return (
    <EducationPracticeContextProvider>
      <Lesson />
    </EducationPracticeContextProvider>
  );
};

export default LessonPage;
