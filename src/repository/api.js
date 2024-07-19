import axios from "axios";
import { Buffer } from "buffer";

const BASE_URL = "http://141.147.32.152:11443/api/dmm/v1.0";
const AUTH = Buffer.from("FRALJO22AXXX:12345678").toString("base64");

const registerDispute = async (data) => {
  const url = `${BASE_URL}/disputes`;
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Basic ${AUTH}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

const assignDispute = async (disputeId, message) => {
  const url = `http://141.147.32.152:11443/api/dmm/v1.0/disputes/${disputeId}/assign`;
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Basic ${AUTH}`,
  };

  const data = { message };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

const getDisputes = async () => {
  const url = `https://141.147.32.152:11443//disputesunread=&createDateFrom=&createDateTo=&modificationDateFrom=modificationDateTo=or/disputes/{id}`;
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Basic ${AUTH}`,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export { registerDispute, assignDispute, getDisputes };
