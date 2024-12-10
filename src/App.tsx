import { useState } from "react";
import { ReportTable } from "./ReportTable";
import bgImg from "./assets/chameleon-bg.jpg";
import "./App.css";

const listUrl = [
  { name: "Dashboard", url: "/" },
  { name: "Special offer", url: "/special-offers" },
  { name: "Limited Time Events", url: "/limited-time-events" },
  { name: "Flash Market", url: "/flash-market" },
  { name: "Fan Voting", url: "/fan-voting" },
  { name: "Tutorial", url: "/tutorial" },
  { name: "Club Store", url: "/club-store" },
  { name: "News Post", url: "/news/post/233200" },
  { name: "Subscription", url: "/subscription" },
  { name: "Web Coin Shop", url: "/web-coin" },
  { name: "Trivia Rumble", url: "/trivia-rumble" },
  { name: "Player Profile", url: "/player/ALICE361" },
  { name: "Play Game", url: "/play-game" },
  { name: "News", url: "/news" },
  { name: "Faction Profile", url: "/faction/Woken-Warriors420" },
  { name: "Superstar Database", url: "/superstar-database" },
  { name: "Calendar", url: "/calendar" },
  { name: "Leaderboard", url: "/leaderboard" },
  { name: "Tournament", url: "/tournament" }
];

const apiKey = "AIzaSyA0eHyvXq--iCks45skeN0zwGPSNVUMTB0";
export interface Result {
  cls: string;
  fcp: string;
  tbt: string;
  lcp: string;
  totalScore: number;
}

function App() {
  const [env, setEnv] = useState("dev");
  const [mode, setMode] = useState("mobile");
  const [loadingStates, setLoadingStates] = useState([
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false },
    { loading: false }
  ]);

  const [results, setResults] = useState<
    { name: string; result: Result | null }[]
  >([
    { name: "Dashboard", result: null },
    { name: "Special offer", result: null },
    { name: "Limited Time Events", result: null },
    { name: "Flash Market", result: null },
    { name: "Fan Voting", result: null },
    { name: "Tutorial", result: null },
    { name: "Club Store", result: null },
    { name: "News Post", result: null },
    { name: "Subscription", result: null },
    { name: "Web Coin Shop", result: null },
    { name: "Trivia Rumble", result: null },
    { name: "Player Profile", result: null },
    { name: "Play Game", result: null },
    { name: "News", result: null },
    { name: "Faction Profile", result: null },
    { name: "Superstar Database", result: null },
    { name: "Calendar", result: null },
    { name: "Leaderboard", result: null },
    { name: "Tournament", result: null }
  ]);

  return (
    <>
      <div className="cardImg">
        <img src={bgImg} alt="WWE Champions" />
      </div>
      <div className="tag">Lighthouse Test</div>
      {/* <div
        style={{
          backgroundColor: "black",
          width: "fit-content"
        }}
      >
        <div className="mask1">
          <img
            src="https://www.w3schools.com/css/img_5terre.jpg"
            alt="Cinque Terre"
            width="600"
            height="400"
          ></img>
        </div>
      </div> */}
      <div className="Character">
        <img
          className="Character_shadow pixelart"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
          alt="Shadow"
        />

        <img
          className="Character_spritesheet pixelart face-right"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacter.png"
          alt="Character"
        />
      </div>
      <div>
        <label htmlFor="env-select">Select Environment: </label>
        <select
          id="env-select"
          value={env}
          onChange={(e) => setEnv(e.target.value)}
        >
          {["dev", "qa-v2", "staging"].map((envOption) => (
            <option key={envOption} value={envOption}>
              {envOption}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="env-select">Select Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          {["mobile", "desktop"].map((envOption) => (
            <option key={envOption} value={envOption}>
              {envOption}
            </option>
          ))}
        </select>
      </div>
      <ol type="1">
        {listUrl.map((item, index) => {
          const url = `https://${env}.wwechampions.com${item.url}`;
          return (
            <li
              key={index}
              style={{
                alignItems: "center",
                padding: "10px"
              }}
            >
              <a href={url}>
                {item.name} : {url}
              </a>
              {loadingStates[index].loading ? (
                <span style={{ marginLeft: "10px", color: "darkblue" }}>
                  Loading...
                </span>
              ) : (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setLoadingStates((prev) => {
                      const newLoadingStates = [...prev];
                      newLoadingStates[index].loading = true;
                      return newLoadingStates;
                    });
                    fetch(
                      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}&strategy=${mode}`
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        const { lighthouseResult } = data;
                        const cls =
                          lighthouseResult.audits["cumulative-layout-shift"];
                        const fcp =
                          lighthouseResult.audits["first-contentful-paint"];
                        const tbt =
                          lighthouseResult.audits["total-blocking-time"];
                        const lcp =
                          lighthouseResult.audits["largest-contentful-paint"];
                        const totalScore =
                          lighthouseResult.categories.performance.score * 100;
                        const result = {
                          cls: cls.displayValue,
                          fcp: fcp.displayValue,
                          tbt: tbt.displayValue,
                          lcp: lcp.displayValue,
                          totalScore
                        };

                        setResults((prev) => {
                          const newResults = [...prev];
                          newResults[index].result = result;
                          return newResults;
                        });
                      })
                      .finally(() => {
                        setLoadingStates((prev) => {
                          const newLoadingStates = [...prev];
                          newLoadingStates[index].loading = false;
                          return newLoadingStates;
                        });
                      });
                  }}
                >
                  Check
                </button>
              )}
              <br />
              {loadingStates[index].loading ? (
                <div
                  style={{
                    backgroundColor: "#D91656",
                    padding: 5,
                    borderRadius: 5,
                    width: 200
                  }}
                >
                  Calculating..
                </div>
              ) : (
                results[index]?.result && (
                  <div style={{ display: "flex", gap: 10, color: "#fff" }}>
                    <div style={{ backgroundColor: "#1A1A1D", padding: 5 }}>
                      CLS: {results[index]?.result?.cls}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#3B1C32",
                        padding: 5,
                        borderRadius: 5
                      }}
                    >
                      FCP: {results[index]?.result?.fcp}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#6A1E55",
                        padding: 5,
                        borderRadius: 5
                      }}
                    >
                      TBT: {results[index]?.result?.tbt}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#A64D79",
                        padding: 5,
                        borderRadius: 5
                      }}
                    >
                      LCP: {results[index]?.result?.lcp}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#D91656",
                        padding: 5,
                        borderRadius: 5
                      }}
                    >
                      Total Score: {results[index]?.result.totalScore}
                    </div>
                  </div>
                )
              )}
            </li>
          );
        })}
      </ol>
      <ReportTable data={results} />
    </>
  );
}

export default App;
