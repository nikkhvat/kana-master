import React from "react";

import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { updateDrawLine } from "@/pages/settings/model/slice";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";

const ToggleStrokeWidth: React.FC = () => {
  const dispatch = useAppDispatch();

  const strokeWidth = useAppSelector((state) => state.profile?.draw?.lineWidth);

  const setStrokeWidth = (width: number) => {
    dispatch(updateDrawLine(width));
  };

  const { colors } = useThemeContext();

  const BIG_WIDTH = 14;
  const MIDDLE_WIDTH = 10;
  const SMALL_WIDTH = 6;

  const onClick = () => {
    if (strokeWidth === BIG_WIDTH) {
      return setStrokeWidth(SMALL_WIDTH);
    }

    if (strokeWidth === SMALL_WIDTH) {
      return setStrokeWidth(MIDDLE_WIDTH);
    }

    if (strokeWidth === MIDDLE_WIDTH) {
      return setStrokeWidth(BIG_WIDTH);
    }
  };

  const getIcon = () => {
    if (strokeWidth === BIG_WIDTH) return "bullseye";
    if (strokeWidth === MIDDLE_WIDTH) return "circle-double";

    return "circle-outline";
  };

  return (
    <PrimaryButton
      isHapticFeedback
      isIcon
      width={50}
      onClick={onClick}
      icon={<Icon name={getIcon()} size={24} color={colors.IconPrimary} />}
    />
  );
};

export default ToggleStrokeWidth;
