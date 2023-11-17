import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function sendMsgToOpenAI(message) {
  const res = await openai.completions.create({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 1,
  });

  return res.choices[0].text;
}
