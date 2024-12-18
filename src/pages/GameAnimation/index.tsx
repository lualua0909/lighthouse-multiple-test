import { useState, CSSProperties } from "react";
import "./index.css";

export interface MyCustomCSS extends CSSProperties {
  "--dataX": number;
  "--dataY": number;
}

const INIT_POSITION = -500;
const STEP_PX = 30;

function GameAnimation() {
  const [characterDirection, setCharacterDirection] = useState("face-right");
  const [positionX, setPositionX] = useState(INIT_POSITION);
  const [positionXDes, setPositionXDes] = useState(INIT_POSITION + STEP_PX);

  let counter: number | undefined;

  function startGoto() {
    setCharacterDirection("face-left");
    const oldPos = positionXDes;
    setPositionX(oldPos);
    setPositionXDes(oldPos - STEP_PX);
  }
  function endGoto() {
    clearInterval(counter);
  }

  return (
    <>
      <div
        id="animatedBackground"
        style={{
          position: "relative",
          width: "100vw",
          height: 250
        }}
      >
        <div
          id="Character"
          className={`Character`}
          style={
            {
              "--dataX": positionX,
              "--dataY": positionXDes
            } as MyCustomCSS
          }
        >
          <img
            className="Character_shadow pixelart"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
            alt="Shadow"
          />

          <img
            className={`Character_spritesheet absolute pixelart ${characterDirection}`}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png"
            alt="Character"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 10
        }}
      >
        <button
          className={`${
            characterDirection === "face-left" ? "button-active" : ""
          }`}
          onMouseDown={startGoto}
          onMouseUp={endGoto}
          onClick={startGoto}
        >
          Left
        </button>
        <button
          className={`${
            characterDirection === "face-right" ? "button-active" : ""
          }`}
          onClick={() => {
            setCharacterDirection("face-right");
            const oldPos = positionXDes;
            setPositionX(oldPos);
            setPositionXDes(oldPos + STEP_PX);
          }}
        >
          Right
        </button>
        <button
          className={`${
            characterDirection === "face-up" ? "button-active" : ""
          }`}
          onClick={() => {
            setCharacterDirection("face-up");
          }}
        >
          Up
        </button>
        <button
          className={`${characterDirection === "" ? "button-active" : ""}`}
          onClick={() => {
            setCharacterDirection("");
          }}
        >
          Down
        </button>
      </div>
    </>
  );
}

export default GameAnimation;
