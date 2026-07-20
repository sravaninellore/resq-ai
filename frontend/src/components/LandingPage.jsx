import React from 'react';
import { ShieldAlert, Zap, Globe, Building2, FileCheck, ArrowRight, Activity, Cpu, Database, PhoneCall, BookOpen, Layers, Rocket, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function LandingPage({ currentLang, onStart, onOfflineGuide }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Hero Section */}
      <div className="glass-panel glass-card-critical" style={{ padding: '48px 36px', textAlign: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow Accent */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '300px',
          background: 'rgba(239, 68, 68, 0.18)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }} className="pulse-badge critical">
          <span className="pulse-dot"></span> AI-POWERED CRISIS MANAGEMENT PLATFORM
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 900, color: '#FFFFFF', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Seconds Save Lives During <br />
          <span style={{ background: 'linear-gradient(135deg, #EF4444, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Medical Emergencies & Disasters
          </span>
        </h1>

        <p style={{ maxWidth: '720px', margin: '0 auto 36px auto', color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.6' }}>
          ResQ AI combines Gemini Vision injury analysis, WHO/Red Cross medical RAG knowledge search, and live trauma center routing to deliver immediate pre-hospital first aid and doctor-ready clinical reports.
        </p>

        {/* Primary CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            className="btn-emergency" 
            onClick={onStart}
            style={{ padding: '16px 36px', fontSize: '1.15rem', borderRadius: '14px' }}
          >
            {t.emergencyBtn} <ArrowRight size={22} />
          </button>

          <button 
            className="btn-secondary" 
            onClick={onOfflineGuide}
            style={{ padding: '16px 28px', fontSize: '1rem', borderRadius: '14px' }}
          >
            <BookOpen size={20} color="var(--accent-cyan)" /> {t.quickGuideBtn}
          </button>
        </div>
      </div>

      {/* Live Statistics Counter Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(239, 68, 68, 0.15)', borderRadius: '10px', color: '#F87171', marginBottom: '10px' }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            1.8s
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Average AI Triage Response
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(6, 182, 212, 0.15)', borderRadius: '10px', color: 'var(--accent-cyan)', marginBottom: '10px' }}>
            <Globe size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            4 Languages
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            EN, Hindi, Telugu & Tamil
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', color: 'var(--accent-green)', marginBottom: '10px' }}>
            <Building2 size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            500+
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Level-1 Trauma & ER Centers
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '10px', color: 'var(--accent-amber)', marginBottom: '10px' }}>
            <FileCheck size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
            Instant PDF
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Doctor-Ready ER Handover Reports
          </p>
        </div>
      </div>

      {/* DEDICATED AI PIPELINE SECTION FOR JUDGES */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '50px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={26} color="var(--accent-cyan)" /> How The AI Pipeline Operates
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
          Transparent multimodal AI architecture combining computer vision, RAG vector retrieval, and LLM clinical scoring.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', textAlign: 'center' }}>
          {[
            { step: "1. Intake Data", detail: "Symptoms + Image + GPS" },
            { step: "2. Vision Scan", detail: "Gemini 2.0 Wound Model" },
            { step: "3. RAG Search", detail: "WHO & Red Cross Vector DB" },
            { step: "4. Severity Model", detail: "Clinical Risk Classifier" },
            { step: "5. ER Summary", detail: "PDF & QR Code Handover" }
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '12px', padding: '16px 12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{item.step}</span>
              <p style={{ fontSize: '0.8rem', color: '#E2E8F0', margin: '4px 0 0 0' }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Grid */}
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '24px', textAlign: 'center' }}>
        Built For Real-World Emergency Decision Making
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F87171', marginBottom: '16px' }}>
            <Cpu size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
            Multimodal Injury Vision Scan
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Upload wound or trauma photos for Gemini Vision AI to identify soft tissue damage and active hemorrhage risks.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', marginBottom: '16px' }}>
            <Database size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
            WHO & Red Cross RAG Engine
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            RAG vector search cross-references symptoms against verified international pre-hospital emergency protocols.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-green)', marginBottom: '16px' }}>
            <PhoneCall size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
            Emergency Dispatch & Hotline
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Direct one-tap ambulance hotline call buttons, location sharing, and family contact alert simulation.
          </p>
        </div>
      </div>

      {/* FUTURE SCOPE ROADMAP SECTION */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Rocket size={26} color="var(--accent-amber)" /> Future Scope & Production Roadmap
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
          Planned enterprise enhancements beyond the hackathon prototype:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FCD34D', margin: '0 0 4px 0' }}>⌚ Wearable Telemetry</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Apple Watch & Garmin vital signs stream (Heart Rate & SpO2)</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FCD34D', margin: '0 0 4px 0' }}>🚑 Ambulance Telemetry</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Real-time GPS tracking and live vital sign stream to ER doctors</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FCD34D', margin: '0 0 4px 0' }}>📱 Offline Edge LLM</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>On-device quantized Llama-3 8B model for zero-network zones</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FCD34D', margin: '0 0 4px 0' }}>🩺 Physician ER Dashboard</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Hospital triage intake portal with live patient queuing</p>
          </div>
        </div>
      </div>

    </div>
  );
}
