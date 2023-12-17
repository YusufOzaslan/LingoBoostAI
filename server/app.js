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
  try {
    const { message, level, topic, messages } = req.body;

    const messagesForAPI = messages.slice(1).map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));

    if (message.trim() !== "") {
      messagesForAPI.push({
        role: "user",
        content: message,
      });
    }
    // Prompt içeriği oluştur
    let levelDescription = "";
    switch (level) {
      case "beginner":
        levelDescription =
          "As a beginner level assistant, you should generate dialogues suitable for A2 and B1 levels of CEFR standard. These dialogues should be simple, using basic phrases and sentences related to familiar topics.";
        break;
      case "intermediate":
        levelDescription =
          "As an intermediate level assistant, you should generate dialogues suitable for B1 and B2 levels of the CEFR standard. These dialogues should involve straightforward, factual topics and express opinions or plans in a detailed manner.";
        break;
      case "advanced":
        levelDescription =
          "As an advanced level assistant, you should generate dialogues suitable for B2, C1, and C2 levels of the CEFR standard. These dialogues should demonstrate a strong command of the language, with appropriate, accurate and fluent use of complex structures across a variety of topics.";
        break;
      default:
        levelDescription = "";
    }
    console.log(messagesForAPI);
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a chat bot for practicing English in the ${topic} topic at the ${level} English CEFR level. Your aim is to start a conversation at ${level} level in English education. ${levelDescription}`,
        },
        ...messagesForAPI,
        //{ role: "user", content: message },
      ],
      max_tokens: 100,
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
