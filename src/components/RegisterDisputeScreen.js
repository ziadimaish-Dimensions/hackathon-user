import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { styles } from "../styles/style";
import { registerDispute, assignDispute, getDisputes } from "../repository/api";

const RegisterDisputeScreen = () => {
  const [reference, setReference] = useState("123453212");
  const [bic, setBic] = useState("FRALJO36");
  const [disputeCategory, setDisputeCategory] = useState("TECH");
  const [subject, setSubject] = useState("ACNC");
  const [message, setMessage] = useState(
    "There was typo in creditor account, please replace it with account 12345678998076"
  );
  const [currency, setCurrency] = useState("JOD");
  const [value, setValue] = useState("46");
  const [messageId, setMessageId] = useState("FRALJO22AXXX9295847");
  const [transactionId, setTransactionId] = useState("FRALJO22AXXX9295847");
  const [valueDate, setValueDate] = useState("2024-07-17");
  const [orderingInstitutionBic, setOrderingInstitutionBic] =
    useState("FRALJO22");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [disputeId, setDisputeId] = useState(null);

  const handleRegisterDispute = async () => {
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

    try {
      const response = await registerDispute(data);
      setResponse(response);
      setDisputeId(response._links.self.href.split("/").pop());
      setError(null);
    } catch (err) {
      setError(err);
      setResponse(null);
    }
  };

  const handleAssignDispute = async () => {
    if (!disputeId) {
      setError("Dispute ID not found. Register the dispute first.");
      return;
    }

    try {
      const response = await assignDispute(
        disputeId,
        "Please provide verifying document"
      );
      setResponse(response);
      setError(null);
    } catch (err) {
      setError(err);
      setResponse(null);
    }
  };

  const handleGetDisputes = async () => {
    try {
      const response = await getDisputes();
      setResponse(response);
      setError(null);
    } catch (err) {
      setError(err);
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
          handleRegisterDispute();
        }}
      />
      <Button
        title="Assign Dispute"
        onPress={() => {
          handleAssignDispute();
        }}
      />
      <Button
        title="Get Disputes"
        onPress={() => {
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
