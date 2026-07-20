import React, { useState } from 'react';
import { Search, ShieldAlert, AlertTriangle, BookOpen } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

const OFFLINE_PROTOCOLS = [
  {
    category: "Severe Bleeding & Wounds",
    title: "Direct Pressure & Hemorrhage Control",
    steps: [
      "Place clean sterile dressing directly over the wound.",
      "Apply firm, continuous manual pressure for 10-15 minutes.",
      "Do NOT remove original soaked bandage; layer fresh bandages over it.",
      "Elevate the wound above heart level if no fracture is suspected."
    ],
    warnings: ["DO NOT remove embedded knives, glass, or foreign objects."]
  },
  {
    category: "Head Injury & Concussion",
    title: "Spine & Head Trauma Stabilization",
    steps: [
      "Keep patient lying flat with head and neck completely stationary.",
      "Place towels or rolled blankets on both sides of head to prevent turning.",
      "Monitor pupil size, speech clarity, and level of consciousness.",
      "Control superficial scalp bleeding with light direct pressure."
    ],
    warnings: ["DO NOT turn or bend patient's neck under any circumstances."]
  },
  {
    category: "CPR & Cardiac Arrest",
    title: "Hands-Only CPR Protocol",
    steps: [
      "Place heel of one hand in center of patient's chest, interlock other hand on top.",
      "Push hard and fast in center of chest at 100-120 compressions per minute.",
      "Allow chest to recoil completely between each compression.",
      "Continue CPR until emergency medical team arrives or AED is available."
    ],
    warnings: ["DO NOT interrupt chest compressions for more than 10 seconds."]
  },
  {
    category: "Burns & Chemical Injuries",
    title: "Cooling & Sterile Covering",
    steps: [
      "Cool burn immediately under cool running tap water for 10 to 20 minutes.",
      "Gently remove tight clothing or rings before swelling starts.",
      "Cover burn loosely with clean non-stick plastic wrap or sterile gauze."
    ],
    warnings: ["DO NOT apply ice, butter, oil, or toothpaste to burn surface."]
  }
];

export default function OfflineGuide({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = OFFLINE_PROTOCOLS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.steps.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        {/* Header Notice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px' }}>
          <AlertTriangle size={20} color="#FBBF24" />
          <span style={{ fontSize: '0.9rem', color: '#FCD34D', fontWeight: 600 }}>
            {t.offlineNotice}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={28} color="var(--accent-cyan)" /> Verified First Aid Quick-Guide
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
          Instant client-cached Red Cross emergency instructions for offline & disaster zone response.
        </p>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '14px' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search symptoms (e.g. bleeding, burn, head, CPR)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '44px' }}
          />
        </div>

        {/* Protocols Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                padding: '24px'
              }}
            >
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.15)', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                {item.category}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px 0' }}>
                {item.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                {item.steps.map((step, sIdx) => (
                  <p key={sIdx} style={{ fontSize: '0.9rem', color: '#E2E8F0', margin: 0, lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{sIdx + 1}.</strong> {step}
                  </p>
                ))}
              </div>

              {item.warnings && item.warnings.map((w, wIdx) => (
                <p key={wIdx} style={{ fontSize: '0.85rem', color: '#F87171', fontWeight: 600, margin: 0 }}>
                  ⚠️ {w}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
