import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  title: {
    fontSize: 146,
    fontWeight: "700",
    marginBottom: 60
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "stretch",
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
