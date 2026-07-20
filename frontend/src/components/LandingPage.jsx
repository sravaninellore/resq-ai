import React from 'react';
import { ShieldAlert, Zap, Globe, Building2, FileCheck, ArrowRight, Activity, Cpu, Database, PhoneCall, BookOpen } from 'lucide-react';
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
            EN, Hindi, Telugu & Spanish
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
            Upload wound or trauma photos for Gemini Vision AI to identify soft tissue damage and acute hemorrhage risks.
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
    </div>
  );
}
