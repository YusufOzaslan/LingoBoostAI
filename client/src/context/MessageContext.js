import React, { createContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello, let's chat",
      isBot: true,
    },
  ]);

  const [input, setInput] = useState("");

  return (
    <MessageContext.Provider value={{ messages, setMessages, input, setInput }}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContext;
