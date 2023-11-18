import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 140,
  },
  buttons_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    paddingBottom: 50,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    height: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  table: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row_btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cell: {
    padding: 8,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    height: 50,
  },
  selectButtonLong: {
    padding: 8,
    margin: 5,
    width: 50,
    height: 50,
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
    backgroundColor: "#f2f2f2",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#f2f2f2",
  },
  text: {
    fontSize: 18,
  },
  subtext: {
    fontSize: 12,
  },
  selectButton: {
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  selectButtonText: {
    color: "white",
    textAlign: "center",
  },
  selectButtonSmall: {
    backgroundColor: "#f2f2f2",
    borderColor: "#f2f2f2",
    width: 50,
  },
});

