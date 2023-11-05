import { useContext } from "react";
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
    <div className="mt-2">
      <i
        className="fas fa-volume-mute fa-lg mr-2"
        onClick={() => _handleMute()}
      ></i>
      Pause/resume text to speech output.
    </div>
  );
}

export default HandleMute;
