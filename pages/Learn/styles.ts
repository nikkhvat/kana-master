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
    fontWeight: "600",
    marginBottom: 60
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white"
  },
  wrong_btn: {
    backgroundColor: "red"
  }
});
