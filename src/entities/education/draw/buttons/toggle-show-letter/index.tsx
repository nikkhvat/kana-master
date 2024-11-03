import React from "react";

import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { toggleShowLetter } from "@/pages/settings/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

const ToggleShowLetter: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShowLetter = useAppSelector(
    (state) => state.profile?.draw?.isShowLetter,
  );

  const toggle = () => {
    dispatch(toggleShowLetter(null));
  };

  const { colors } = useThemeContext();

  return (
    <SecondaryButton
      isHapticFeedback
      icon={
        <Icon
          name={isShowLetter ? "eye-outline" : "eye-off-outline"}
          size={24}
          color={isShowLetter ? colors.IconContrast : colors.IconPrimary}
        />
      }
      isOutline={!isShowLetter}
      onClick={toggle}
      width={50}
    />
  );
};

export default ToggleShowLetter;
