import React, { ReactNode } from "react";

import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeLayoutProps {
  disableButton?: boolean
  disableTop?: boolean
  disableLeft?: boolean
  disableRight?: boolean
  style?: StyleProp<ViewStyle>
  children: ReactNode;
}

const SafeLayout: React.FC<SafeLayoutProps> = ({
  disableButton = false,
  disableTop = false,
  disableLeft = false,
  disableRight = false,
  style = {},
  children
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      { 
        paddingTop: !disableTop ? insets.top + 20 : 0, 
        paddingBottom: !disableButton ? insets.bottom + 20 : 0,
        paddingLeft: !disableLeft ? insets.left + 20 : 0,
        paddingRight: !disableRight ? insets.right + 20 : 0
      }, 
      style
    ]}>
      {children}
    </View>
  );
};

export default SafeLayout;