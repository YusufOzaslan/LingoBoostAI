import React, { useRef, useEffect, useContext } from "react";
import userIcon from "../../assets/user-icon.png";
import gptImgLogo from "../../assets/chatgptLogo.svg";
import MessageContext from "../../context/MessageContext";

function Chats() {
  const msgEnd = useRef(null);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, []);

  const { messages } = useContext(MessageContext);

  return (
    <div className="chats">
      {messages.map((message, i) => {
        return (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <img
              className="chatImg"
              src={message.isBot ? gptImgLogo : userIcon}
            />
            <p className="txt">{message.text}</p>
          </div>
        );
      })}
      <div ref={msgEnd}></div>
    </div>
  );
}
export default Chats;
