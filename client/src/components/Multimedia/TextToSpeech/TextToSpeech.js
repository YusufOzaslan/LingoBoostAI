import { useContext, useEffect } from "react";
import { getTokenOrRefresh } from "../../../utils/token_util";
import MultimediaContext from "../../../context/MultimediaContext";
import MessageContext from "../../../context/MessageContext";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function TextToSpeech() {
  const { messages } = useContext(MessageContext);
  const { setDisplayText, player, updatePlayer } =
    useContext(MultimediaContext);

  useEffect(() => {
    // Code to run when the last element of the messages array changes
    const latestMessage = messages[messages.length - 1];

    if (latestMessage && latestMessage.isBot) {
      _textToSpeech(latestMessage.text);
    }
  }, [messages]);

  async function _textToSpeech(textToSpeak) {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    const myPlayer = new speechsdk.SpeakerAudioDestination();
    updatePlayer((p) => {
      p.p = myPlayer;
      return p;
    });
    const audioConfig = speechsdk.AudioConfig.fromSpeakerOutput(player.p);

    let synthesizer = new speechsdk.SpeechSynthesizer(
      speechConfig,
      audioConfig
    );

    //const textToSpeak = "This is an example of speech synthesis for a long passage of text. Pressing the mute button should pause/resume the audio output.";
    //setDisplayText(`speaking text: ${textToSpeak}...`);
    synthesizer.speakTextAsync(
      textToSpeak,
      (result) => {
        let text;
        if (
          result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted
        ) {
          text = `synthesis finished for "${textToSpeak}".\n`;
        } else if (result.reason === speechsdk.ResultReason.Canceled) {
          text = `synthesis failed. Error detail: ${result.errorDetails}.\n`;
        }
        synthesizer.close();
        synthesizer = undefined;
        setDisplayText(text);
      },
      function (err) {
        setDisplayText(`Error: ${err}.\n`);

        synthesizer.close();
        synthesizer = undefined;
      }
    );
  }

  return <div></div>;
}

export default TextToSpeech;
