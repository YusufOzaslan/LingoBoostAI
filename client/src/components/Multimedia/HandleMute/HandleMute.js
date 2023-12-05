import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import MultimediaContext from "../../../context/MultimediaContext";

function HandleMute() {
  const { updatePlayer } = useContext(MultimediaContext);
  async function _handleMute() {
    updatePlayer((p) => {
      if (!p.muted) {
        p.p.pause();
        return { p: p.p, muted: true };
      } else {
        p.p.resume();
        return { p: p.p, muted: false };
      }
    });
  }
  return (
    <div>
      {" "}
      <FontAwesomeIcon
        icon={faVolumeMute}
        className="fas fa-volume-mute fa-lg mr-2"
        onClick={() => _handleMute()}
      />
    </div>
  );
}

export default HandleMute;
