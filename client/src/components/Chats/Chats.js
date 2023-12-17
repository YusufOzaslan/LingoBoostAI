import React, { useRef, useEffect, useContext } from "react";
import userIcon from "../../assets/user-icon.png";
import appLogo from "../../assets/probot-svgrepo-com.svg";
import MessageContext from "../../context/MessageContext";

function Chats() {
  
  const { messages } = useContext(MessageContext);
  const msgEnd = useRef(null);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chats">
      {messages.slice(1).map((message, i) => {
        return (
          <div key={i} className={message.isBot ? "chat bot" : "chat"}>
            <img
              className="chatImg"
              src={message.isBot ? appLogo : userIcon}
              alt=""
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
