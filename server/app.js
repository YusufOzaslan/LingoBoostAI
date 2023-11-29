const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middele Wares
app.use(bodyParser.json());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.post("/api/sendMsgToOpenAI", async (req, res) => {
  /*
  const { message } = req.body;
  console.log("Received message:", message);
  res.json({ response: 'Backend received the message.' });
 */
  try {
    const { message } = req.body;

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      max_tokens: 7,
    });
    console.log(openaiResponse);
    const responseText = openaiResponse.choices[0].message.content;
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

app.get("/api/get-speech-token", async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const speechKey = process.env.SPEECH_KEY;
  const speechRegion = process.env.SPEECH_REGION;

  const headers = {
    headers: {
      "Ocp-Apim-Subscription-Key": speechKey,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const tokenResponse = await axios.post(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      null,
      headers
    );
    res.send({ token: tokenResponse.data, region: speechRegion });
  } catch (err) {
    res.status(401).send("There was an error authorizing your speech key.");
  }
});

app.get("/api", async (req, res, next) => {
  res.status(200).send("Listening from the Hello");
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
