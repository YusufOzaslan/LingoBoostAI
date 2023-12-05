import React, { useContext } from "react";
import appLogo from "../../assets/probot-svgrepo-com.svg";
import clearBtn from "../../assets/clear.png";
import msgIcon from "../../assets/message.svg";
import MessageContext from "../../context/MessageContext";
import { sendMsgToOpenAI } from "../../utils/openai";

function SideBar() {
  const {
    messages,
    setMessages,
    input,
    level,
    setLevel,
    category,
    setCategory,
  } = useContext(MessageContext);

  const handleQuery = async (text) => {
    setCategory(text);
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input, level, category, messages);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleLevelClick = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={appLogo} alt="Logo" className="logo" />
          <span className="brand">LingoBoostIA Web App</span>
        </div>
        <button
          className="midBtn"
          onClick={() => {
            window.location.reload();
          }}
        >
          <img src={clearBtn} alt="new chat" className="addBtn" />
          Clear Chat
        </button>
        <div className="upperSideBottom">
          <button
            className="query"
            onClick={() => handleQuery("Cooking Recipe Talk")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Cooking Recipe Talk
          </button>
          <button
            className="query"
            onClick={() => handleQuery("Weather Discussion")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Weather Discussion
          </button>
        </div>
      </div>

      <div className="lowerSide">
        <span className="brand">Choose your English level</span>
        <div className="listItems">
          <button
            className={`listItemsBtn ${level === "A1" ? "selected" : ""}`}
            onClick={() => handleLevelClick("A1")}
          >
            A1
          </button>
          <button
            className={`listItemsBtn ${level === "A2" ? "selected" : ""}`}
            onClick={() => handleLevelClick("A2")}
          >
            A2
          </button>
          <button
            className={`listItemsBtn ${level === "B1" ? "selected" : ""}`}
            onClick={() => handleLevelClick("B1")}
          >
            B1
          </button>
        </div>
        <div className="listItems">
          <button
            className={`listItemsBtn ${level === "B2" ? "selected" : ""}`}
            onClick={() => handleLevelClick("B2")}
          >
            B2
          </button>
          <button
            className={`listItemsBtn ${level === "C1" ? "selected" : ""}`}
            onClick={() => handleLevelClick("C1")}
          >
            C1
          </button>
          <button
            className={`listItemsBtn ${level === "C2" ? "selected" : ""}`}
            onClick={() => handleLevelClick("C2")}
          >
            C2
          </button>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
