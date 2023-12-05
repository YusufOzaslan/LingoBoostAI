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
  const [level, setLevel] = useState("B1");
  const [category, setCategory] = useState("Cooking Recipe Talk");

  const contextValues = {
    messages,
    setMessages,
    input,
    setInput,
    level,
    setLevel,
    category,
    setCategory,
  };

  return (
    <MessageContext.Provider value={contextValues}>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageContext;
