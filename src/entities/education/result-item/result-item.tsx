import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React, { FC } from "react";
import { View, Text } from "react-native";

interface ResultItemProps {
  title: string,
  body: string,
}

const ResultItem: FC<ResultItemProps> = ({ title, body }) => {
  const { colors } = useThemeContext();
  
  return (
    <View
      style={[
        {
          width: "100%",
          minHeight: 84,
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          marginTop: 8,
          gap: 10,
        },
        { borderColor: colors.BorderDefault },
      ]}
    >
      <Text
        style={[
          Typography.regularH4,
          { color: colors.TextSecondary },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          Typography.boldH4,
          { color: colors.TextPrimary },
        ]}
      >
        {body}
      </Text>
    </View>
  )
};

export default ResultItem;