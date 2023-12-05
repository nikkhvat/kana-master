import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    height: 50,
    borderRadius: 12,
  },
  button_active: {
    backgroundColor: "#9A7861",
  },
  button_inactive: {
    backgroundColor: "transparent",
    borderColor: "#ECECEC",
    borderStyle: "solid",
    borderWidth: 1,
  },
  button_weak: {
    backgroundColor: "#F0EBE5",
  },
  button_general: {
    backgroundColor: "#2A2A2A",
  },
  text: {
    fontSize: 13,
  },
  text_active: {
    color: "#FFF",
    fontWeight: "700"
  },
  text_inactive: {
    color: "#2A2A2A",
    fontWeight: "700"
  },
  text_weak: {
    color: "#2A2A2A",
    fontWeight: "700"
  },
  text_general: {
    color: "#FFF",
    fontWeight: "700"
  },
})