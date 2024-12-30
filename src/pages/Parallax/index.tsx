import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "./style.module.css";
import imgBg from "../../assets/header-chat-2.png";

export default function ParallaxPage() {
  const alignCenter = { display: "flex", alignItems: "center" };
  return (
    <div className="overflow-hidden">
      <div className={styles.background} />

      <Parallax pages={5} className="overflow-hidden">
        <ParallaxLayer
          offset={0}
          speed={1}
          style={{
            ...alignCenter,
            justifyContent: "center",
            borderBottom: "1px solid white"
          }}
        >
          <img
            src={imgBg}
            alt="arrow"
            className="w-screen h-[300px] absolute bottom-[60px]"
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{
            ...alignCenter,
            justifyContent: "center",
            zIndex: -1
            // backgroundColor: "white"
          }}
        >
          <span className="font-bold text-5xl absolute z-0">Scroll down</span>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1, end: 3 }}
          style={{ ...alignCenter, justifyContent: "flex-start" }}
        >
          <div className={`${styles.card} ${styles.sticky}`}>
            <p>I'm a sticky layer</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.5}
          speed={1.5}
          style={{ ...alignCenter, justifyContent: "flex-end" }}
        >
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>I'm not</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={1.5}
          style={{ ...alignCenter, justifyContent: "flex-end" }}
        >
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
            <p>Neither am I</p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
