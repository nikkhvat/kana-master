import React from "react";

import Button from "@/shared/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { updateDrawLine } from "@/pages/profile/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

const ToggleStrokeWidth: React.FC = () => {
  const dispatch = useAppDispatch();

  const strokeWidth = useAppSelector((state) => state.profile?.draw?.lineWidth);

  const setStrokeWidth = (width: number) => {
    dispatch(updateDrawLine(width))
  }

  const { colors } = useThemeContext();
  
  return (
    <Button
      customStyles={{ width: 50, height: 50 }}
      type={"weak"}
      icon={
        strokeWidth === 14 ?
          <Icon name={"circle-slice-8"} size={24} color={colors.color4} />
          : strokeWidth === 9 ?
            <Icon name={"circle-double"} size={24} color={colors.color4} />
            :
            <Icon name={"circle-outline"} size={24} color={colors.color4} />
      }
      onClick={() => strokeWidth === 14 ? setStrokeWidth(9)
          : strokeWidth === 9 ? setStrokeWidth(7) : setStrokeWidth(14)}
    />
  )
};

export default ToggleStrokeWidth;