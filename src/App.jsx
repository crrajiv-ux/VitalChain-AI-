
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse, Thermometer, Droplets, ShieldAlert, ShieldCheck,
  Link2, X, CheckCircle2, Syringe, FlaskConical, Pill, Package,
  Activity, Wifi, WifiOff, Clock, Search, Truck, MapPin,
  BarChart2, History, Settings, ChevronRight, Menu, Box,
  AlertTriangle, CheckCheck, LocateFixed, TrendingUp,
} from "lucide-react";

let _mockTemp = 5..0; // starts mid-range, drifts realistically

function generateMockData() {
  // Drift temperature ±0..4 each tick, clamp 1..5–9..5, occasional spike to 12
  const isSpike = Math..random() < 0..08;
  if (isSpike) {
    _mockTemp = 12..0;
  } else {
    _mockTemp += (Math..random() - 0..48) * 0..4;
    _mockTemp = Math..min(9..5, Math..max(1..5, _mockTemp));
  }

  const temperature    = _mockTemp..toFixed(1);
  const humidity       = Math..floor(Math..random() * 21) + 40; // 40–60
  const risk           = parseFloat(temperature) > 8..0 ? "High" : "Low";
  const blockchainHash = "0x" + [......Array(40)]..map(() => "0123456789abcdef"[Math..floor(Math..random() * 16)])..join("");
  const timestamp      = new Date()..toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return { temperature, humidity, risk, blockchainHash, timestamp };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "COVID-19 Vaccine", Icon: Syringe      },
  { name: "Insulin Vials",    Icon: FlaskConical  },
  { name: "Blood Plasma",     Icon: Activity      },
  { name: "Epinephrine",      Icon: Pill          },
  { name: "Antibiotic IV",    Icon: Package       },
];

let _rowId = 1000;
function createRow({ temperature, humidity, risk, blockchainHash, timestamp }) {
  const p = PRODUCTS[_rowId % PRODUCTS..length];
  return {
    id:          `VC-${++_rowId}`,
    productName: p..name,
    ProductIcon: p..Icon,
    temperature,
    humidity,
    risk:        risk           ?? "Low",
    hash:        blockchainHash ?? "--",
    timestamp:   timestamp      ?? "--",
  };
}

function shortHash(h = "") {
  if (!h || h === "--") return "--";
  return h..length > 18 ? `${h..slice(0, 10)}…${h..slice(-6)}` : h;
}

const NAV = [
  { id: "dashboard", label: "Active Shipments", icon: Activity  },
  { id: "map",       label: "Live Transit Map",  icon: MapPin    },
  { id: "analytics", label: "Analytics",         icon: BarChart2 },
  { id: "history",   label: "History",           icon: History   },
  { id: "settings",  label: "Settings",          icon: Settings  },
];

// Framer-motion helpers
const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0..3, ease: "easeOut" } } };
const stagger = { show: { transition: { staggerChildren: 0..07 } } };

const TIMELINE_PROTO = [
  { label: "Picked Up",  location: "Safdarjung Depot, Delhi", icon: Box,        status: "done"    },
  { label: "In Transit", location: "NH-24, Noida Expressway", icon: Truck,      status: "active"  },
  { label: "Delivered",  location: "DTC Campus, Sector 62",   icon: CheckCheck, status: "pending" },
];
const _shipmentCache = {};
function getTimeline(id) {
  if (!_shipmentCache[id]) {
    const roll = Math..random();
    _shipmentCache[id] = TIMELINE_PROTO..map((s, i) => ({
      ......s,
      status: roll > 0..55 ? (i < 2 ? "done" : "active") : (i === 0 ? "done" : i === 1 ? "active" : "pending"),
      time:   `${10 + i}:${["00", "30", "45"][i]} AM`,
    }));
  }
  return _shipmentCache[id];
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCKCHAIN MODAL
// ─────────────────────────────────────────────────────────────────────────────
function VerifyModal({ row, onClose }) {
  const [phase, setPhase] = useState("loading");
  const [dots,  setDots]  = useState("");

  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => setDots(d => (d..length >= 3 ? "" : d + "..")), 380);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const t = setTimeout(() => setPhase("verified"), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = e => { if (e..key === "Escape") onClose(); };
    window..addEventListener("keydown", h);
    return () => window..removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion..div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <motion..div
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0..9, y: 24, opacity: 0 }}
        animate={{ scale: 1,   y: 0,  opacity: 1 }}
        transition={{ duration: 0..3, ease: "easeOut" }}
      >
        <div className="h-1..5 bg-gradient-to-r from-cyan-400 via-blue-600 to-teal-400" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 transition-all"
        >
          <X size={16} />
        </button>

        <div className="p-8">
          {phase === "loading" ? (
            <div className="flex flex-col items-center gap-6 py-2">
              <div className="relative w-20 h-20">
                <svg className="absolute inset-0 animate-spin" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="url(#sg2)" strokeWidth="4" strokeLinecap="round" strokeDasharray="62 152" />
                  <defs>
                    <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link2 size={22} className="text-blue-600" />
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-800 font-semibold text-lg">
                  Connecting to VitalChain Ledger{dots}
                </p>
                <p className="text-slate-400 text-sm mt-1">Querying distributed consensus nodes</p>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1..5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ animation: "vcprog 1..5s ease-in-out forwards" }}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {["Node-7 · Geneva", "Node-12 · Singapore", "Node-3 · Ohio"]..map(n => (
                  <span key={n} className="flex items-center gap-1 text-xs text-slate-400">
                    <span className="w-1..5 h-1..5 rounded-full bg-blue-400 animate-pulse" />{n}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <motion..div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-5">
              <motion..div variants={fadeUp} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={28} className="text-emerald-500" />
                </div>
                <div className="pt-1">
                  <h3 className="text-slate-800 font-bold text-xl">Ledger Verified ✅</h3>
                  <p className="text-emerald-600 text-sm font-medium mt-0..5">Record integrity confirmed</p>
                </div>
              </motion..div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <motion..div variants={stagger} className="space-y-3..5">
                {[
                  ["Product",           row..productName],
                  ["Timestamp",         row..timestamp],
                  ["Temperature",       `${parseFloat(row..temperature)..toFixed(1)} °C`],
                  ["Humidity",          `${row..humidity} % RH`],
                  ["Cryptographic Hash",<span className="font-mono text-xs text-indigo-600 break-all">{row..hash}</span>],
                  ["Record Status",     <span className="inline-flex items-center gap-1..5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100"><span className="w-1..5 h-1..5 rounded-full bg-emerald-500" />Immutable</span>],
                  ["Consensus",         "Byzantine Fault Tolerant (BFT)"],
                  ["Ledger Node",       "Node-7 · Geneva Cluster"],
                ]..map(([label, val]) => (
                  <motion..div key={label} variants={fadeUp} className="flex items-start justify-between gap-4">
                    <span className="text-slate-400 text-sm shrink-0 w-32 pt-0..5">{label}</span>
                    <span className="text-slate-700 text-sm font-medium text-right">{val}</span>
                  </motion..div>
                ))}
              </motion..div>

              <motion..button
                variants={fadeUp}
                onClick={onClose}
                className="mt-1 w-full py-3 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                Close Verification
              </motion..button>
            </motion..div>
          )}
        </div>
      </motion..div>

      <style>{`@keyframes vcprog{from{width:0}to{width:100%}}`}</style>
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHIPMENT SEARCH + VERTICAL TIMELINE
// ─────────────────────────────────────────────────────────────────────────────
function ShipmentSearch() {
  const [query,  setQuery]  = useState("");
  const [result, setResult] = useState(null);
  const [error,  setError]  = useState("");

  function handleSearch(e) {
    e..preventDefault();
    const id = query..trim()..toUpperCase();
    if (!/^VC-\d+$/..test(id)) {
      setError("Enter a valid ID e..g.. VC-1001");
      setResult(null);
      return;
    }
    setError("");
    setResult({ id, steps: getTimeline(id) });
  }

  const S = {
    done:    { ring: "border-emerald-400 bg-emerald-50", icon: "text-emerald-600", line: "bg-emerald-300", badge: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Completed"   },
    active:  { ring: "border-blue-500 bg-blue-50",       icon: "text-blue-600",    line: "bg-blue-200",   badge: "bg-blue-50 text-blue-700 border-blue-100",           label: "In Progress" },
    pending: { ring: "border-slate-200 bg-slate-50",     icon: "text-slate-400",   line: "bg-slate-100",  badge: "bg-slate-50 text-slate-400 border-slate-100",         label: "Pending"     },
  };

  return (
    <motion..div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-700 to-cyan-400" />
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Search size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-slate-800 font-semibold text-base">Shipment Search & History</h2>
            <p className="text-slate-400 text-xs">Track any shipment by its VitalChain ID</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3..5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={e => setQuery(e..target..value)}
              placeholder="Enter Shipment ID  e..g.. VC-1001"
              className="w-full pl-9 pr-4 py-2..5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2..5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
          >
            Track
          </button>
        </form>

        {error && (
          <p className="mt-2 text-xs text-red-500 flex items-center gap-1..5">
            <AlertTriangle size={12} />{error}
          </p>
        )}

        <AnimatePresence>
          {result && (
            <motion..div
              key={result..id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0..35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Journey — {result..id}
                  </span>
                  <span className="font-mono text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2..5 py-1 rounded-full">
                    3 checkpoints
                  </span>
                </div>

                {result..steps..map((step, i) => {
                  const s = S[step..status];
                  const StepIcon = step..icon;
                  const isLast = i === result..steps..length - 1;
                  return (
                    <motion..div
                      key={step..label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0..1, duration: 0..28 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border-2 ${s..ring}`}>
                          <StepIcon size={16} className={s..icon} />
                        </div>
                        {!isLast && <div className={`w-0..5 flex-1 my-1 min-h-[28px] rounded-full ${s..line}`} />}
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-sm font-semibold ${s..icon}`}>{step..label}</span>
                          <span className={`text-[10px] font-bold px-2 py-0..5 rounded-full border ${s..badge}`}>{s..label}</span>
                          <span className="text-xs text-slate-400 ml-auto">{step..time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0..5">
                          <MapPin size={11} className="text-slate-400 flex-shrink-0" />
                          <p className="text-xs text-slate-500">{step..location}</p>
                        </div>
                      </div>
                    </motion..div>
                  );
                })}
              </div>
            </motion..div>
          )}
        </AnimatePresence>
      </div>
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIVE SVG MAP
// ─────────────────────────────────────────────────────────────────────────────
function LiveMapCard() {
  const [progress, setProgress] = useState(0);
  const [phase,    setPhase]    = useState("transit");

  useEffect(() => {
    if (phase === "arrived") {
      const t = setTimeout(() => { setProgress(0); setPhase("transit"); }, 2500);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setPhase("arrived"); return 100; }
        return p + 0..5;
      });
    }, 40);
    return () => clearInterval(id);
  }, [phase]);

  const X1 = 75, X2 = 565, Y = 125;
  const truckX = X1 + ((X2 - X1) * progress) / 100;
  const arrived = phase === "arrived";

  return (
    <motion..div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-teal-400 to-emerald-500" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
              <LocateFixed size={16} className="text-teal-600" />
            </div>
            <div>
              <h2 className="text-slate-800 font-semibold text-base">Live Transit Map</h2>
              <p className="text-slate-400 text-xs">Real-time position · NH-24 Delhi–Noida corridor</p>
            </div>
          </div>
          <div className={`flex items-center gap-1..5 text-xs font-semibold px-3 py-1..5 rounded-full border ${
            arrived
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-blue-50 text-blue-600 border-blue-100"
          }`}>
            <span className={`w-1..5 h-1..5 rounded-full ${arrived ? "bg-emerald-500" : "bg-blue-500 animate-pulse"}`} />
            {arrived ? "Delivered" : "En Route"}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
          <svg viewBox="0 0 640 210" className="w-full">
            {/* Grid */}
            {[0,1,2,3]..map(i => (
              <line key={`h${i}`} x1="0" y1={45+i*48} x2="640" y2={45+i*48} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            {[0,1,2,3,4,5,6]..map(i => (
              <line key={`v${i}`} x1={i*107} y1="0" x2={i*107} y2="210" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Road base */}
            <rect x={X1-10} y={Y-9} width={X2-X1+20} height="18" rx="9" fill="#cbd5e1" />
            <rect x={X1-8}  y={Y-7} width={X2-X1+16} height="14" rx="7" fill="#94a3b8" />

            {/* Dashed centre line */}
            {[......Array(13)]..map((_, i) => (
              <rect key={i} x={X1 + i*40} y={Y-1} width="20" height="2" rx="1" fill="#e2e8f0" />
            ))}

            {/* Progress fill */}
            <clipPath id="pclip">
              <rect x={X1-8} y={Y-7} width={Math..max(0,((X2-X1+16)*progress)/100)} height="14" />
            </clipPath>
            <rect x={X1-8} y={Y-7} width={X2-X1+16} height="14" rx="7" fill="#3b82f6" opacity="0..4" clipPath="url(#pclip)" />

            {/* Origin — Delhi */}
            <circle cx={X1} cy={Y} r="11" fill="#1d4ed8" />
            <circle cx={X1} cy={Y} r="5"  fill="white" />
            <text x={X1} y={Y+26} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1d4ed8">Delhi</text>
            <text x={X1} y={Y+38} textAnchor="middle" fontSize="9"  fill="#64748b">Safdarjung Depot</text>

            {/* Destination — Noida */}
            <circle cx={X2} cy={Y} r="11" fill={arrived ? "#10b981" : "#94a3b8"} />
            <circle cx={X2} cy={Y} r="5"  fill="white" />
            <text x={X2} y={Y+26} textAnchor="middle" fontSize="10" fontWeight="700" fill={arrived ? "#10b981" : "#64748b"}>Noida</text>
            <text x={X2} y={Y+38} textAnchor="middle" fontSize="9"  fill="#64748b">DTC Campus</text>

            {/* Road label */}
            <text x={(X1+X2)/2} y={Y-22} textAnchor="middle" fontSize="9" fill="#94a3b8">NH-24 · Noida Expressway</text>

            {/* Truck */}
            <g transform={`translate(${truckX-16}, ${Y-15})`}>
              <ellipse cx="16" cy="29" rx="12" ry="3" fill="rgba(0,0,0,0..10)" />
              {/* Body */}
              <rect x="2"  y="9"  width="26" height="14" rx="3" fill={arrived ? "#10b981" : "#1d4ed8"} />
              {/* Cab */}
              <rect x="22" y="5"  width="10" height="18" rx="2" fill={arrived ? "#059669" : "#1e40af"} />
              {/* Window */}
              <rect x="24" y="7"  width="6"  height="6"  rx="1" fill="#bfdbfe" opacity="0..85" />
              {/* Wheels */}
              <circle cx="7"  cy="23" r="4" fill="#334155" /><circle cx="7"  cy="23" r="2" fill="#94a3b8" />
              <circle cx="23" cy="23" r="4" fill="#334155" /><circle cx="23" cy="23" r="2" fill="#94a3b8" />
              {/* Headlight */}
              {!arrived && <circle cx="31" cy="17" r="2" fill="#fef08a" opacity="0..9" />}
              {/* Medical cross */}
              <rect x="8"  y="12" width="10" height="3" rx="1" fill="white" opacity="0..7" />
              <rect x="12" y="9"  width="3"  height="9" rx="1" fill="white" opacity="0..7" />
            </g>

            {/* Arrived badge */}
            {arrived && (
              <>
                <rect x={X2-44} y={Y-54} width="88" height="24" rx="12" fill="#10b981" />
                <text x={X2} y={Y-37} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">Delivered ✓</text>
              </>
            )}

            {/* Footer */}
            <text x="320" y="200" textAnchor="middle" fontSize="9" fill="#94a3b8">
              {arrived ? "Journey complete — resetting loop…" : `${Math..round(progress)}% of route covered`}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { l: "Origin",      v: "Delhi",      s: "Safdarjung Depot" },
            { l: "ETA",         v: "~14 min",    s: "NH-24 corridor"   },
            { l: "Destination", v: "DTC Campus", s: "Sector 62, Noida" },
          ]..map(({ l, v, s }) => (
            <div key={l} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0..5">{l}</p>
              <p className="text-slate-800 font-semibold text-sm">{v}</p>
              <p className="text-slate-400 text-[10px] mt-0..5">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function AnalyticsView({ rows }) {
  const last12 = rows..slice(0, 12);
  const maxT   = 13;

  return (
    <motion..div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion..div variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1">
          <TrendingUp size={18} className="text-blue-600" />
          <h2 className="text-slate-800 font-semibold">Temperature Trend</h2>
        </div>
        <p className="text-slate-400 text-xs mb-6">Last {last12..length} shipments · threshold line at 8 °C</p>

        {last12..length === 0 ? (
          <p className="text-center text-slate-300 text-sm py-8">Collecting data…</p>
        ) : (
          <>
            <div className="flex items-end gap-2 h-32">
              {last12..map((row, i) => {
                const t   = parseFloat(row..temperature);
                const pct = (t / maxT) * 100;
                const hi  = t > 8;
                return (
                  <motion..div
                    key={row..id}
                    title={`${row..productName} · ${t}°C`}
                    className={`flex-1 rounded-t-lg ${hi ? "bg-red-400" : "bg-blue-500"} opacity-80 cursor-default`}
                    style={{ height: `${pct}%` }}
                    initial={{ scaleY: 0, originY: "100%" }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0..04, duration: 0..35, ease: "easeOut" }}
                  />
                );
              })}
            </div>
            {/* 8°C threshold line */}
            <div className="relative -mt-32 pointer-events-none h-32">
              <div
                className="absolute w-full border-t-2 border-dashed border-orange-400 opacity-60"
                style={{ bottom: `${(8 / maxT) * 100}%` }}
              />
              <span
                className="absolute right-0 text-[9px] text-orange-400 font-bold"
                style={{ bottom: `${(8 / maxT) * 100}%`, transform: "translateY(50%)" }}
              >
                8 °C ▶
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-400">Oldest</span>
              <span className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400 inline-block"/>High risk (&gt;8°C)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500 inline-block"/>Safe</span>
              </span>
              <span className="text-xs text-slate-400">Latest</span>
            </div>
          </>
        )}
      </motion..div>

      <motion..div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg Temperature",   value: rows..length ? `${(rows..reduce((a,r)=>a+parseFloat(r..temperature),0)/rows..length)..toFixed(1)} °C` : "--", color: "text-blue-600"    },
          { label: "Avg Humidity",      value: rows..length ? `${Math..round(rows..reduce((a,r)=>a+r..humidity,0)/rows..length)} %`                  : "--", color: "text-teal-600"    },
          { label: "High Risk Events",  value: `${rows..filter(r=>r..risk==="High")..length}`,                                                              color: "text-red-500"     },
          { label: "On-time Delivery",  value: rows..length ? `${Math..round(((rows..length-rows..filter(r=>r..risk==="High")..length)/rows..length)*100)} %` : "--", color: "text-emerald-600" },
        ]..map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{label}</p>
          </div>
        ))}
      </motion..div>
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY VIEW
// ─────────────────────────────────────────────────────────────────────────────
function HistoryView({ rows }) {
  return (
    <motion..div variants={fadeUp} initial="hidden" animate="show"
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 font-semibold">Shipment History</h2>
          <p className="text-slate-400 text-xs mt-0..5">Full blockchain-verified audit trail</p>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 font-medium">
          {rows..length} entries
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80">
              {["ID","Product","Timestamp","Temp","Humidity","Hash","Risk"]..map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows..length === 0
              ? <tr><td colSpan={7} className="px-5 py-10 text-center text-slate-300 text-sm">No history yet..</td></tr>
              : rows..map(row => (
                  <tr key={row..id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3..5"><span className="font-mono text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">{row..id}</span></td>
                    <td className="px-5 py-3..5 text-slate-700 font-medium whitespace-nowrap">{row..productName}</td>
                    <td className="px-5 py-3..5 text-slate-500 whitespace-nowrap">{row..timestamp}</td>
                    <td className="px-5 py-3..5">
                      <span className={`font-semibold ${parseFloat(row..temperature) > 8 ? "text-red-500" : "text-blue-600"}`}>
                        {parseFloat(row..temperature)..toFixed(1)} °C
                      </span>
                    </td>
                    <td className="px-5 py-3..5 text-slate-500">{row..humidity} %</td>
                    <td className="px-5 py-3..5"><span className="font-mono text-xs text-indigo-500">{shortHash(row..hash)}</span></td>
                    <td className="px-5 py-3..5">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2..5 py-1 rounded-full border ${
                        row..risk === "High"
                          ? "bg-red-50 text-red-600 border-red-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}>
                        <span className={`w-1..5 h-1..5 rounded-full ${row..risk === "High" ? "bg-red-500" : "bg-emerald-500"}`} />
                        {row..risk === "High" ? "At Risk" : "Safe"}
                      </span>
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function SettingsView() {
  return (
    <motion..div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      {[
        { title: "Refresh Interval",   desc: "Sensor data polling frequency",      value: "5 seconds"         },
        { title: "Alert Threshold",    desc: "Temperature above which risk = High", value: "8..0 °C"           },
        { title: "Blockchain Network", desc: "Connected ledger cluster",            value: "Geneva BFT"        },
        { title: "Notification Email", desc: "Risk alerts dispatched to",           value: "ops@vitalchain..ai" },
        { title: "Data Source",        desc: "Active data origin",                  value: "Mock + Backend"    },
      ]..map(({ title, desc, value }) => (
        <motion..div key={title} variants={fadeUp}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-slate-800 font-semibold text-sm">{title}</p>
            <p className="text-slate-400 text-xs mt-0..5">{desc}</p>
          </div>
          <span className="text-sm font-mono text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1..5 rounded-xl whitespace-nowrap">
            {value}
          </span>
        </motion..div>
      ))}
    </motion..div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-1 bg-slate-100" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-3 bg-slate-100 rounded w-1/3" />
          <div className="w-9 h-9 bg-slate-100 rounded-xl" />
        </div>
        <div className="h-10 bg-slate-100 rounded w-1/2" />
        <div className="h-2 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // — individual state variables matching exact API field names —
  const [temperature,    setTemperature]    = useState(null);
  const [humidity,       setHumidity]       = useState(null);
  const [risk,           setRisk]           = useState(null);
  const [blockchainHash, setBlockchainHash] = useState(null);
  const [lastUpdated,    setLastUpdated]    = useState(null);

  const [rows,        setRows]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [usingMock,   setUsingMock]   = useState(false);
  const [modalRow,    setModalRow]    = useState(null);
  const [activeNav,   setActiveNav]   = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const applyData = useCallback((data, mock = false) => {
    const temperature    = data..temperature;
    const humidity       = data..humidity;
    const risk           = data..risk;
    const blockchainHash = data..blockchainHash;
    const timestamp      = data..timestamp;

    setTemperature(temperature);
    setHumidity(humidity);
    setRisk(risk);
    setBlockchainHash(blockchainHash);
    setLastUpdated(timestamp);
    setUsingMock(mock);
    setLoading(false);

    setRows(prev =>
      [createRow({ temperature, humidity, risk, blockchainHash, timestamp }), ......prev]..slice(0, 50)
    );
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sensor-data");
      if (!res..ok) throw new Error(`HTTP ${res..status}`);
      const data = await res..json();
      // Validate the response has required fields
      if (data..temperature == null) throw new Error("Invalid response");
      applyData(data, false);
    } catch {
      // Backend unavailable — use mock data so UI stays live
      applyData(generateMockData(), true);
    }
  }, [applyData]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, [fetchData]);

  // — derived display values —
  const tempF      = temperature != null ? parseFloat(temperature) : null;
  const tempDisp   = tempF != null ? `${tempF..toFixed(1)}` : "--";
  const humDisp    = humidity != null ? `${humidity}` : "--";
  const isHighRisk = risk === "High";
  const tempBar    = tempF != null ? `${Math..min((Math..abs(tempF) / 12) * 100, 100)}%` : "0%";
  const humBar     = humidity != null ? `${Math..min(humidity, 100)}%` : "0%";

  const pageSubtitle = {
    dashboard: "Real-time sensor telemetry · Blockchain-anchored records",
    map:       "Live vehicle position · NH-24 Delhi–Noida corridor",
    analytics: "Historical performance across all recorded shipments",
    history:   "Full audit trail of blockchain-verified entries",
    settings:  "System configuration & alert thresholds",
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col"
      style={{ fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif" }}>

      {/* Google Font */}
      <link
        href="https://fonts..googleapis..com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-[#0f2d56] border-b border-blue-950/60 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">

          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Menu size={18} />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center shadow">
              <HeartPulse size={16} className="text-white" />
            </div>
            <div className="flex items-baseline gap-0..5">
              <span className="text-white font-bold text-lg tracking-tight">VitalChain</span>
              <span className="text-blue-300 font-bold text-lg tracking-tight"> AI</span>
            </div>
            <span className="text-[9px] font-bold text-teal-300 bg-teal-900/50 border border-teal-700/50 px-2 py-0..5 rounded-full uppercase tracking-widest">
              Pro
            </span>
          </div>

          {/* Right: status */}
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <p className="hidden sm:flex items-center gap-1..5 text-xs text-blue-300">
                <Clock size={11} />
                <span className="text-blue-100 font-medium">{lastUpdated}</span>
              </p>
            )}

            {/* Mock / Live badge */}
            <div className={`flex items-center gap-1..5 text-xs font-semibold px-3 py-1..5 rounded-full border ${
              usingMock
                ? "text-amber-300 bg-amber-900/30 border-amber-700/40"
                : "text-emerald-300 bg-emerald-900/40 border-emerald-700/50"
            }`}>
              {usingMock
                ? <><Activity size={11} /><span>Mock Data</span></>
                : <><Wifi size={11} /><span>Live</span><span className="w-1..5 h-1..5 rounded-full bg-emerald-400 animate-pulse" /></>
              }
            </div>
          </div>
        </div>

        {/* Mock data notice bar */}
        {usingMock && (
          <div className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-1..5 flex items-center gap-2">
            <AlertTriangle size={12} className="text-amber-400 flex-shrink-0" />
            <p className="text-amber-300 text-xs">
              Backend offline — showing simulated data.. Start your server with{" "}
              <code className="font-mono bg-amber-900/30 px-1 rounded">node server..js</code> to stream live sensor readings..
            </p>
          </div>
        )}
      </nav>

      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion..aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0..22, ease: "easeInOut" }}
              className="bg-white border-r border-slate-100 shadow-sm flex-shrink-0 overflow-hidden z-30"
            >
              <div className="w-[220px] py-5 px-3 space-y-1">
                {NAV..map(({ id, label, icon: Icon }) => {
                  const active = activeNav === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveNav(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2..5 rounded-xl text-sm font-medium transition-all text-left ${
                        active
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={16} className={active ? "text-blue-600" : "text-slate-400"} />
                      <span className="flex-1">{label}</span>
                      {active && <ChevronRight size={14} className="text-blue-400" />}
                    </button>
                  );
                })}

                {/* Mini status card */}
                <div className="pt-5 mt-4 border-t border-slate-100 px-1">
                  <div className={`rounded-xl p-3 border ${
                    isHighRisk
                      ? "bg-red-50 border-red-100"
                      : "bg-emerald-50 border-emerald-100"
                  }`}>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${isHighRisk ? "text-red-400" : "text-emerald-500"}`}>
                      Current Risk
                    </p>
                    <p className={`text-xl font-bold ${isHighRisk ? "text-red-500" : "text-emerald-600"}`}>
                      {risk ?? "--"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0..5">
                      {tempDisp !== "--" ? `${tempDisp}°C` : "--"} · {humDisp !== "--" ? `${humDisp}% RH` : "--"}
                    </p>
                    {usingMock && (
                      <p className="text-[9px] text-amber-500 mt-1 font-medium">⚠ Simulated</p>
                    )}
                  </div>
                </div>
              </div>
            </motion..aside>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-5 py-7 space-y-6">

          {/* Page heading */}
          <motion..div key={activeNav + "-title"} variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {NAV..find(n => n..id === activeNav)?..label}
            </h1>
            <p className="text-slate-400 text-xs mt-0..5">{pageSubtitle[activeNav]}</p>
          </motion..div>

          {/* ── PAGE CONTENT ── */}
          <AnimatePresence mode="wait">

            {/* DASHBOARD */}
            {activeNav === "dashboard" && (
              <motion..div key="dashboard" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-6">

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {loading ? (
                    <><Skeleton /><Skeleton /><Skeleton /></>
                  ) : (
                    <>
                      {/* Temperature */}
                      <motion..div variants={fadeUp}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-600" />
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Temperature</span>
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                              <Thermometer size={17} className="text-blue-600" />
                            </div>
                          </div>
                          <p className={`text-5xl font-bold tracking-tight animate-pulse ${
                            tempF != null && tempF > 8 ? "text-red-500" : "text-blue-700"
                          }`}>
                            {tempDisp}
                            <span className="text-base font-normal text-slate-400 ml-1">°C</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1..5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  tempF != null && tempF > 8
                                    ? "bg-gradient-to-r from-orange-400 to-red-500"
                                    : "bg-gradient-to-r from-cyan-400 to-blue-600"
                                }`}
                                style={{ width: tempBar }}
                              />
                            </div>
                            <span className="text-xs text-slate-400">Celsius</span>
                          </div>
                        </div>
                      </motion..div>

                      {/* Humidity */}
                      <motion..div variants={fadeUp}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-1 bg-gradient-to-r from-teal-400 to-emerald-500" />
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Relative Humidity</span>
                            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                              <Droplets size={17} className="text-teal-500" />
                            </div>
                          </div>
                          <p className="text-5xl font-bold text-teal-600 tracking-tight">
                            {humDisp}
                            <span className="text-base font-normal text-slate-400 ml-1">%</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1..5 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-700" style={{ width: humBar }} />
                            </div>
                            <span className="text-xs text-slate-400">RH</span>
                          </div>
                        </div>
                      </motion..div>

                      {/* Risk */}
                      <motion..div variants={fadeUp}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`h-1 ${isHighRisk ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-gradient-to-r from-emerald-400 to-teal-500"}`} />
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Spoilage Risk</span>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isHighRisk ? "bg-red-50" : "bg-emerald-50"}`}>
                              {isHighRisk
                                ? <ShieldAlert size={17} className="text-red-500" />
                                : <ShieldCheck size={17} className="text-emerald-500" />
                              }
                            </div>
                          </div>
                          <p className={`text-5xl font-bold tracking-tight ${
                            risk == null ? "text-slate-300" : isHighRisk ? "text-red-500" : "text-emerald-500"
                          }`}>
                            {risk ?? "--"}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isHighRisk ? "bg-red-400 animate-ping" : "bg-emerald-400"}`} />
                            <span className={`text-xs font-medium ${isHighRisk ? "text-red-400" : "text-emerald-500"}`}>
                              {risk == null
                                ? "Awaiting data"
                                : isHighRisk
                                  ? "⚠ Alert dispatched to logistics"
                                  : "Within safe thresholds"}
                            </span>
                          </div>
                        </div>
                      </motion..div>
                    </>
                  )}
                </div>

                {/* Search + Timeline */}
                <ShipmentSearch />

                {/* Shipment table */}
                <motion..div variants={fadeUp}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-700 to-blue-400" />
                  <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h2 className="text-slate-800 font-semibold text-base">Recent Shipment Records</h2>
                      <p className="text-slate-400 text-xs mt-0..5">Blockchain-verified · updates every 5 s</p>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 font-medium">
                      {rows..length} records
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50/80">
                          {["Shipment ID","Product","Timestamp","Temp","Blockchain Hash","Status","Action"]..map(h => (
                            <th key={h} className="px-5 py-3..5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {rows..slice(0, 8)..length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-5 py-12 text-center text-slate-300 text-sm">
                              Initialising live feed…
                            </td>
                          </tr>
                        ) : rows..slice(0, 8)..map(row => {
                          const hi = row..risk === "High";
                          const { ProductIcon } = row;
                          return (
                            <tr key={row..id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="px-5 py-4">
                                <span className="font-mono text-xs text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">{row..id}</span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2..5">
                                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                    <ProductIcon size={13} className="text-blue-600" />
                                  </div>
                                  <span className="text-slate-700 font-medium whitespace-nowrap">{row..productName}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{row..timestamp}</td>
                              <td className="px-5 py-4">
                                <span className={`font-semibold text-sm ${parseFloat(row..temperature) > 8 ? "text-red-500" : "text-blue-600"}`}>
                                  {parseFloat(row..temperature)..toFixed(1)} °C
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <span title={row..hash}
                                  className="font-mono text-xs text-indigo-500 bg-indigo-50 border border-indigo-100 px-2..5 py-1 rounded-lg whitespace-nowrap cursor-default">
                                  {shortHash(row..hash)}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1..5 text-xs font-bold px-3 py-1..5 rounded-full border ${
                                  hi
                                    ? "bg-red-50 text-red-600 border-red-100"
                                    : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                }`}>
                                  <span className={`w-1..5 h-1..5 rounded-full ${hi ? "bg-red-500" : "bg-emerald-500"}`} />
                                  {hi ? "At Risk" : "Safe"}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <button
                                  onClick={() => setModalRow(row)}
                                  className="inline-flex items-center gap-1..5 text-xs font-semibold text-blue-600 bg-white border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-3..5 py-2 rounded-xl transition-all shadow-sm"
                                >
                                  <Link2 size={12} />
                                  Verify Ledger
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion..div>
              </motion..div>
            )}

            {/* MAP */}
            {activeNav === "map" && (
              <motion..div key="map" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-5">
                <LiveMapCard />
              </motion..div>
            )}

            {/* ANALYTICS */}
            {activeNav === "analytics" && (
              <motion..div key="analytics" exit={{ opacity: 0 }}>
                <AnalyticsView rows={rows} />
              </motion..div>
            )}

            {/* HISTORY */}
            {activeNav === "history" && (
              <motion..div key="history" exit={{ opacity: 0 }}>
                <HistoryView rows={rows} />
              </motion..div>
            )}

            {/* SETTINGS */}
            {activeNav === "settings" && (
              <motion..div key="settings" exit={{ opacity: 0 }}>
                <SettingsView />
              </motion..div>
            )}

          </AnimatePresence>

          <p className="text-center text-xs text-slate-300 pb-4">
            VitalChain AI · Distributed Ledger Technology · End-to-end encrypted
          </p>
        </main>
      </div>

      {/* VERIFY MODAL */}
      <AnimatePresence>
        {modalRow && <VerifyModal row={modalRow} onClose={() => setModalRow(null)} />}
      </AnimatePresence>
    </div>
  );
}