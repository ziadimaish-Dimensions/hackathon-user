import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Buffer } from "buffer";

const RegisterDisputeScreen = () => {
  const [reference, setReference] = useState("12");
  const [bic, setBic] = useState("FRALJO28");
  const [disputeCategory, setDisputeCategory] = useState("TECH");
  const [subject, setSubject] = useState("ACNC");
  const [message, setMessage] = useState("12345678998076");
  const [currency, setCurrency] = useState("JOD");
  const [value, setValue] = useState("22");
  const [messageId, setMessageId] = useState("FRALJO22AXXX92950882");
  const [transactionId, setTransactionId] = useState("FRALJO22AXXX92950882");
  const [valueDate, setValueDate] = useState("2024-07-17");
  const [orderingInstitutionBic, setOrderingInstitutionBic] =
    useState("FRALJO22");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleRegisterDispute = async () => {
    console.log("Registering dispute...");
    const url = "https://141.147.32.152:11443/api/dmm/v1.0/disputes";
    const auth = Buffer.from("FRALJO22AXXX:12345678").toString("base64");

    const data = {
      reference,
      respondent: { BIC: bic },
      disputeCategory,
      subject,
      message,
      amount: {
        currency,
        value: parseFloat(value),
      },
      originalPayment: {
        messageId,
        transactionId,
        valueDate,
        orderingInstitution: { BIC: orderingInstitutionBic },
      },
    };

    console.log("Sending data:", data);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `${auth}`,
        },
      });
      console.log("Response:", response.data);
      setResponse(response.data);
      setError(null);
    } catch (err) {
      console.log("Error:", err.message);
      console.error("Error details:", err);
      console.lo("Error details:", err.response.data);
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register a Dispute</Text>
      <TextInput
        placeholder="Reference"
        value={reference}
        onChangeText={setReference}
        style={styles.input}
      />
      <TextInput
        placeholder="Respondent BIC"
        value={bic}
        onChangeText={setBic}
        style={styles.input}
      />
      <TextInput
        placeholder="Dispute Category"
        value={disputeCategory}
        onChangeText={setDisputeCategory}
        style={styles.input}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <TextInput
        placeholder="Currency"
        value={currency}
        onChangeText={setCurrency}
        style={styles.input}
      />
      <TextInput
        placeholder="Value"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <TextInput
        placeholder="Message ID"
        value={messageId}
        onChangeText={setMessageId}
        style={styles.input}
      />
      <TextInput
        placeholder="Transaction ID"
        value={transactionId}
        onChangeText={setTransactionId}
        style={styles.input}
      />
      <TextInput
        placeholder="Value Date"
        value={valueDate}
        onChangeText={setValueDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Ordering Institution BIC"
        value={orderingInstitutionBic}
        onChangeText={setOrderingInstitutionBic}
        style={styles.input}
      />
      <Button
        title="Register Dispute"
        onPress={() => {
          console.log("Button pressed");
          handleRegisterDispute();
        }}
      />
      {response && (
        <View style={styles.response}>
          <Text style={styles.responseTitle}>Response:</Text>
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </View>
      )}
      {error && (
        <View style={styles.error}>
          <Text style={styles.errorTitle}>Error:</Text>
          <Text>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default RegisterDisputeScreen;
