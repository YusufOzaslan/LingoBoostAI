import React, { useContext } from "react";
import rocket from "../../assets/rocket.svg";
import home from "../../assets/home.svg";
import appLogo from "../../assets/probot-svgrepo-com.svg";
import addBtn from "../../assets/add-30.png";
import msgIcon from "../../assets/message.svg";
import saved from "../../assets/bookmark.svg";
import MessageContext from "../../context/MessageContext";
import { sendMsgToOpenAI } from "../../utils/openai";

function SideBar() {
  const { messages, setMessages, input} = useContext(MessageContext);

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSideTop">
          <img src={appLogo} alt="Logo" className="logo" />
          <span className="brand">Speech sample app</span>
        </div>
        <button
          className="midBtn"
          onClick={() => {
            window.location.reload();
          }}
        >
          <img src={addBtn} alt="new chat" className="addBtn" />
          New Chat
        </button>
        <div className="upperSideBottom">
          <button className="query" onClick={handleQuery} value={"Category 1"}>
            <img src={msgIcon} alt="Query" className="" />
            Category 1
          </button>
          <button className="query" onClick={handleQuery} value={"Category 2"}>
            <img src={msgIcon} alt="Query" className="" />
            Category 2
          </button>
        </div>
      </div>
          {/* 
      <div className="lowerSide">
        <div className="listItems">
          {" "}
          <img src={home} alt="Home" className="listItemsImg" />
          Home
        </div>
        <div className="listItems">
          {" "}
          <img src={saved} alt="Saved" className="listItemsImg" />
          Saved
        </div>
        <div className="listItems">
          {" "}
          <img src={rocket} alt="Upgrade" className="listItemsImg" />
          Test
        </div>
      </div>
       */}
    </div>
  );
}
export default SideBar;
