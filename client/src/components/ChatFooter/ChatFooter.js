import { useContext } from "react";
//import MultimediaContext from "../../context/MultimediaContext";
import MessageContext from "../../context/MessageContext";
import sendBtn from "../../assets/send.svg";
import { sendMsgToOpenAI } from "../../utils/openai";

function ChatFooter() {
  //const { displayText, setDisplayText } = useContext(MultimediaContext);

  const {
    messages,
    setMessages,
    input,
    setInput,
    level,
    topic,
    startChat,
    setStartChat,
  } = useContext(MessageContext);

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    try {
      const res = await sendMsgToOpenAI(input, level, topic, messages);
      setMessages([
        ...messages,
        { text, isBot: false },
        { text: res, isBot: true },
      ]);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <div>
      {startChat.showFooter && startChat.topicSelected ? (
        <div className="inp">
          <input
            type="text"
            placeholder="Send a message"
            value={input}
            onKeyDown={handleEnter}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button className="send">
            <img src={sendBtn} alt="Send" onClick={handleSend} />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="chatBtn"
            onClick={() => {
              handleSend();
              setStartChat((prevStartChat) => ({
                ...prevStartChat,
                showFooter: true,
              }));
            }}
            disabled={!startChat.topicSelected}
          >
            Choose a topic and start to chat
          </button>
        </div>
      )}
    </div>
  );
}
export default ChatFooter;
