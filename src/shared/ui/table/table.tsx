import React from "react";

import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface TableProps {
  data: string[][]
}

const Table: React.FC<TableProps> = ({ data }) => {
  const { colors } = useThemeContext();

  const tableColors = { borderColor: colors.color2 };
  const columnStyles = { 
    borderColor: colors.color2,
    width: (100 / data.length) + "%"
  };
  const cellStyles = { borderColor: colors.color2 };
  const cellTextStyles = { color: colors.color4 };
  const boldTextStyles = { 
    fontWeight: "bold",
    fontSize: 15
   };

  return (
    <View style={[styles.table, tableColors]} >
      {data.map((column, idx) => <View style={[styles.column, columnStyles, 
        idx > 0 ? { borderLeftWidth: 1 } : {}]} key={idx} >
        {column.map((cell, index) => <View style={[styles.cell, cellStyles,
          index > 0 ? { borderTopWidth: 1 } : {}
        ]} key={`${idx}/${index}`} >
          <Text style={[styles.text, cellTextStyles, index === 0 ? boldTextStyles : {}]} >{cell}</Text>
        </View>)}
      </View>)}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  table: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 15
  },
  column: {
  },
  cell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 42,
  },
  text: {
    fontSize: 15
  }
});
