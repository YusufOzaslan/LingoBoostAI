import { Container } from "reactstrap";
import SttFromMic from "./components/Multimedia/SttFromMic/SttFromMic";
//import TextToSpeech from "./components/Multimedia/TextToSpeech/TextToSpeech";
//import HandleMute from "./components/Multimedia/HandleMute/HandleMute";
//import DisplayText from "./components/DisplayText/DisplayText";
import SideBar from "./components/SideBar/SideBar";
import Chats from "./components/Chats/Chats";
import ChatFooter from "./components/ChatFooter/ChatFooter";
import { MultimediaProvider } from "./context/MultimediaContext";
import { MessageProvider } from "./context/MessageContext";
import "./App.css";

export default function App() {
  return (
    <MultimediaProvider>
      <MessageProvider>
        <Container className="app-container">
          <div className="App">
            <SideBar />
            <div className="main">
              <Chats />
              <div className="chatFooter">
                <div>
                  <SttFromMic />
                </div>
                <ChatFooter />
                <p>Practice speaking English with Chatgpt</p>
              </div>
            </div>
          </div>
        </Container>
      </MessageProvider>
    </MultimediaProvider>
  );
}
