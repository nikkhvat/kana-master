import React, { useCallback, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/hooks/theme-context";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import EducationKanaQuickSelection from "@/widgets/education/education-kana-quick-selection/ui/education-kana-quick-selection";
import EducationKanaSelection from "@/widgets/education/education-kana-selection/ui/education-kana-quick-selection";

type ChooseAlphabetNavigationProp = StackNavigationProp<RootStackParamList, "ChooseAlphabet">;
type ChooseAlphabetScreenRouteProp = RouteProp<RootStackParamList, "ChooseAlphabet">;

interface EducationKanaQuickSelectionProps {
  route: ChooseAlphabetScreenRouteProp;
  navigation: ChooseAlphabetNavigationProp;
}

const EducationKanaQuickSelectionPage: React.FC<EducationKanaQuickSelectionProps> = ({ route, navigation }) => {
  const { screen } = route.params;

  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const closeModal = useCallback(() => setModalVisible(false), []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.color1, paddingTop: insets.top }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ justifyContent: "center", alignItems: "center", padding: 18, margin: -18 }}>
          <Icon name="keyboard-backspace" size={24} color={colors.color4} />
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={{ justifyContent: "center", alignItems: "center", padding: 18, margin: -18 }}>
          <Icon name="square-edit-outline" size={24} color={colors.color4} />
        </Pressable>
      </View>

      {!isModalVisible && (
        <EducationKanaQuickSelection
          screen={screen}
          navigation={navigation}
        />
      )}
      
      <EducationKanaSelection
        closeModal={closeModal}
        show={isModalVisible}
      />
    </View>
  );
};

export default EducationKanaQuickSelectionPage;
