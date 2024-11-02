import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Vibration } from "react-native";

import { bottomScreens } from "./routes";
import { ROUTES } from "./navigationTypes";
import { useAppSelector } from "@/shared/model/hooks";

import * as Haptics from "expo-haptics";
import { isIOS } from "@/shared/constants/platformUtil";

const Tab = createBottomTabNavigator();

const icons = {
  [ROUTES.LEARNING_ROOT]: "school-outline",
  [ROUTES.PRACTICE_ROOT]: "layers-outline",
  [ROUTES.SETTINGS_ROOT]: "cog-outline",
  [ROUTES.KANA_TABLE_ROOT]: "syllabary-hiragana",
} as const;

type IconType = typeof ROUTES.LEARNING_ROOT
  | typeof ROUTES.PRACTICE_ROOT
  | typeof ROUTES.SETTINGS_ROOT
  | typeof ROUTES.KANA_TABLE_ROOT

function BottomTabNavigator() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcon
            name={icons[route.name as IconType]}
            size={size}
            color={color}
          />
        ),
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={(e) => {
              if (isEnabledHaptic) {
                if (isIOS()) {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                } else {
                  Vibration.vibrate(1);
                }
              }

              props?.onPress?.(e);
            }}
            style={[props.style, { height: 45, marginTop: 5 }]}
          />
        ),
        tabBarStyle: {
          height: 60 + insets.bottom,
          flexDirection: "column",
          alignItems: "center",
        },
      })}
    >
      {bottomScreens.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            title: t(tab.title),
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      ))} 
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;