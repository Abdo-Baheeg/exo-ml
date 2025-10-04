import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#0c1a2f] text-white">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}