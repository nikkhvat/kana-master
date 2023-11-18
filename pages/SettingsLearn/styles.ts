import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginTop: 15,
  },
  optionText: {
    fontSize: 18,
  },
  startTestBtn: {
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#007aff",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
