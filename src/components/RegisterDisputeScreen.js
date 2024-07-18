import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";
import { Buffer } from "buffer";
import { styles } from "../styles/style"; // Ensure the file name is all lowercase

const RegisterDisputeScreen = () => {
  const [reference, setReference] = useState("RFAM201811280001");
  const [bic, setBic] = useState("AAAAYYZZ");
  const [disputeCategory, setDisputeCategory] = useState("TECH");
  const [subject, setSubject] = useState("ACNC");
  const [message, setMessage] = useState(
    "There was typo in creditor account, please replace it with account 12345678998076"
  );
  const [currency, setCurrency] = useState("JOD");
  const [value, setValue] = useState("500");
  const [messageId, setMessageId] = useState("KTBF2018112217530001");
  const [transactionId, setTransactionId] = useState("KTBF2018112217530001");
  const [valueDate, setValueDate] = useState("2018-11-28");
  const [orderingInstitutionBic, setOrderingInstitutionBic] =
    useState("AAAAYYZZ");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [disputeId, setDisputeId] = useState(null);

  const handleRegisterDispute = async () => {
    console.log("Registering dispute...");
    const url = "http://141.147.32.152:11443/api/dmm/v1.0/disputes";
    const auth = Buffer.from("FRALJO22AXXX:12345678").toString("base64");
    console.log("Auth:", auth);

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
          Authorization: `Basic ${auth}`,
        },
      });
      console.log("Response:", response.data);
      setResponse(response.data);
      setDisputeId(response.data._links.self.href.split("/").pop());
      setError(null);
    } catch (err) {
      console.log("Error:", err.message);
      console.error("Error details:", err);
      setError(err.response?.data || err.message);
      setResponse(null);
    }
  };

  const handleAssignDispute = async () => {
    if (!disputeId) {
      setError("Dispute ID not found. Register the dispute first.");
      return;
    }

    console.log("Assigning dispute...");
    const url = `http://141.147.32.152:11443/api/dmm/v1.0/disputes/${disputeId}/assign`;
    const auth = Buffer.from("FRALJO22AXXX:12345678").toString("base64");

    const data = {
      message: "Please provide verifying document",
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Basic ${auth}`,
        },
      });
      console.log("Assign Response:", response.data);
      setResponse(response.data);
      setError(null);
    } catch (err) {
      console.log("Assign Error:", err.message);
      console.error("Assign Error details:", err);
      setError(err.response?.data || err.message);
      setResponse(null);
    }
  };

  const handleGetDisputes = async () => {
    console.log("Getting disputes...");
    const url = "http://141.147.32.152:11443/api/dmm/v1.0/disputes";
    const auth = Buffer.from("FRALJO22AXXX:12345678").toString("base64");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Basic ${auth}`,
        },
      });
      console.log("Get Disputes Response:", response.data);
      setResponse(response.data);
      setError(null);
    } catch (err) {
      console.log("Get Disputes Error:", err.message);
      console.error("Get Disputes Error details:", err);
      setError(err.response?.data || err.message);
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
      <Button
        title="Assign Dispute"
        onPress={() => {
          console.log("Assign button pressed");
          handleAssignDispute();
        }}
      />
      <Button
        title="Get Disputes"
        onPress={() => {
          console.log("Get Disputes button pressed");
          handleGetDisputes();
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
          <Text>{JSON.stringify(error, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterDisputeScreen;
