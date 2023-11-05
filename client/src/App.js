import React from "react";
import { Container } from "reactstrap";
import SttFromMic from "./components/Multimedia/SttFromMic/SttFromMic";
import TextToSpeech from "./components/Multimedia/TextToSpeech/TextToSpeech";
import HandleMute from "./components/Multimedia/HandleMute/HandleMute";
import { MultimediaProvider } from "./context/MultimediaContext";
import DisplayText from "./components/DisplayText/DisplayText";
import "./custom.css";

export default function App() {
  return (
    <MultimediaProvider>
      <Container className="app-container">
        <h1 className="display-4 mb-3">Speech sample app</h1>
        <div className="row main-container">
          <div className="col-6">
            <SttFromMic />
            <TextToSpeech />
            <HandleMute />
          </div>
          <DisplayText />
        </div>
      </Container>
    </MultimediaProvider>
  );
}
