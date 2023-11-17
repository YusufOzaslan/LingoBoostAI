import { useContext } from "react";
import MultimediaContext from "../../context/MultimediaContext";

function DisplayText() {
  const { displayText } = useContext(MultimediaContext);

  return <input type="text" readOnly value={displayText} />;
}
// <code>{displayText}</code>
export default DisplayText;