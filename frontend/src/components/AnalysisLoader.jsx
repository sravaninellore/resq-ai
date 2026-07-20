import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Database, Navigation, FileCheck, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

const STEPS = [
  { icon: Cpu, title: "1. Reading Symptoms & Metadata", desc: "Synthesizing text, voice transcript & patient age..." },
  { icon: Activity, title: "2. Checking Emergency Severity Level", desc: "Calculating priority tag & risk contraindications..." },
  { icon: Database, title: "3. Searching Medical Guidelines (RAG)", desc: "Retrieving verified WHO & Red Cross protocols..." },
  { icon: Navigation, title: "4. Locating Trauma Hospitals", desc: "Routing to nearest Level 1 ER facility via GPS..." },
  { icon: FileCheck, title: "5. Generating Doctor-Ready Report", desc: "Formulating clinical summary & QR code..." }
];

export default function AnalysisLoader({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: '680px', margin: '50px auto', padding: '0 20px', textAlign: 'center' }}>
      <div className="glass-panel glass-card-critical" style={{ padding: '40px 30px' }}>
        
        {/* Radar Pulse Spinner */}
        <div style={{
          width: '76px',
          height: '76px',
          margin: '0 auto 24px auto',
          borderRadius: '50%',
          border: '3px solid rgba(239, 68, 68, 0.2)',
          borderTopColor: 'var(--accent-red)',
          animation: 'spin 0.9s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
          {t.analyzingTitle}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Multimodal AI Processing Pipeline Active • RAG Engine Querying
        </p>

        {/* 5-Step Detailed Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
          {STEPS.map((s, idx) => {
            const IconComponent = s.icon;
            const isDone = idx < activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: isDone ? 'rgba(16, 185, 129, 0.1)' : isCurrent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : isCurrent ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isDone ? 'rgba(16, 185, 129, 0.25)' : isCurrent ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDone ? '#34D399' : isCurrent ? '#F87171' : 'var(--text-muted)',
                  flexShrink: 0
                }}>
                  {isDone ? <CheckCircle2 size={20} color="#34D399" /> : <IconComponent size={20} />}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isDone ? '#34D399' : isCurrent ? '#F87171' : '#9CA3AF', margin: 0 }}>
                    {isDone ? `✔ ${s.title}` : s.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
