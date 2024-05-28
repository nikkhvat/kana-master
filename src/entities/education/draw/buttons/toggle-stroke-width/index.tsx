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

  const BIG_WIDTH = 14;
  const MIDDLE_WIDTH = 10;
  const SMALL_WIDTH = 6;

  
  return (
    <Button
      customStyles={{ width: 50, height: 50 }}
      type={"weak"}
      icon={
        strokeWidth === BIG_WIDTH ?
          <Icon name={"circle-slice-8"} size={24} color={colors.color4} />
          : strokeWidth === MIDDLE_WIDTH ?
            <Icon name={"circle-double"} size={24} color={colors.color4} />
            :
            <Icon name={"circle-outline"} size={24} color={colors.color4} />
      }
      onClick={() => strokeWidth === BIG_WIDTH ? setStrokeWidth(MIDDLE_WIDTH)
        : strokeWidth === MIDDLE_WIDTH ? setStrokeWidth(SMALL_WIDTH) : setStrokeWidth(BIG_WIDTH)}
    />
  )
};

export default ToggleStrokeWidth;