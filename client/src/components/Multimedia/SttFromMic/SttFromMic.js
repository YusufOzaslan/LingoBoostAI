import { useContext } from "react";
import { getTokenOrRefresh } from "../../../utils/token_util";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import MultimediaContext from "../../../context/MultimediaContext";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function SttFromMic() {
  const { setDisplayText } = useContext(MultimediaContext);

  async function _sttFromMic() {
    const tokenObj = await getTokenOrRefresh();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
      tokenObj.authToken,
      tokenObj.region
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    setDisplayText("speak into your microphone...");

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setDisplayText(`RECOGNIZED: Text=${result.text}`);
      } else {
        setDisplayText(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    });
  }

  return (
    <div className="mt-2">
      <i
        className="fas fa-microphone fa-lg mr-2"
        onClick={() => _sttFromMic()}
      ></i>
      Convert speech to text from your mic.
    </div>
  );
}

export default SttFromMic;
