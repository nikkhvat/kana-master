import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 240,
    flex: 0.3,
    borderColor: "transparent",
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 15,
    position: "relative"
  },
  textView: {
    width: 315,
    backgroundColor: "#FFF",
    borderRadius: 12,
    height: 79,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    padding: 15
  },
  textTitle: {
    color: "#2A2A2A",
    fontSize: 28,
    fontWeight: "700"
  },
  textSubtitle: {
    color: "#BDBDBD",
    fontSize: 13
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: "#2A2A2A",
    borderRadius: 40,
    position: "absolute",
    right: 15,
    top: -20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})