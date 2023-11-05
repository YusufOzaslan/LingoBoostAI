import { useContext } from "react";
import MultimediaContext from "../../context/MultimediaContext";

function DisplayText() {
  const { displayText } = useContext(MultimediaContext);

  return (
    <div className="col-6 output-display rounded">
      <code>{displayText}</code>
    </div>
  );
}

export default DisplayText;
