import React, { createContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      text: "",
      isBot: true,
    },
  ]);

  const [input, setInput] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [topic, setTopic] = useState("");
  const [startChat, setStartChat] = useState({
    topicSelected: false,
    showFooter: false,
  });

  const contextValues = {
    messages,
    setMessages,
    input,
    setInput,
    level,
    setLevel,
    topic,
    setTopic,
    startChat,
    setStartChat,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContext;
