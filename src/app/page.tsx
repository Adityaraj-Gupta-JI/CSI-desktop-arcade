"use client";

import React, { useState } from "react";
import DesktopWindow from "@/components/DesktopWindow";
import { AboutUs, Departments, Events, Projects, Team, Contact, CsiOfficial } from "@/components/sections";
import MacDock from "@/components/MacDock";
import GolemEyes from "@/components/GolemEyes";
import Launchpad from "@/components/Launchpad";
import LoadingScreen from "@/components/LoadingScreen";
import RobotFollower from "@/components/RobotFollower";
import EnhancedCyberCity from "@/components/EnhancedCyberCity";
import MatrixRain from "@/components/MatrixRain";
import TechBackground from "@/components/TechBackground";
import ImprovedMatrixTransition from "@/components/ImprovedMatrixTransition";

type WindowId = "about" | "depts" | "events" | "projects" | "team" | "contact" | "csi";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<WindowId[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Matrix Block Flow Transition States
  const [isMatrixTransitioning, setIsMatrixTransitioning] = useState(false);
  const [pendingWindowId, setPendingWindowId] = useState<WindowId | null>(null);

  const toggleWindow = (id: string) => {
    if (id === "more") {
      setIsLaunchpadOpen(!isLaunchpadOpen);
      return;
    }

    if (isMatrixTransitioning) return;

    const winId = id as WindowId;

    if (openWindows.includes(winId)) {
      if (activeWindow === winId) {
        setOpenWindows(openWindows.filter((w) => w !== winId));
        setActiveWindow(openWindows.length > 1 ? openWindows[0] : null);
      } else {
        setActiveWindow(winId);
      }
    } else {
      setPendingWindowId(winId);
      setIsMatrixTransitioning(true);
    }
  };

  const handleMatrixTransitionComplete = () => {
    setIsMatrixTransitioning(false);
    if (pendingWindowId) {
      setOpenWindows((prev) => {
        if (prev.includes(pendingWindowId)) return prev;
        return [...prev, pendingWindowId];
      });
      setActiveWindow(pendingWindowId);
      setPendingWindowId(null);
    }
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows(openWindows.filter((w) => w !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows.length > 1 ? openWindows[0] : null);
    }
  };

  const getWindowTitle = (id: WindowId) => {
    const titles: Record<WindowId, string> = {
      about: "About Us",
      depts: "Departments",
      events: "Events",
      projects: "Projects",
      team: "Team",
      contact: "Contact",
      csi: "CSI Official Website",
    };
    return titles[id];
  };

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case "about": return <AboutUs />;
      case "depts": return <Departments />;
      case "events": return <Events />;
      case "projects": return <Projects />;
      case "team": return <Team />;
      case "contact": return <Contact />;
      case "csi": return <CsiOfficial />;
      default: return null;
    }
  };

  const dockItems = [
    { id: "about", label: "About Us", iconSrc: "/icons/Finder.png" },
    { id: "depts", label: "Departments", iconSrc: "/icons/Safari.png" },
    { id: "events", label: "Events", iconSrc: "/icons/Calendar.png" },
    { id: "projects", label: "Projects", iconSrc: "/icons/Terminal.png" },
    { id: "team", label: "Team", iconSrc: "/icons/Notion.png" },
    { id: "contact", label: "Contact", iconSrc: "/icons/Mail.png" },
    { id: "csi", label: "CSI Official", iconSrc: "/icons/CSI.png" },
  ];

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden select-none"
    >
      {/* Loading Sequence */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Layer 1: Tech Background - Grid, particles, hex nodes */}
      <TechBackground />

      {/* Layer 2: Matrix Rain - Falling characters with ASCII figure */}
      <MatrixRain opacity={0.12} />

      {/* Layer 3: Interactive Robot Companion */}
      <RobotFollower size={44} />

      {/* Layer 4: Matrix Block Flow Transition Overlay */}
      {isMatrixTransitioning && (
        <ImprovedMatrixTransition 
          onComplete={handleMatrixTransitionComplete} 
          duration={1200}
        />
      )}

      {/* Layer 5: ASCII Cyberpunk City Background */}
      <EnhancedCyberCity />

      {/* Layer 6: Ancient Forest Guardian Golem */}
      <GolemEyes />

      {/* Layer 7: Window Management */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {openWindows.map((id, index) => (
          <div key={id} className="pointer-events-auto">
            <DesktopWindow
              id={id}
              title={getWindowTitle(id)}
              isActive={activeWindow === id}
              onFocus={() => setActiveWindow(id)}
              onClose={() => closeWindow(id)}
              defaultPosition={{ x: 120 + index * 40, y: 120 + index * 40 }}
            >
              {renderWindowContent(id)}
            </DesktopWindow>
          </div>
        ))}
      </div>

      {/* Layer 8: Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#02100d]/90 border border-emerald-400/40 rounded-3xl p-1.5 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.25)]">
        <MacDock 
          onOpen={toggleWindow} 
        />
      </div>

      {/* Layer 9: Launchpad */}
      {isLaunchpadOpen && (
        <div className="absolute inset-0 z-[100] pointer-events-auto">
          <Launchpad 
            isOpen={isLaunchpadOpen}
            onClose={() => setIsLaunchpadOpen(false)} 
            onOpenApp={(id) => {
              toggleWindow(id);
              setIsLaunchpadOpen(false);
            }}
            items={dockItems}
          />
        </div>
      )}
    </main>
  );
}