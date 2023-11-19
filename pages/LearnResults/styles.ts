import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    marginTop: 20,
    fontSize: 16
  },
  item_letters: {
    marginTop: 10,
    fontSize: 16
  },
  itemContainer: {
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemValue: {
    fontSize: 16,
    marginTop: 5
  }, 
  startTestBtn: {
    padding: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#007aff",
    marginTop: 40,
    marginBottom: 60,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
