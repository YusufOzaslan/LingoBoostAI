import React, { useContext, useEffect } from "react";
import appLogo from "../../assets/probot-svgrepo-com.svg";
import clearBtn from "../../assets/clear.png";
import msgIcon from "../../assets/message.svg";
import MessageContext from "../../context/MessageContext";

function SideBar() {
  const { setMessages, level, setLevel, topic, setTopic, setStartChat } =
    useContext(MessageContext);

  const handleTopicSelection = async (text) => {
    setTopic(text);
    setMessages([]);
    setStartChat((prevStartChat) => ({
      ...prevStartChat,
      topicSelected: true,
    }));
  };

  useEffect(() => {
    setStartChat((prevStartChat) => ({
      ...prevStartChat,
      showFooter: false,
    }));
  }, [topic]);

  const handleLevelClick = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={appLogo} alt="Logo" className="logo" />
          <span className="brand">LingoBoostAI Web App</span>
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
        <span className="brand">Choose a topic</span>
        <div className="upperSideBottom">
          <button
            className={`topic ${
              topic === "Cooking Recipe Talk" ? "selected" : ""
            }`}
            onClick={() => handleTopicSelection("Cooking Recipe Talk")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Cooking Recipe Talk
          </button>
          <button
            className={`topic ${
              topic === "Weather Discussion" ? "selected" : ""
            }`}
            onClick={() => handleTopicSelection("Weather Discussion")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Weather Discussion
          </button>
          <button
            className={`topic ${
              topic === "Hobbies" ? "selected" : ""
            }`}
            onClick={() => handleTopicSelection("Hobbies")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Hobbies
          </button>
          <button
            className={`topic ${
              topic === "Travel" ? "selected" : ""
            }`}
            onClick={() => handleTopicSelection("Travel")}
          >
            <img src={msgIcon} alt="Query" className="" />
            Travel
          </button>
        </div>
      </div>

      <div className="lowerSide">
        <span className="brand">Choose your English level</span>
        <div className="listItems">
          <button
            className={`listItemsBtn ${level === "Beginner" ? "selected" : ""}`}
            onClick={() => handleLevelClick("Beginner")}
          >
            Beginner
          </button>
        </div>
        <div className="listItems">
          <button
            className={`listItemsBtn ${
              level === "Intermediate" ? "selected" : ""
            }`}
            onClick={() => handleLevelClick("Intermediate")}
          >
            Intermediate
          </button>
        </div>
        <div className="listItems">
          <button
            className={`listItemsBtn ${level === "Advanced" ? "selected" : ""}`}
            onClick={() => handleLevelClick("Advanced")}
          >
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
