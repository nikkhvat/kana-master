import React from "react";

import Button from "@/shared/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { toggleShowBorder } from "@/pages/profile/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

const ToggleShowBorders: React.FC = () => {
  const dispatch = useAppDispatch();

  const isShowBorder = useAppSelector((state) => state.profile.draw.isShowBorder);

  const toggle = () => {
    dispatch(toggleShowBorder(null))
  }

  const { colors } = useThemeContext();

  return (
    <Button
      customStyles={{ width: 50, height: 50 }}
      type={isShowBorder ? "active" : "inactive"}
      icon={
        <Icon
          name={"border-outside"}
          size={24}
          color={isShowBorder ? colors.color5 : colors.color4}
        />
      }
      onClick={toggle}
    />
  )
};

export default ToggleShowBorders;