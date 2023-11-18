import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
  },
  link: {
    color: "#007aff",
    marginLeft: 20,
    marginBottom: 20,
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  table: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row_btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 0,
    gap: 7,
    paddingBottom: 10
  },
  cell: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#e0e0e0",
    borderColor: "#e0e0e0",
  },
  text_selected: {
    color: "black",
  },
  subtext_selected: {
    color: "black",
  },
  empty: {
    backgroundColor: "white",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "white",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    textAlign: "center",
  },
  selectButton: {
    backgroundColor: "#007aff",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007aff",
  },
  selectButtonText: {
    color: "white",
    textAlign: "center",
  },
  selectButtonSmall: {
    backgroundColor: "white",
    borderColor: "white",
    width: 50,
  },
});
