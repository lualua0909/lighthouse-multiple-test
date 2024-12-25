import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import "./global.css";
import Render3D from "./pages/Render3D";
import GameAnimation from "./pages/GameAnimation";
import BackgroundCurve from "./pages/BackgroundCurve";
import { NavBar } from "./components/nav-bar";
import Acernity from "./pages/Acernity";
import ParallaxPage from "./pages/Parallax";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route index element={<App />} />
          <Route path="render-3d" element={<Render3D />} />
          <Route path="game-animation" element={<GameAnimation />} />
          <Route path="bg-curve" element={<BackgroundCurve />} />
          <Route path="acernity" element={<Acernity />} />
          <Route path="parallax" element={<ParallaxPage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
