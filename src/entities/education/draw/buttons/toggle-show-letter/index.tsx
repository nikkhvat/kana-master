import React from "react";

import Button from "@/shared/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { toggleShowBorder, toggleShowLetter } from "@/pages/profile/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

const ToggleShowLetter: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShowLetter = useAppSelector((state) => state.profile.draw.isShowLetter);

  const toggle = () => {
    dispatch(toggleShowLetter(null))
  }

  const { colors } = useThemeContext();

  return (
    <Button
      customStyles={{ width: 50, height: 50 }}
      type={isShowLetter ? "active" : "inactive"}
      icon={
        <Icon
          name={"eye-outline"}
          size={24}
          color={isShowLetter ? colors.color5 : colors.color4}
        />
      }
      onClick={toggle}
    />
  )
};

export default ToggleShowLetter;