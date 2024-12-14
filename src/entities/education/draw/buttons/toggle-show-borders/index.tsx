import React from "react";

import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { toggleShowBorder } from "@/pages/settings/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

const ToggleShowBorders: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShowBorder = useAppSelector(
    (state) => state.profile?.draw?.isShowBorder,
  );

  const toggle = () => {
    dispatch(toggleShowBorder());
  };

  const { colors } = useThemeContext();

  return (
    <SecondaryButton
      isHapticFeedback
      icon={
        <Icon
          name={isShowBorder ? "border-outside" : "border-all-variant"}
          size={24}
          color={isShowBorder ? colors.IconContrast : colors.IconPrimary}
        />
      }
      isOutline={!isShowBorder}
      onClick={toggle}
      width={50}
    />
  );
};

export default ToggleShowBorders;
