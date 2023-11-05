import { useContext } from "react";
import { getTokenOrRefresh } from "../../../utils/token_util";
import MultimediaContext from "../../../context/MultimediaContext";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function TextToSpeech() {
  const { setDisplayText, player, updatePlayer } =
    useContext(MultimediaContext);
  async function _textToSpeech() {
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

    const textToSpeak =
      "This is an example of speech synthesis for a long passage of text. Pressing the mute button should pause/resume the audio output.";
    setDisplayText(`speaking text: ${textToSpeak}...`);
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

  return (
    <div className="mt-2">
      <i
        className="fas fa-volume-up fa-lg mr-2"
        onClick={() => _textToSpeech()}
      ></i>
      Convert text to speech.
    </div>
  );
}

export default TextToSpeech;
