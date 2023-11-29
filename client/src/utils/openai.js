import axios from "axios";

const apiUrl = "http://localhost:3001";

export const sendMsgToOpenAI = async (message) => {
  try {
    const response = await axios.post(`${apiUrl}/api/sendMsgToOpenAI`, {
      message,
    });
    return response.data.response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
/*import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function sendMsgToOpenAI(message) {
  const res = await openai.completions.create({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 1,
  });
  return res.choices[0].text;
}
*/
