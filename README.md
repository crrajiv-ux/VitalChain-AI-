<div align="center">
  
<img src="https://capsule-render.vercel.app/api?type=waving&color=0f2d56,1d4ed8,0ea5e9&height=200&section=header&text=VitalChain%20AI&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Protecting%20Life-Saving%20Medicines%20with%20AI%20and%20Blockchain&descAlignY=58&descSize=17&animation=fadeIn" width="100%"/>

<br/>

![Status](https://img.shields.io/badge/Status-Hackathon%20Build-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Blockchain](https://img.shields.io/badge/Blockchain-Simulated%20Ledger-F59E0B?style=for-the-badge&logo=ethereum&logoColor=white)
![AI](https://img.shields.io/badge/AI-Predictive%20Risk-EF4444?style=for-the-badge&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)
![Team](https://img.shields.io/badge/Team-Byte--X--ploit-0f2d56?style=for-the-badge&logo=github&logoColor=white)

<br/><br/>

> ### 🧬 *"Every degree matters. Every second counts. Every dose deserves a chain of trust."*

<br/>

VitalChain AI is a real-time pharmaceutical cold chain monitoring platform that fuses **IoT simulation**, **AI-driven risk prediction**, and a **tamper-proof blockchain ledger** to ensure life-saving vaccines and medicines remain safe from warehouse to patient — every single kilometre of the journey.

<br/>

[🚀 View Live Demo](#-installation--quick-start) &nbsp;·&nbsp; [📖 Read the Docs](#-system-architecture) &nbsp;·&nbsp; Meet the Team](#-team--byte-x-ploit)

<br/>

</div>

---

## 📌 Table of Contents

- [🚨 The Problem](#-the-problem--the-35-billion-cold-chain-crisis)
- [💡 Our Solution](#-our-solution)
- [✨ Core Features](#-core-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Installation & Quick Start](#-installation--quick-start)
- [🔌 API Reference](#-api-reference)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [👥 Team — Byte-X-ploit](#-team--byte-x-ploit)
- [📄 License](#-license)

---

## 🚨 The Problem — The $35 Billion Cold Chain Crisis

<div align="center">

| Stat | Reality |
|:----:|:-------:|
| 💊 **25%** | of vaccines arrive damaged due to cold chain failures |
| 💸 **$35 Billion** | lost annually worldwide from spoiled pharmaceutical products |
| 🌡️ **1 in 3** | shipments experience at least one temperature excursion |
| 🏥 **1.5 Million** | children die each year from vaccine-preventable diseases, partly due to supply chain failures |

</div>

<br/>

Pharmaceutical cold chains — the temperature-controlled logistics network that keeps vaccines, insulin, blood plasma, and biologics safe — are **silently failing** across the globe. The core reasons are systemic:

### ❌ Why Current Systems Fail

- **⚡ Reactive, Not Predictive** — Traditional systems only flag a problem *after* a medicine has already been compromised. There is no forward-looking AI to anticipate a temperature breach before it happens. By the time the alarm sounds, thousands of doses are already destroyed.

- **📋 Manual & Error-Prone** — Logistics teams still rely on paper logs, clipboard checklists, and periodic manual temperature readings. Human error, delayed reporting, and forgotten checks create dangerous gaps in the data record.

- **🔓 Tamperable & Untrustworthy** — Digital records stored in traditional centralised databases can be edited, deleted, or back-dated. There is no cryptographic proof that a reading is genuine. In audits, recalls, or legal disputes, this lack of data integrity is catastrophic.

- **🌑 Zero Real-Time Visibility** — Shipments travel in a "black box". Dispatchers, hospital staff, and quality control teams have no live window into what is happening to a consignment on a truck between Delhi and Noida. They are flying blind.

- **📵 No Unified Dashboard** — Data lives in fragmented silos — one system for temperature, another for logistics, another for inventory. No single platform connects them all into an actionable, real-time picture.

> **VitalChain AI was built to solve all five of these failures simultaneously.**

---

## 💡 Our Solution

VitalChain AI is a **unified cold chain command centre** that:

1. 🌡️ **Simulates real IoT sensor telemetry** — streaming live temperature and humidity data every 5 seconds, mirroring what a physical sensor network would produce
2. 🤖 **Applies a predictive AI risk engine** — automatically classifying each shipment as `Safe` or `At Risk` based on temperature thresholds, with spike detection for stress-testing
3. 🔗 **Writes every reading to an immutable ledger** — generating a SHA-256-style cryptographic hash for each data point, ensuring tamper-proof auditability
4. 🗺️ **Tracks live vehicle position** — an animated SVG map shows the truck's real-time journey across the NH-24 Delhi–Noida corridor
5. 📊 **Presents everything in one premium dashboard** — with trend analytics, full audit history, shipment search, and verification modals

---

## ✨ Core Features

### 🌡️ 1. Real-Time Environmental Monitoring
> *Know your cold chain's vitals the moment something changes.*

- Sensor data (temperature + humidity) is streamed live from the Express.js backend every **5 seconds**
- **Temperature** is dynamically generated between `2.0°C – 8.0°C` (the WHO-mandated cold chain window), with a **10% chance of a spike to 12.0°C** to simulate real-world excursions
- **Humidity** varies naturally between `40% – 60% RH`
- Animated progress bars visually encode current values so anomalies are spotted instantly
- The temperature card **pulses and turns red** when a breach is detected — no ambiguity, instant visual alarm

---

### 🤖 2. AI-Powered Predictive Risk Engine
> *Don't wait for disaster. Predict it.*

- The risk classification is **derived algorithmically from sensor data**, not randomly assigned
- Rule: `temperature > 8.0°C → risk = "High"`, `temperature ≤ 8.0°C → risk = "Low"`
- The **AI Spoilage Risk card** dynamically switches between emerald green (Safe) and alarm red (At Risk), with a live pinging dot indicator
- When `High` risk is detected, an alert is dispatched to the logistics team and the sidebar mini-card updates instantly
- The spike mechanism (`10% probability → 12.0°C`) stress-tests the entire alert pipeline on every fetch cycle

---

### 🔗 3. Immutable Blockchain Ledger Verification
> *Every reading. Cryptographically sealed. Forever.*

- Every API response includes a **40-character hexadecimal hash** (`0x...`) simulating a SHA-256 blockchain transaction ID
- Each shipment record in the table carries this hash, displayed in a truncated form with the full value revealed on hover
- The **"Verify Ledger"** button opens a two-step modal:
  - **Step 1 (1.5 seconds):** Animated spinner with "Connecting to VitalChain Ledger…" text and live node indicators (Geneva · Singapore · Ohio)
  - **Step 2 (Success):** Full verification card showing Product, Timestamp, Cryptographic Hash, Status (`Immutable`), Consensus Protocol (`BFT`), and Ledger Node
- Simulates the experience of querying a real distributed ledger like **Hyperledger Fabric** or **Ethereum**

---

### 🗺️ 4. Live Animated Transit Map
> *Your shipment, live — kilometre by kilometre.*

- A fully custom **SVG-rendered animated map** simulates a medical truck travelling the **NH-24 corridor from Delhi (Safdarjung Depot) to Noida (DTC Campus, Sector 62)**
- The road fills with a blue progress overlay as the truck advances
- The truck icon carries a **medical cross**, and turns green on arrival
- A **"Delivered ✓"** badge appears on destination arrival; the loop then resets automatically
- An En Route / Delivered status badge in the header updates in real time

---

### 📍 5. Shipment Search & Vertical Timeline
> *Full journey transparency. From depot to delivery.*

- Search any shipment by its **VitalChain ID** (format: `VC-XXXX`) using the integrated search bar
- Returns an animated **3-step vertical timeline**:
  - 📦 `Picked Up` — Safdarjung Depot, Delhi
  - 🚛 `In Transit` — NH-24, Noida Expressway
  - ✅ `Delivered` — DTC Campus, Sector 62
- Each step renders with a status badge (`Completed`, `In Progress`, `Pending`), colour-coded icons, and timestamps
- Timeline animates in with staggered slide-in transitions powered by **Framer Motion**

---

### 📊 6. Analytics, History & Settings Panels
> *Insight beyond the moment.*

- **Analytics View:** Live bar chart of the last 12 shipments' temperatures with an orange 8°C threshold line. Summary KPIs: Avg Temperature, Avg Humidity, High Risk Events, On-time Delivery %
- **History View:** Full scrollable audit table of all recorded shipments — ID, Product, Timestamp, Temperature, Humidity, Hash, and Risk — the complete blockchain-style paper trail
- **Settings View:** System configuration display — Refresh Interval, Alert Threshold, Blockchain Network, Notification Email

---

### 🔄 7. Intelligent Offline Fallback
> *The dashboard never goes dark.*

- If the Express backend is unreachable, the frontend **automatically falls back to a mock data generator**
- Mock temperature drifts realistically between `1.5°C – 9.5°C` using a randomised walk algorithm, with the same `8%` spike probability
- An **amber notification banner** informs the user the backend is offline and shows the command to restart it
- When the backend comes back online, the dashboard silently switches back to real data — **zero user action required**

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    VITALCHAIN AI — DATA FLOW                    │
└─────────────────────────────────────────────────────────────────┘

  LAYER 1: DATA ORIGIN
  ┌─────────────────────────────────────────────┐
  │           IoT Sensor Simulation             │
  │  ┌──────────────┐   ┌──────────────────┐   │
  │  │ Temperature  │   │    Humidity      │   │
  │  │ Sensor (°C)  │   │  Sensor (% RH)   │   │
  │  │  Range: 2–8  │   │  Range: 40–60    │   │
  │  │  Spike: 12°C │   │                  │   │
  │  └──────┬───────┘   └────────┬─────────┘   │
  └─────────┼────────────────────┼─────────────┘
            │                    │
            ▼                    ▼
  LAYER 2: BACKEND (Node.js + Express.js — Port 5000)
  ┌─────────────────────────────────────────────┐
  │  GET /api/sensor-data                        │
  │                                             │
  │  1. Generate rawTemp (2–8°C or spike 12°C)  │
  │  2. Derive risk: temp > 8 → "High"          │
  │  3. Generate 40-char hex blockchainHash     │
  │  4. Attach timestamp (HH:MM:SS AM/PM)       │
  │  5. res.json({ temperature, humidity,       │
  │                risk, blockchainHash,        │
  │                timestamp })                 │
  │                                             │
  │  CORS enabled · JSON Content-Type           │
  └────────────────────┬────────────────────────┘
                       │  HTTP GET (every 5s)
                       │  or Mock Fallback
                       ▼
  LAYER 3: FRONTEND (React + Vite — Port 5173)
  ┌─────────────────────────────────────────────┐
  │  useEffect → fetch() → try/catch            │
  │                                             │
  │  ┌─────────────┐  ┌──────────┐  ┌────────┐ │
  │  │  useState   │  │ applyData│  │ setRows│ │
  │  │ temperature │  │ (data,   │  │ (prev =│ │
  │  │ humidity    │  │  mock?)  │  │ [new,  │ │
  │  │ risk        │  └──────────┘  │ ...prev│ │
  │  │ blockchainH │               │ .slice(│ │
  │  │ lastUpdated │               │  0,50))│ │
  │  └─────────────┘               └────────┘ │
  └────────────────────┬────────────────────────┘
                       │
                       ▼
  LAYER 4: UI RENDERING (Tailwind CSS + Framer Motion)
  ┌─────────────────────────────────────────────┐
  │                                             │
  │  ┌──────────┐ ┌──────────┐ ┌────────────┐  │
  │  │   TEMP   │ │ HUMIDITY │ │ AI RISK    │  │
  │  │   Card   │ │   Card   │ │   Card     │  │
  │  │ (pulses) │ │          │ │(Red/Green) │  │
  │  └──────────┘ └──────────┘ └────────────┘  │
  │                                             │
  │  ┌──────────────────────────────────────┐   │
  │  │  Shipment Table (8 latest rows)      │   │
  │  │  ID · Product · Temp · Hash · Status │   │
  │  │  [ Verify Ledger ] → Modal           │   │
  │  └──────────────────────────────────────┘   │
  │                                             │
  │  ┌──────────────────────────────────────┐   │
  │  │  Shipment Search → Timeline Stepper  │   │
  │  │  Delhi → Noida → DTC Campus         │   │
  │  └──────────────────────────────────────┘   │
  │                                             │
  │  ┌──────────────────────────────────────┐   │
  │  │  Live SVG Map (Animated Truck)       │   │
  │  │  NH-24 · Progress Fill · Loop       │   │
  │  └──────────────────────────────────────┘   │
  └─────────────────────────────────────────────┘
                       │
                       ▼
  LAYER 5: BLOCKCHAIN VERIFICATION MODAL
  ┌─────────────────────────────────────────────┐
  │  Step 1: Spinner + "Connecting to           │
  │          VitalChain Ledger…" (1.5s)         │
  │  Step 2: ✅ Verified — Hash · Immutable ·   │
  │          BFT Consensus · Node-7 Geneva      │
  └─────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Version | Role in VitalChain AI |
|:-----:|:----------:|:-------:|:----------------------|
| ⚛️ **Frontend Framework** | React.js | 18.x | Component-based UI, state management with `useState` / `useEffect` |
| ⚡ **Build Tool** | Vite | 5.x | Lightning-fast dev server & HMR, optimised production builds |
| 🎨 **Styling** | Tailwind CSS | 3.x | Utility-first responsive design — Deep Hospital Blue, Emerald Green palette |
| 🎞️ **Animation** | Framer Motion | 11.x | Page transitions, staggered reveals, modal entry/exit animations |
| 🔣 **Icons** | Lucide React | 0.383 | Medical-grade icon library — HeartPulse, ShieldCheck, Thermometer, etc. |
| 🟢 **Backend Runtime** | Node.js | 20.x | JavaScript server runtime for the REST API |
| 🚂 **API Framework** | Express.js | 4.x | REST endpoint `/api/sensor-data`, JSON responses, CORS middleware |
| 🔐 **Blockchain Sim** | SHA-256 Hashing | — | 40-char hex hash generation per reading, mimics on-chain transaction IDs |
| 🤖 **AI Risk Engine** | Predictive Algorithm | — | Temperature-threshold rule engine: `> 8°C → High`, spike injection at 10% probability |
| 🗺️ **Live Map** | Custom SVG | — | Animated truck traversal, progress fill, arrival detection — zero map API dependency |
| 🌐 **CORS** | cors (npm) | 2.x | Cross-origin resource sharing between Vite dev server and Express API |
| 🔄 **Data Fallback** | Mock Generator | — | Random-walk temperature simulation when backend is offline |

</div>

---

## 📁 Project Structure

```
vitalchain-ai/
│
├── 📄 server.js                 # Express.js backend — sensor data API
├── 📦 package.json              # Root dependencies (express, cors)
│
└── src/
    ├── 📄 App.jsx               # Main React application (all components)
    ├── 📄 main.jsx              # React DOM entry point
    └── 📄 index.css             # Tailwind CSS base imports

Configuration Files:
├── 📄 vite.config.js            # Vite configuration
├── 📄 tailwind.config.js        # Tailwind content paths
└── 📄 postcss.config.js         # PostCSS for Tailwind
```

---

## ⚡ Installation & Quick Start

### Prerequisites

Make sure you have the following installed on your system:

```bash
node --version    # v18.0.0 or higher required
npm --version     # v9.0.0 or higher required
```

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/crrajiv-ux/VitalChain-AI-.git
cd vitalchain-ai
```

---

### Step 2 — Install All Dependencies

```bash
# Install backend dependencies (express + cors)
npm install express cors

# Install frontend dependencies
npm install

# Install React-specific packages
npm install framer-motion lucide-react
```

---

### Step 3 — Configure Tailwind CSS

```bash
# Install Tailwind and its peer dependencies
npm install -D tailwindcss postcss autoprefixer

# Initialise Tailwind config
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Replace the contents of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Step 4 — Place the Source Files

| File | Destination |
|:-----|:------------|
| `server.js` | Project root `/` (same level as `package.json`) |
| `App.jsx` | Inside `src/` folder — replace existing `src/App.jsx` |

---

### Step 5 — Start the Application

Open **two separate terminal windows**:

```bash
# ── Terminal 1: Start the Backend ──────────────────────────────
node server.js
# Expected output:
# ✅  VitalChain API → http://localhost:5000/api/sensor-data
```

```bash
# ── Terminal 2: Start the Frontend ─────────────────────────────
npm run dev
# Expected output:
# VITE v5.x.x  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

🌐 Open your browser and navigate to **[http://localhost:5173](http://localhost:5173)**

> **💡 Pro Tip:** Even if you forget to start the backend, the dashboard will **never go blank**. It automatically falls back to simulated mock data and shows an amber notification banner.

---

### Optional — Vite Proxy (Eliminates CORS in Dev)

Add to `vite.config.js` to proxy API calls through Vite:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

Then update the fetch URL in `App.jsx` from:
```js
fetch("http://localhost:5000/api/sensor-data")
```
to:
```js
fetch("/api/sensor-data")
```

---

## 🔌 API Reference

### `GET /api/sensor-data`

Returns the latest simulated sensor telemetry for one shipment cycle.

**Endpoint:** `http://localhost:5000/api/sensor-data`

**Response (200 OK):**

```json
{
  "temperature": "5.2",
  "humidity": 48,
  "risk": "Low",
  "blockchainHash": "0x3f8a1c2d9e4b7f0a6d1e9c3b2f5a8d0c1e4b7f2a",
  "timestamp": "02:45:30 PM"
}
```

**Response Fields:**

| Field | Type | Range | Description |
|:------|:----:|:-----:|:------------|
| `temperature` | `string` | `"1.5"` – `"12.0"` | Current temperature in °C. Normally `2.0–8.0`. Spikes to `12.0` at ~10% probability. |
| `humidity` | `number` | `40` – `60` | Relative humidity percentage |
| `risk` | `string` | `"Low"` / `"High"` | AI risk classification — `"High"` when `temperature > 8.0` |
| `blockchainHash` | `string` | 42 chars | Simulated SHA-256 transaction hash (`0x` prefix + 40 hex chars) |
| `timestamp` | `string` | — | Server time of reading in `HH:MM:SS AM/PM` format |

**Risk Logic:**

```
temperature > 8.0 °C  →  risk = "High"   (Immediate logistics alert)
temperature ≤ 8.0 °C  →  risk = "Low"    (Within safe cold chain window)
```

---

## 🗺️ Future Roadmap

```
PHASE 1 — Current (Hackathon MVP)          ██████████░░░░░░  65%
PHASE 2 — Hardware Integration             ░░░░░░░░░░░░░░░░   0%
PHASE 3 — Real Blockchain (Polygon)        ░░░░░░░░░░░░░░░░   0%
PHASE 4 — Mobile Application              ░░░░░░░░░░░░░░░░   0%
PHASE 5 — Enterprise & Regulatory         ░░░░░░░░░░░░░░░░   0%
```

### 🔧 Phase 2 — Hardware Integration (Arduino / Raspberry Pi)
- Replace simulated sensor data with **real DHT22 temperature & humidity sensors** connected via Arduino Uno or Raspberry Pi
- Stream live readings over **USB Serial / MQTT protocol** to the Express backend
- Deploy physical sensor units inside actual vaccine transport boxes for field trials
- Add GPS module integration for precise real-world location tracking (replacing SVG simulation)

### ⛓️ Phase 3 — Real Blockchain (Polygon / Hyperledger)
- Migrate from SHA-256 hash simulation to **actual smart contracts deployed on Polygon PoS** (low gas fees, high throughput)
- Each sensor reading hashed and written on-chain as an **immutable transaction**
- Integrate **MetaMask wallet** for authorised write access — only certified logistics operators can submit readings
- Build a **public verification portal** — anyone can independently verify a shipment's integrity using its `VC-XXXX` ID

### 📱 Phase 4 — Mobile Application (React Native)
- Cross-platform **iOS + Android app** for logistics drivers and hospital pharmacists
- **Push notification alerts** when temperature exceeds threshold — real-time to the driver's pocket
- Offline-capable with local SQLite caching when cellular connectivity is unavailable
- QR code scanning to instantly pull up a shipment's full blockchain-verified history

### 🏢 Phase 5 — Enterprise & Regulatory
- **WHO PQS / WHO EML compliance** reporting module — auto-generate cold chain excursion reports
- Integration with **India's CoWIN / Central Drugs Standard Control Organisation (CDSCO)** APIs
- **Role-based access control** — Manufacturers, Distributors, Hospitals, and Regulators each see tailored dashboards
- **Multi-shipment fleet management** — track 100+ simultaneous shipments across India's cold chain network
- AI model upgrade from rule-based to **LSTM time-series prediction** for proactive breach forecasting

---

## 👥 Team — Byte-X-ploit

<div align="center">

```
  ██████╗ ██╗   ██╗████████╗███████╗    ██╗  ██╗    ██████╗ ██╗      ██████╗ ██╗████████╗
  ██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝    ╚██╗██╔╝    ██╔══██╗██║     ██╔═══██╗██║╚══██╔══╝
  ██████╔╝ ╚████╔╝    ██║   █████╗       ╚███╔╝     ██████╔╝██║     ██║   ██║██║   ██║
  ██╔══██╗  ╚██╔╝     ██║   ██╔══╝       ██╔██╗     ██╔═══╝ ██║     ██║   ██║██║   ██║
  ██████╔╝   ██║      ██║   ███████╗    ██╔╝ ██╗    ██║     ███████╗╚██████╔╝██║   ██║
  ╚═════╝    ╚═╝      ╚═╝   ╚══════╝    ╚═╝  ╚═╝    ╚═╝     ╚══════╝ ╚═════╝ ╚═╝   ╚═╝
```

</div>

<br/>

<div align="center">

| 👤 Name | 🎯 Role | 🛠️ Responsibilities |
|:-------:|:-------:|:---------------------|
| **[Team Lead]** | Full-Stack Lead & Architect | System architecture design, Express.js backend, API design, blockchain hash simulation, risk engine logic |
| **[Frontend Dev]** | UI/UX Engineer | React.js dashboard, Tailwind CSS design system, Framer Motion animations, component architecture |
| **[Data Engineer]** | AI & Analytics Lead | Predictive risk algorithm, mock data generator, temperature drift model, analytics charts |
| **[DevOps / Docs]** | Integration & Documentation | Project setup, dependency management, README, demo preparation, presentation slides |

</div>

<br/>

<div align="center">

🏆 **Team Byte-X-ploit** — Built with purpose, caffeine, and a belief that technology can save lives.

*"We didn't just build a dashboard. We built the infrastructure of trust for life-saving medicines."*

</div>

---

## 🏅 Hackathon Highlights

<div align="center">

| Category | Achievement |
|:--------:|:-----------:|
| ⚡ **Speed** | Full-stack MVP built and deployed in hackathon timeframe |
| 🎨 **Design** | Premium hospital-grade UI with Deep Blue + Emerald Green medical palette |
| 🔗 **Innovation** | First-of-kind blockchain + AI + live map integration for pharma cold chain |
| 🛡️ **Resilience** | Zero-downtime architecture with intelligent offline fallback |
| 📈 **Scalability** | Architecture designed for real hardware, real blockchain, and real enterprise deployment |

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2025 Team Byte-X-ploit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0f2d56,1d4ed8,0ea5e9&height=120&section=footer&animation=fadeIn" width="100%"/>

**Made with ❤️ and a deep belief in healthcare equity by Team Byte-X-ploit**

*VitalChain AI — Because every vaccine deserves a chain of trust.*

⭐ If this project inspired you, please give it a star!

[![GitHub stars](https://img.shields.io/github/stars/byte-x-ploit/vitalchain-ai?style=social)](https://github.com/byte-x-ploit/vitalchain-ai)

</div>
