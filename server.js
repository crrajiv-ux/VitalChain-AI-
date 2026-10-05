import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Helpers ───────────────────────────────────────────────────────────────────
function randomBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function generateBlockchainHash() {
  const hex = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 40; i++) {
    hash += hex[Math.floor(Math.random() * hex.length)];
  }
  return hash;
}

function getTimestamp() {
  return new Date().toLocaleTimeString("en-US", {
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ── Route: GET /api/sensor-data ───────────────────────────────────────────────
app.get("/api/sensor-data", (req, res) => {
  // Generate base temperature in safe cold-chain range (2.0°C - 8.0°C)
  let temperature = parseFloat(randomBetween(2, 8));

  // Occasionally (10% chance) spike temperature to 12.0°C for alert testing
  if (Math.random() < 0.10) {
    temperature = 12.0;
  }

  // Convert back to string for response
  temperature = temperature.toFixed(1);

  // Determine risk based on temperature
  let risk;
  if (temperature > 8.0) {
    risk = "High";
  } else if (temperature >= 2.0 && temperature <= 8.0) {
    risk = "Low";
  } else {
    risk = "Unknown"; // Fallback, though unlikely
  }

  const humidity        = Math.floor(Math.random() * 21) + 40; // 40–60 % RH
  const blockchainHash  = generateBlockchainHash();
  const timestamp       = getTimestamp();

  res.json({
    temperature,      // string  e.g. "5.2"
    humidity,         // number  e.g. 48
    risk,             // string  "High" | "Low"
    blockchainHash,   // string  "0xabc123..."
    timestamp,        // string  "11:30:05 AM"
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  VitalChain API running at http://localhost:${PORT}/api/sensor-data`);
});