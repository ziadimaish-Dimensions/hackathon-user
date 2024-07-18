import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  response: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});
