"use client";

import React, { useState, useEffect } from "react";
import VideoComponent from "https://framer.com/m/Video-Component-0Gti.js@rgRu2j7Rdo4wHbNub7OE";
import CardSwap, { Card } from "../CardSwap";
import { motion } from "framer-motion";

export function Projects() {
  const [typedText, setTypedText] = useState("");
  const fullCommand = "./execute_projects.sh";
  
  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullCommand.substring(0, i + 1));
      i++;
      if (i >= fullCommand.length) {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const projects = [
    { name: "CampusOS", video: "https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" },
    { name: "SentinelX", video: "https://framerusercontent.com/assets/271QwsjeO0NMQpKWyYKrJkeWU.mp4" },
    { name: "LectureLens", video: "https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4" },
    { name: "Aaroha", video: "https://framerusercontent.com/assets/271QwsjeO0NMQpKWyYKrJkeWU.mp4" },
  ];

  return (
    <div style={{ padding: "40px 8%", width: "100%", height: "100%", position: "relative", overflow: "hidden", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#050505" }}>
      <div style={{ flex: 1, maxWidth: "500px", paddingRight: "40px", display: "flex", flexDirection: "column" }}>
        
        {/* Terminal Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f" }}></div>
          <div style={{ marginLeft: "15px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>bash - 80x24</div>
        </div>

        {/* Terminal Prompt */}
        <div style={{ color: "#27c93f", fontSize: "1.05rem", marginBottom: "20px", fontFamily: "monospace", textShadow: "0 0 5px rgba(39, 201, 63, 0.4)" }}>
          <span style={{ color: "#F0EBE1" }}>csi-admin@mku</span>:<span style={{ color: "#3b82f6" }}>~/projects</span>$ {typedText}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>_</motion.span>
        </div>
        
        {typedText === fullCommand && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h1 style={{ fontSize: "5rem", color: "#F0EBE1", fontWeight: "bold", margin: 0, lineHeight: 1.1, fontFamily: "var(--font-anton), sans-serif", letterSpacing: "2px", textTransform: "uppercase" }}>Our<br />Projects</h1>
            <p style={{ color: "rgba(240, 235, 225, 0.7)", fontSize: "1.1rem", marginTop: "1.5rem", fontFamily: "var(--font-inter), sans-serif", lineHeight: 1.6 }}>
              Discover the innovative tools and platforms built by our community to elevate the technical landscape.
            </p>
            <div style={{ marginTop: "30px", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", fontFamily: "monospace" }}>
               &gt; Initialization complete. Fetching modules...
            </div>
          </motion.div>
        )}
      </div>
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 0.8 }}>
        <CardSwap
          width={380}
          height={450}
          cardDistance={40}
          verticalDistance={50}
          delay={4000}
          pauseOnHover={true}
        >
          {projects.map((p, i) => (
            <Card key={i} style={{ padding: 0, overflow: 'hidden', border: 'none', background: 'transparent' }}>
              <VideoComponent 
                name1={p.name} 
                uRL={p.video}
                source="URL"
                style={{ width: "100%", height: "100%" }} 
              />
            </Card>
          ))}
        </CardSwap>
      </motion.div>
    </div>
  );
}
