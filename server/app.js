const express = require('express')
require('dotenv').config()
const axios = require('axios');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middele Wares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
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
