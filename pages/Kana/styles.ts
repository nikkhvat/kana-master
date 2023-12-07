import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // new page
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    // flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    // flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  tabContainer: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#F0EBE5",
    borderRadius: 12,
    marginTop: 8
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#2A2A2A",
  },
  kanaNameContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 1,
  },
  kanaName: {
    color: "#2A2A2A",
    fontSize: 17,
    fontWeight: "700"
  },
  table: {
    paddingHorizontal: 20,
    paddingBottom: 180,
    paddingTop: 20,
    gap: 10,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECECEC",
    width: 60,
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
  },
  text: {
    fontSize: 17,
    color: "#2A2A2A",
    lineHeight: 22
  },
  subtext: {
    fontSize: 13,
    color: "#2A2A2A"
  },
  modalContainer: {
    flex: 1, 
    backgroundColor: "white",
    margin: 0,
    padding: 0
  },
  modal: {
    flex: 1, 
    paddingTop: 15,
    justifyContent: "flex-start", 
    // paddingBottom: 36
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalKanaNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30
  },
  modalKanaTitle: {
    color: "#2A2A2A",
    fontSize: 17,
    fontWeight: "700"
  },
  modalKanaLetter: {
    color: "#2A2A2A",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15
  },
  btnsColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 0
  },
  kanaImage: {

  },
  btns: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 15
  },
  btn: {
    flex: 1,
    marginTop: 0
  },
  short_btn: {
    width: 50
  }
});
