import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackParamList } from "@/shared/types/navigationTypes";
import DrawKana from "@/widgets/kana/draw-kana/ui/draw-kana";


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "DrawKana">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "DrawKana">;

interface KanaDrawProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const EducationDraw: React.FC<KanaDrawProps> = ({ route, navigation }) => {

  const insets = useSafeAreaInsets();

  const { letter, kana } = route.params;

  return (
    <View style={{ top: insets.top }} >
      <DrawKana
        letter={letter}
        kana={kana}
        back={() => navigation.goBack()}
      />
    </View>
  );
};

export default EducationDraw;