import React, { createContext, useState } from "react";

const MultimediaContext = createContext();

export const MultimediaProvider = ({ children }) => {
  const [displayText, setDisplayText] = useState(
    "Ready to test speech..."
  );
  const [player, updatePlayer] = useState({ p: undefined, muted: false });

  return (
    <MultimediaContext.Provider
      value={{ displayText, setDisplayText, player, updatePlayer }}
    >
      {children}
    </MultimediaContext.Provider>
  );
};

export default MultimediaContext;
