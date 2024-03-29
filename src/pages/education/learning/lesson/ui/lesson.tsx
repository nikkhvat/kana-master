import React, { useEffect } from "react";

import { Text, View } from "react-native";

import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import SafeLayout from "@/app/layouts/safeLayout";

const Lesson: React.FC = () => {
  const { init } = useEducationLessonContext();

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeLayout>
      <View>
        <Text>Title (text)</Text>
      </View>
    </SafeLayout>
  );
};

export default Lesson;
