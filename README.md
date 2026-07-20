# 🚑 ResQ AI — Emergency Crisis Response & Medical Triage Platform

> **Theme**: Crisis Management, HealthTech & Emergency Response  
> **Developed by**: Sravani Nellore  
> **Tagline**: Reduced Emergency Response Time • Instant AI Pre-Hospital Triage • Doctor-Ready Reports

---

## 🎯 Problem Statement
During medical emergencies, road accidents, or natural disasters, victim panic and pre-hospital response delays can be fatal. First responders and bystanders often lack immediate clinical guidance, leading to improper handling or critical delay before reaching specialized trauma care.

**ResQ AI** solves this by delivering an end-to-end multimodal emergency triage system that combines visual injury scanning, verified WHO/Red Cross knowledge base retrieval (RAG), AI severity scoring, and instant doctor handover summaries.

---

## 🧠 AI Pipeline Architecture

```
+-------------------------------------------------------------------------------+
|                             RESQ AI FRONTEND (React + Vite)                   |
| - Multimodal Intake (Text, Age, Tags, Speech-to-Text Voice, Injury Photo)     |
| - One-Click Demo Emergency Scenarios (Road Accident, Burn, Snake Bite, Heart) |
| - GPS Geolocation Auto-Detection & Interactive Hospital Finder               |
| - Real-Time AI Processing Radar with 5-Step Checklist                         |
| - Emergency Severity Dashboard with AI Confidence Score & Risk Factors        |
| - Emergency Case ID Generator (e.g. RQ-2026-89421)                            |
| - Doctor-Scannable Emergency QR Code & ReportLab PDF Download                 |
| - Offline First Aid Cache & Multilingual Toggle (EN, HI, TE, TA)               |
+------------------------------------+------------------------------------------+
                                     | REST API / JSON
                                     v
+-------------------------------------------------------------------------------+
|                             FASTAPI BACKEND SERVER                            |
| - `/api/assess`       : Multimodal Emergency Triage Engine                    |
| - `/api/hospitals`    : Geolocation & Severity Hospital Router                |
| - `/api/export-pdf`   : Doctor-Ready Emergency PDF Exporter (ReportLab)       |
| - `/api/rag-search`   : Medical Knowledge Retrieval                           |
+------------------------------------+------------------------------------------+
                                     |
           +-------------------------+-------------------------+
           |                                                   |
           v                                                   v
+-----------------------------------+             +-----------------------------------+
|     WHO & RED CROSS RAG ENGINE    |             |       GEMINI 2.0 / 1.5 VISION      |
|  Vector Search on First Aid Rules |             |  Soft Tissue & Wound Trauma Scan  |
+-----------------------------------+             +-----------------------------------+
```

---

## ✨ Features That Win Hackathons

1. ⚡ **Multimodal Emergency Intake**: Text, symptom chips, patient age, speech-to-text voice input, and trauma photo upload.
2. ⚡ **One-Click Demo Emergency Scenarios**: Preset buttons for **Road Accident**, **Child Burn**, **Snake Bite**, **Heart Attack**, and **Stroke** for instant 1-click testing.
3. 📍 **Automatic Geolocation Detection**: `navigator.geolocation` auto-detects user coordinates to calculate nearest trauma center distance and ETA.
4. 🫀 **AI Severity & Confidence Score**: Displays `CRITICAL` (96% Confidence), `HIGH`, `MEDIUM`, or `LOW` with color-coded pulse badges.
5. 🔍 **"WHY AI Predicted This" Rationale Panel**: Transparent reasoning checklist showing exact clinical triggers and risk factor breakdown.
6. 🏷️ **Official Emergency Case ID**: Unique tracking identifier (e.g., `RQ-2026-89421`) on Dashboard, PDF, and QR Code.
7. 📊 **Interactive Incident Timeline**: Visual 5-step progress line tracking patient intake to hospital handover.
8. 📄 **Doctor-Ready Emergency PDF Summary**: Downloadable formal PDF report generated using `ReportLab`.
9. 📲 **Scannable Emergency QR Code**: Generates a mobile QR code on the dashboard for instant ER doctor report lookup.
10. 🚑 **Emergency Contacts & Dispatch Bar**: Direct call buttons for **108 Ambulance**, **100 Police**, **Family Contact Alert**, and **Share Location**.
11. 🏥 **Hospital Match Reasoning**: Displays explicit reasons why each hospital was matched (*Level 1 Trauma Unit, 1.8 km away, 4 min ETA*).
12. 🌍 **Offline First Aid Quick-Guide**: Client-cached emergency guidance interface for disaster zones without internet access.
13. 🌐 **Multilingual Support**: Instant toggle between **English (EN), Hindi (HI), Telugu (TE), and Tamil (TA)**.
14. ⚖️ **Medical AI Safety Disclaimer**: Prominent clinical safety notice on all outputs.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Lucide Icons, Glassmorphic Vanilla CSS |
| **Backend** | FastAPI (Python), PyDantic, ReportLab, Pillow |
| **AI / RAG Core** | Google Gemini 2.0/1.5 API + WHO/Red Cross Vector Retrieval |
| **Location & Maps** | HTML5 Geolocation API + Google Maps Navigation Embed |
| **Deployment** | Vercel Multi-Service Platform |

---

## 📂 Project Structure

```
resq-ai/
├── README.md                     # Project documentation & architecture
├── vercel.json                   # Vercel multi-service configuration
├── backend/
│   ├── main.py                   # FastAPI server & REST routes
│   ├── config.py                 # Environment configuration
│   ├── requirements.txt          # Python dependencies
│   ├── services/
│   │   ├── rag_engine.py         # WHO / Red Cross Knowledge Retrieval
│   │   ├── vision_engine.py      # Gemini Vision Injury Scan
│   │   ├── triage_engine.py      # AI Severity & Reasoning Engine
│   │   ├── hospital_service.py   # Geolocation Hospital Router
│   │   └── pdf_service.py        # ReportLab PDF Report Exporter
│   └── tests/
│       └── test_resq.py          # Standalone verification unit tests
└── frontend/
    ├── index.html                # Web app entry point
    ├── package.json              # React & Vite dependencies
    ├── vite.config.js            # Vite proxy & build config
    └── src/
        ├── App.jsx               # Application view router & state
        ├── index.css             # Emergency theme design system
        ├── components/
        │   ├── LandingPage.jsx   # Hero section, AI Pipeline & Future Scope
        │   ├── Header.jsx        # Top Navbar & SOS Hotline
        │   ├── EmergencyForm.jsx # Geolocation & Multimodal Intake
        │   ├── AnalysisLoader.jsx# 5-Step AI Processing Radar
        │   ├── TriageResults.jsx # Severity Badge, Reasons, QR Code & PDF
        │   ├── HospitalFinder.jsx# Hospital Routing & Map Route Widget
        │   └── OfflineGuide.jsx  # Client-cached offline search
        └── utils/
            ├── translations.js   # Multilingual dictionary
            └── qrHelper.js       # Mobile QR Code generator
```

---

## 🚀 Local Setup & Installation

### 1. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```
*Backend runs on `http://localhost:8000`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🔮 Future Scope & Enterprise Roadmap

- ⌚ **Wearable Telemetry Integration**: Real-time Apple Watch & Garmin heart rate & SpO2 streaming during transit.
- 🚑 **Ambulance Telemetry Handover**: Live pre-hospital vital signs dashboard for ER doctors.
- 📱 **Offline Edge LLM**: On-device quantized Llama-3 8B model for zero-network disaster zones.
- 🩺 **Hospital ER Intake Portal**: Dedicated physician dashboard with active patient queuing.

---

## 📜 Medical AI Disclaimer
> *ResQ AI provides pre-hospital decision support based on AI analysis and verified emergency protocols. It is designed to assist emergency triage and is not a substitute for professional medical advice or licensed emergency physician care.*
