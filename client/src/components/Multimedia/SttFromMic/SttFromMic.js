import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { getTokenOrRefresh } from "../../../utils/token_util";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import MessageContext from "../../../context/MessageContext";

const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

function SttFromMic() {
  const { setInput } = useContext(MessageContext);

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
        setInput(result.text);
      } else {
        setInput(
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly."
        );
      }
    });
  }

  return (
    <div>
      {" "}
      <FontAwesomeIcon
        icon={faMicrophone}
        className="fas fa-microphone fa-lg mr-2"
        onClick={() => _sttFromMic()}
      />
    </div>
  );
}

export default SttFromMic;