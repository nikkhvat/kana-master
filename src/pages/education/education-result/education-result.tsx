import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useThemeContext } from "@/hooks/theme-context";
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
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>Practice complete!</Text>

      <View style={[styles.statsCard, { borderColor: colors.color2 }]}>
        <View style={styles.statsGraph}>
          <CircularProgressBar
            progress={(stats.correctAnswers / stats.totalQuestions) * 100}
          />
        </View>
        <View style={styles.statsDescription}>
          <Text style={[styles.statsTitle, { color: colors.color4 }]}>Score</Text>
          <View style={styles.statsSubText}>
            <Text style={[styles.statsSubTitleLarge, { color: colors.color4 }]}>{stats.correctAnswers + 1}</Text>
            <Text style={[styles.statsSubTitle, { color: colors.color4 }]}>/ {stats.totalQuestions + 1}</Text>
          </View>
          <Text style={[styles.statsSubTime, { color: colors.color3 }]}>33.3 sec (2.8 sec / question)</Text>
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        {/* <Text style={[styles.detailsTitle, { color: colors.color4 }]}>Details</Text> */}

        {/* DetailsCard and other components similarly styled */}
        {/* Assuming other components are refactored similarly to above */}
      </ScrollView>

      {/* <TouchableOpacity style={[styles.doneButton, { backgroundColor: colors.color4 }]} onPress={home}>
        <Text style={[styles.doneText, { color: colors.color1 }]}>Done</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default EducationResultPage;


const styles = StyleSheet.create({
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
  },
  statsGraph: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#3a3a3a", // Example background color, adjust as necessary
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