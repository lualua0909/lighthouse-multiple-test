import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import './global.css'
import Render3D from "./pages/Render3D/index.tsx";
import GameAnimation from "./pages/GameAnimation/index.tsx";
import BackgroundCurve from "./pages/BackgroundCurve/index.tsx";
import { NavBar } from "./components/nav-bar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route index element={<App />} />
          <Route path="render-3d" element={<Render3D />} />
          <Route path="game-animation" element={<GameAnimation />} />
          <Route path="bg-curve" element={<BackgroundCurve />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
