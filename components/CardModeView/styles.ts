import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    color: '#2A2A2A',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.43,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  btn: {
    // width: 165,
    flex: 1,
  }
})