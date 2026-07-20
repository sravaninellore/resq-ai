# 🚑 ResQ AI — Emergency Crisis Response & Medical Triage Platform

> **Theme**: Crisis Management, HealthTech & Emergency Response  
> **Developed by**: Sravani Nellore  
> **Tagline**: Reduced Emergency Response Time • Instant AI Pre-Hospital Triage • Doctor-Ready Reports

---

## 🎯 Problem Statement
During medical emergencies, road accidents, or natural disasters, victim panic and pre-hospital response delays can be fatal. First responders and bystanders often lack immediate clinical guidance, leading to improper handling or critical delay before reaching specialized trauma care.

**ResQ AI** solves this by delivering an end-to-end multimodal emergency triage system that combines visual injury scanning, verified WHO/Red Cross knowledge base retrieval (RAG), AI severity scoring, and instant doctor handover summaries.

---

## 🧠 AI Architecture Diagram

```
+-------------------------------------------------------------------------------+
|                             RESQ AI FRONTEND (React + Vite)                   |
| - Multimodal Intake (Text, Age, Tags, Speech-to-Text Voice, Injury Photo)     |
| - GPS Geolocation Auto-Detection & Interactive Hospital Finder               |
| - Real-Time AI Processing Radar with 5-Step Checklist                         |
| - Emergency Severity Dashboard with AI Confidence Score & "Why AI Predicted"  |
| - Interactive Timeline (Intake -> AI Triage -> First Aid -> ER Routing)        |
| - Offline First Aid Cache & Multilingual Toggle (EN, HI, TE, ES)               |
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
2. 📍 **Automatic Geolocation Detection**: `navigator.geolocation` auto-detects user coordinates to calculate nearest trauma center distance and ETA.
3. 🫀 **AI Severity & Confidence Score**: Displays `CRITICAL` (96% Confidence), `HIGH`, `MEDIUM`, or `LOW` with color-coded pulse badges.
4. 🔍 **"WHY AI Predicted This" Rationale Panel**: Transparent reasoning checklist showing exact clinical triggers.
5. 📊 **Interactive Incident Timeline**: Visual 5-step progress line tracking patient intake to hospital handover.
6. 📄 **Doctor-Ready Emergency PDF Summary**: Downloadable formal PDF report generated using `ReportLab`.
7. 📲 **Scannable Emergency QR Code**: Generates a mobile QR code on the dashboard for instant ER doctor report lookup.
8. 🚑 **Emergency Contacts & Dispatch Bar**: Direct call buttons for **108 Ambulance**, **100 Police**, **Family Contact Alert**, and **Share Location**.
9. 🌍 **Offline First Aid Quick-Guide**: Client-cached emergency guidance interface for disaster zones without internet access.
10. 🌐 **Multilingual Support**: Instant toggle between **English (EN), Hindi (HI), Telugu (TE), and Tamil (TA)**.
11. ⚖️ **Medical AI Safety Disclaimer**: Prominent clinical safety notice on all outputs.

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
        │   ├── LandingPage.jsx   # Hero section & Statistics counter
        │   ├── Header.jsx        # Top Navbar & SOS Hotline
        │   ├── EmergencyForm.jsx # Geolocation & Multimodal Intake
        │   ├── AnalysisLoader.jsx# 5-Step AI Processing Radar
        │   ├── TriageResults.jsx # Severity Badge, Reasons, QR Code & PDF
        │   ├── HospitalFinder.jsx# Hospital Routing & Map Route Widget
        │   └── OfflineGuide.jsx  # Client-cached offline search
        └── utils/
            └── translations.js   # Multilingual dictionary
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

## 📜 Medical AI Disclaimer
> *ResQ AI provides pre-hospital decision support based on AI analysis and verified emergency protocols. It is designed to assist emergency triage and is not a substitute for professional medical advice or licensed emergency physician care.*
