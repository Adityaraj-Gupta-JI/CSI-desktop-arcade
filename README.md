<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<div align="center">

[![System Status][status-shield]][status-url]
[![Core Engine][next-shield]][next-url]
[![Runtime Logic][ts-shield]][ts-url]
[![Open Protocol][os-shield]][os-url]
[![Pull Requests][pr-shield]][pr-url]


</div>

---

<!-- PROJECT LOGO & HEADER -->
<br />
<div align="center">
  <h1 align="center">🖥️ CSI Technical Desktop Ledge</h1>

  <p align="center">
    An immersive, gamified macOS-inspired retro-futuristic web terminal and arcade ecosystem engineered for the <strong>Computer Society of India — VIT Chennai Student Chapter</strong>.
    <br />
    <br />
    <a href="https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade"><strong>📖 Explore the Docs »</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade/issues/new?labels=bug">🐛 Report Bug</a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade/issues/new?labels=enhancement">✨ Request Feature</a>
  </p>
</div>

---

<!-- DEMO VIDEO -->
## 🎬 Live System Demonstration

> **▶ Full Walkthrough Video**

<div align="center">
  <video src="assets/demo_video.mp4" width="100%" controls muted></video>
</div>

---

<!-- INTERFACE PREVIEWS -->
## 🖼️ Interface Previews

<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <strong>1. Cyber-Matrix Canvas Engine</strong><br />
        <img src="assets/background.png" alt="Matrix Background and ASCII Human Silhouette" width="100%" />
        <br /><em>Active cursor evasion with spatial neon color transitions.</em>
      </td>
      <td width="50%" align="center">
        <strong>2. Core UI Task Management & Dock</strong><br />
        <img src="assets/About_floating.png" alt="Desktop Windows and MacDock Interface" width="100%" />
        <br /><em>Fully independent sub-windows with deep context staging and focusing rules.</em>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <strong>3. Boot Loader Sequence</strong><br />
        <img src="assets/booting_page.png" alt="ASCII Terminal Initialization Screen" width="100%" />
        <br /><em>Authentic terminal logging with optimized hardware-accurate timers.</em>
      </td>
      <td width="50%" align="center">
        <strong>4. Matrix Phantom Transition</strong><br />
        <img src="assets/animation.png" alt="ASCII Robot and Drone City Grid" width="100%" />
        <br /><em>Dynamic multi-color triangle overlays morphing into an digital construct.</em>
      </td>
    </tr>
  </table>
</div>

> **📁 Note:** Replace the `assets/` paths above with your actual screenshot files once uploaded to the repository.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>📋 Table of Contents</summary>
  <ol>
    <li><a href="#philosophy">💡 Core Philosophy & Ideation</a></li>
    <li><a href="#tech-stack">🛠️ Technical Stack</a></li>
    <li><a href="#repo-structure">📁 Repository Structure</a></li>
    <li>
      <a href="#getting-started">🚀 Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation & Execution</a></li>
      </ul>
    </li>
    <li><a href="#usage">🎈 Usage</a></li>
    <li><a href="#contributing">🤝 Contributing</a></li>
    <li><a href="#license">📝 License</a></li>
    <li><a href="#contact">👤 Contact</a></li>
    <li><a href="#acknowledgments">🎉 Acknowledgments</a></li>
  </ol>
</details>

---

<!-- CORE PHILOSOPHY -->
## 💡 Core Philosophy & Ideation Behind the Pivot <a name="philosophy"></a>

This is not just another flat structural landing template. The vision for this project evolved through intense exploration of **retro-arcade game loop mechanics**, **cybersecurity terminal interfaces**, and the **demystified layout of standard operating systems**.

Instead of forcing users through predictable scrolling tiers, this architecture builds a **desktop runtime atmosphere** — swapping native organic nature-themed assets for a sharp, high-performance **cyberpunk digital grid runtime system**.

### Key Conceptual Inspirations

| Concept | Implementation |
|---|---|
| 🤖 **Gamified Spatial Tracking** | Replaced baseline cursor animations with an optimized, lightweight SVG **Robot Companion Engine** using proximity vectors for active hover interaction |
| 💻 **Cybersecurity Terminal Aesthetics** | Integrated real-time booting screens with faux initialization checks, diagnostic sequences, and scrolling alphanumeric logs |
| 🌧️ **Immersive Matrix Pipelines** | Interactive HTML5 Canvas layers where streaming rain paths dynamically warp, scatter, and evade mouse position while casting electric-cyan outlines over a static ASCII human silhouette |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- TECH STACK -->
## 🛠️ Deep Technical Stack Specification <a name="tech-stack"></a>

The core runtime uses specialized front-end framework logic explicitly configured to prevent render-loop thrashing and maintain a strict **60 FPS processing threshold**:

| Layer | Technology | Role |
|---|---|---|
| ⚙️ **Core Engine Architecture** | `Next.js` (App Router) + `React 19` | Layout optimization and server-side rendering |
| 🎞️ **Hardware-Accelerated Animations** | `Framer Motion` + `GSAP (GreenSock)` | Complex matrix transforms exclusively over GPU-bound properties (`transform`, `opacity`) |
| 🧵 **Asynchronous Rendering** | `requestAnimationFrame` API | Migrated from basic intervals to low-latency browser rendering |
| 📐 **Global Layout Control** | `TypeScript` | Custom structural types for explicit state tracking (`WindowId`) |

[![Next.js][Next-badge]][Next-url]
[![React][React-badge]][React-url]
[![TypeScript][TS-badge]][TS-url]
[![GSAP][GSAP-badge]][GSAP-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- REPO STRUCTURE -->
## 📁 Repository Structure and Module Mappings <a name="repo-structure"></a>

```
CSI-desktop-arcade/
├── next.lock/                             # Cached dependency registries (.gitignored)
├── public/                                # Static branding structures and asset files
└── src/
    ├── app/
    │   ├── favicon.ico                    # Base system tab icon
    │   ├── globals.css                    # Global CSS variables, themes, and keyframe definitions
    │   ├── layout.tsx                     # Root wrapper injection tracking font layouts
    │   ├── page.module.css                # Component-level styling for the main page
    │   └── page.tsx                       # Main entry point orchestrating structural layers
    ├── components/
    │   ├── sections/                      # Autonomous data modules inside desktop layers
    │   │   ├── AboutUs.tsx
    │   │   ├── Contact.tsx
    │   │   ├── CsiOfficial.tsx
    │   │   ├── Departments.tsx
    │   │   ├── Events.tsx
    │   │   ├── index.ts                   # Export barrel for section components
    │   │   ├── Projects.tsx
    │   │   └── Team.tsx
    │   ├── BirdFollower.tsx               # Legacy bird cursor tracker
    │   ├── CardSwap.css
    │   ├── CardSwap.tsx
    │   ├── CursorEyes.tsx
    │   ├── DesktopWindow.tsx              # Draggable, isolatable sub-window wrappers
    │   ├── EnhancedCyberCity.tsx          # Complex multi-tier ASCII environment
    │   ├── ForestBackground.tsx           # Legacy forest environment layer
    │   ├── GolemEyes.tsx                  # Legacy guardian tracking component
    │   ├── GridScan.css
    │   ├── GridScan.tsx
    │   ├── ImprovedMatrixTransition.tsx   # Diagonal 4-phase cross-section transition system
    │   ├── Launchpad.tsx                  # Full-screen grid view overlay system
    │   ├── LiquidBackground.tsx
    │   ├── LoadingScreen.tsx              # Boot loader sequence and terminal logic
    │   ├── MacDock.tsx                    # Floating desktop platform managing application states
    │   ├── MatrixRain.tsx                 # Canvas matrix rain engine with cursor evasion
    │   ├── MightyEagleStrike.tsx          # Legacy cinematic overlay
    │   ├── RobotFollower.tsx              # Low-overhead SVG mouse follower matching user velocity
    │   └── TechBackground.tsx             # Tech hub structural background wrapper
    ├── framer-stub.ts
    └── framer.d.ts                        # Framer Motion TypeScript declarations
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- GETTING STARTED -->
## 🚀 Setting Up the Local Workspace <a name="getting-started"></a>

Follow these exact operational terminal instructions to spin up the local development engine.

### Prerequisites <a name="prerequisites"></a>

Ensure your local environment runs **Node LTS (v18.0.0 or higher recommended)**.

```sh
node --version   # Should output v18.x.x or higher
npm --version
```

### Installation & Execution <a name="installation"></a>

**1.** Clone your custom fork repository onto your local development workspace:

```sh
git clone https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade.git
```

**2.** Step inside the root directory where the configuration files live:

```sh
cd CSI-desktop-arcade
```

**3.** Install the required structural project dependencies:

```sh
npm install
```

**4.** Boot up your high-performance development server:

```sh
npm run dev
```

**5.** Launch your browser and navigate to the local hosting terminal link to verify compilation:

```
http://localhost:3000
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- USAGE -->
## 🎈 Usage <a name="usage"></a>

Once the development server is running at `http://localhost:3000`, you will be greeted by the **boot loader sequence** — an authentic terminal initialization screen that transitions into the full cyberpunk desktop environment.

From there, you can interact with:

- The **MacDock** at the bottom to switch between desktop applications
- **Draggable sub-windows** for each section (About, Projects, Events, Team, Departments, Contact)
- The **Matrix Canvas Background** — move your mouse across the screen to trigger cursor evasion animations
- The **Robot Companion** SVG follower — the robot tracks your cursor using proximity velocity vectors
- The **Launchpad** overlay for a full-screen grid view of all applications


<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTRIBUTING -->
## 🤝 Contribution Guidelines and Core Architecture Pipelines <a name="contributing"></a>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag `enhancement`. Don't forget to give the project a ⭐!

**1.** Fork the Repository.

**2.** Create your isolated feature branch:

```sh
git checkout -b feature/CyberArcadeUpgrade
```

**3.** Commit your optimized changes with a descriptive message:

```sh
git commit -m 'feat: introduce high-density particle matrix grids'
```

**4.** Push to your cloud repository branch:

```sh
git push origin feature/CyberArcadeUpgrade
```

**5.** Open a formal Pull Request detailing your specific performance gains.

### Top Contributors

<a href="https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Adityaraj-Gupta-JI/CSI-desktop-arcade" alt="Contributors" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- LICENSE -->
## 📝 Project Status, Licensing, and Legal Protections <a name="license"></a>

This project is released as **Open Source Software**. It is completely free to explore, fork, modify, re-distribute, and integrate into your own projects or educational setups without any commercial, proprietary, or formal licensing restrictions. We believe in open technical collaboration and sharing knowledge across developer communities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- CONTACT -->
## 👤 Developer Profile & System Maintainer Metadata <a name="contact"></a>

For questions, architectural consults, or feature scaling discussions, feel free to reach out across the provided networks:

| Field | Details |
|---|---|
| 🧑‍💻 **Primary Maintainer** | ADITYARAJ GUPTA |
| 🏫 **Institution** | Computer Society of India — VIT Chennai Student Chapter |
| 📧 **Email** | [adityaraj.gupta2025@vitstudent.ac.in](mailto:adityaraj.gupta2025@vitstudent.ac.in) |
| 🐙 **GitHub** | [Adityaraj-Gupta-JI](https://github.com/Adityaraj-Gupta-JI/) |

**Project Repository:** [https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade](https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## 🎉 Acknowledgments <a name="acknowledgments"></a>

- [Next.js Documentation](https://nextjs.org/docs) — App Router and SSR optimization
- [Framer Motion](https://www.framer.com/motion/) — Declarative animation engine
- [GreenSock (GSAP)](https://gsap.com/) — High-performance JavaScript animation
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19) — Concurrent features and transitions
- [Img Shields](https://shields.io) — README badge generation
- [contrib.rocks](https://contrib.rocks) — Contributor avatar grid generation
- [Choose an Open Source License](https://choosealicense.com) — License selection guidance
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) — Structural README inspiration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & BADGES -->
[status-shield]: https://img.shields.io/badge/System_Status-Online-00FF66?style=for-the-badge&logo=vercel&logoColor=black
[status-url]: https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade

[next-shield]: https://img.shields.io/badge/Core_Engine-Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white
[next-url]: https://nextjs.org/

[ts-shield]: https://img.shields.io/badge/Runtime-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[ts-url]: https://www.typescriptlang.org/

[os-shield]: https://img.shields.io/badge/Protocol-Open_Access-00F2FE?style=for-the-badge&logo=open-source-initiative&logoColor=black
[os-url]: https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade

[pr-shield]: https://img.shields.io/badge/Contributions-Player_2_Ready-FF007F?style=for-the-badge&logo=github&logoColor=white
[pr-url]: https://github.com/Adityaraj-Gupta-JI/CSI-desktop-arcade/pulls



[Next-badge]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-badge]: https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TS-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[GSAP-badge]: https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black
[GSAP-url]: https://gsap.com/