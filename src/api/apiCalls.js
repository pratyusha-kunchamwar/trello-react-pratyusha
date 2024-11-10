import axios from "axios";
import { config } from "../config";
const { BASE_URL, APIKEY, TOKEN } = config;

//get data
export const getData = async (endpoint = "") => {
  const fullUrl = `${BASE_URL}${endpoint}?key=${APIKEY}&token=${TOKEN}`;

  try {
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    console.error("Error in getData:", error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

//post data
export const postData = async (data, endpoint = "") => {
  try {
    await axios.post(
    `${BASE_URL}${endpoint}?key=${APIKEY}&token=${TOKEN}`,
      data
    );
  } catch (error) {
    throw new Error(`Failed to Create : ${error.message}`);
  }
};

//update
export const updateData = async (data=null, endpoint = "") => {
  try {
    await axios.put(`${BASE_URL}${endpoint}?key=${APIKEY}&token=${TOKEN}`,
      data
    );

  }
  catch (error) {
    throw new Error(`Failed to Update the  data: ${error.message}`);

  }
}

//delete
export const deleteData = async (endpoint = "") => {
  try {
    await axios.delete(`${BASE_URL}${endpoint}?key=${APIKEY}&token=${TOKEN}`);
  } catch (error) {
    throw new Error(`Failed to delete data: ${error.message}`);
  }
};

//archive
export const archiveData = async (endpoint = "") => {
  try {
    await axios.put(`${BASE_URL}${endpoint}&key=${APIKEY}&token=${TOKEN}`);
  } catch (error) {
    throw new Error(`Failed to archive data: ${error.message}`);
  }
};
