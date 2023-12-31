import axios from "axios";

const apiUrl = "http://localhost:3001";

export const sendMsgToOpenAI = async (message, level, topic, messages) => {
  try {
    const response = await axios.post(`${apiUrl}/api/sendMsgToOpenAI`, {
      message,
      level,
      topic,
      messages,
    });
    return response.data.response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};