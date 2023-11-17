import { useContext } from "react";
import { getTokenOrRefresh } from "../../../utils/token_util";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import MultimediaContext from "../../../context/MultimediaContext";
import MessageContext from "../../../context/MessageContext";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function SttFromMic() {
  const { setDisplayText } = useContext(MultimediaContext);
  const { messages, setMessages, input, setInput} = useContext(MessageContext);

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

    setInput("speak into your microphone...");

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        setInput(`RECOGNIZED: Text=${result.text}`);
      } else {
        setInput(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    });
  }

  return (
    <i 
      className="fas fa-microphone fa-lg mr-2"
      onClick={() => _sttFromMic()}
    ></i>
  );
}

export default SttFromMic;
/*
    <div className="mt-2">
      <i
        className="fas fa-microphone fa-lg mr-2"
        onClick={() => _sttFromMic()}
      ></i>
      Convert speech to text from your mic.
    </div>
    */
