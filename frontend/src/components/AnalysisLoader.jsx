import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, Cpu, Database, Navigation } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

const STEPS = [
  { icon: Cpu, title: "1. AI Vision Injury Analysis", desc: "Scanning wound patterns & soft tissue distress..." },
  { icon: Database, title: "2. WHO & Red Cross RAG Lookup", desc: "Retrieving verified first-aid emergency protocols..." },
  { icon: Activity, title: "3. Triage Severity & Contraindications", desc: "Evaluating emergency priority & safety warnings..." },
  { icon: Navigation, title: "4. Trauma Center & Ambulance Routing", desc: "Locating nearest specialized ER hospital facilities..." }
];

export default function AnalysisLoader({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: '650px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div className="glass-panel glass-card-critical" style={{ padding: '40px 30px' }}>
        {/* Radar Spinner */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px auto',
          borderRadius: '50%',
          border: '3px solid rgba(239, 68, 68, 0.2)',
          borderTopColor: 'var(--accent-red)',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
          {t.analyzingTitle}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Synthesizing multimodal AI findings into verified pre-hospital triage instructions.
        </p>

        {/* Step Progress List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
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
                  background: isCurrent ? 'rgba(239, 68, 68, 0.12)' : isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrent ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: isDone ? 'rgba(16, 185, 129, 0.2)' : isCurrent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDone ? '#34D399' : isCurrent ? '#F87171' : 'var(--text-muted)'
                }}>
                  <IconComponent size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: isCurrent ? '#F87171' : isDone ? '#34D399' : '#9CA3AF', margin: 0 }}>
                    {s.title}
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
