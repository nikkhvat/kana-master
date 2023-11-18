import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  link: {
    color: "#007bff",
    marginLeft: 20,
    marginBottom: 20,
  },
  buttons_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    paddingBottom: 45,
    padding: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 8,
    height: 34,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  table: {
    padding: 20,
    gap: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row_btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 0,
    gap: 13
  },
  cell: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 45,
    height: 50,
  },
  selectButtonLong: {
    padding: 8,
    width: 45,
    height: 45,
  },
  selected: {
    backgroundColor: "#e0dcdc",
    borderColor: "#e0dcdc",
    borderRadius: 6,
    borderWidth: 2,
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
  },
  subtext: {
    fontSize: 12,
  },
  selectButton: {
    backgroundColor: "#007bff",
    width: 45,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  selectButtonText: {
    color: "white",
    textAlign: "center",
  },
  selectButtonSmall: {
    backgroundColor: "white",
    borderColor: "white",
    width: 45,
  },
});

