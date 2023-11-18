import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 146,
    fontWeight: "600"
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 50,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    height: 50,
    width: 50,
    borderRadius: 6,
    marginBottom: 20,
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: "white"
  },
  button_mode_active: {
    backgroundColor: "green"
  },
  wrong_btn: {
    backgroundColor: "red"
  }
})
