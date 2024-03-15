import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import CircularProgressBar from "@/shared/ui/progressbar/circular/circular-progress-bar";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, "Results">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Results">;

interface EducationResultProps {
  route: LearnScreenRouteProp;
  navigation: LearnResultsNavigationProp;
}

const EducationResultPage: React.FC<EducationResultProps> = ({ route, navigation }) => {
  const { stats } = route.params;

  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const home = () => {
    navigation.navigate("Root");
  };

  return (
    <View style={[containerStyles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[containerStyles.title, { color: colors.color4 }]}>Practice complete!</Text>

      <View style={[containerStyles.statsCard, { borderColor: colors.color2 }]}>
        <View style={containerStyles.statsGraph}>
          <CircularProgressBar
            progress={(stats.correctAnswers / stats.totalQuestions) * 100}
          />
        </View>
        <View style={containerStyles.statsDescription}>
          <Text style={[containerStyles.statsTitle, { color: colors.color4 }]}>Score</Text>
          <View style={containerStyles.statsSubText}>
            <Text style={[containerStyles.statsSubTitleLarge, { color: colors.color4 }]}>{stats.correctAnswers + 1}</Text>
            <Text style={[containerStyles.statsSubTitle, { color: colors.color4 }]}>/ {stats.totalQuestions + 1}</Text>
          </View>
          <Text style={[containerStyles.statsSubTime, { color: colors.color3 }]}>33.3 sec (2.8 sec / question)</Text>
        </View>
      </View>

      {/* <ScrollView style={containerStyles.scroll}>

      </ScrollView> */}

      <TouchableOpacity style={[{ backgroundColor: colors.color4 }]} onPress={home}>
        <Text style={[{ color: colors.color1 }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  scroll: {
    padding: 20,
    paddingTop: 0,
  },
  statsCard: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 130,
    flexDirection: "row",
    padding: 15,
    gap: 15
  },
  statsGraph: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  statsDescription: {},
  statsTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  statsSubTitleLarge: {
    fontSize: 22,
    fontWeight: "700",
    marginRight: 4,
  },
  statsSubTitle: {
    fontSize: 17,
    fontWeight: "400",
  },
  statsSubText: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsSubTime: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 30,
  },
});

export default EducationResultPage;
