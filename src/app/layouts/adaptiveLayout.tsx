import React, { ReactNode } from "react";

import { Dimensions, StyleProp, View, ViewStyle } from "react-native";

import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { verticalScale } from "@/shared/helpers/metrics";

const screenWidth = Dimensions.get("window").width;

interface AdaptiveLayoutProps {
  style?: StyleProp<ViewStyle>
  children: ReactNode;
}

const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  style = {},
  children
}) => {
  return (
    <View style={[{
      paddingHorizontal: screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0,
    },
    style]}>
      {children}
    </View>
  );
};

export default AdaptiveLayout;