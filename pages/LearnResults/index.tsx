import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { View } from "react-native";
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LearnResults">;

interface LearnResultsScreenProps {
  route: LearnScreenRouteProp;
}

function LearnResultsScreen({ route }: LearnResultsScreenProps) {
  return (
    <View>
      
    </View>
  )
}

export default LearnResultsScreen;