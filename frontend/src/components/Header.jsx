import React from 'react';
import { ShieldAlert, Globe, Wifi, WifiOff, PhoneCall } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function Header({ currentLang, setLang, isOnline, onViewChange, currentView }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  return (
    <header style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(11, 15, 25, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '16px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand Header */}
        <div 
          onClick={() => onViewChange('form')} 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #DC2626, #EF4444)',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
          }}>
            <ShieldAlert size={26} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.5rem', 
              fontWeight: 900, 
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              ResQ <span style={{ color: 'var(--accent-red)' }}>AI</span>
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Emergency Hotline Direct Button */}
          <a 
            href="tel:108" 
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-emergency" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <PhoneCall size={16} /> 108 / 911 HOTLINE
            </button>
          </a>

          {/* View Toggle */}
          <button 
            className="btn-secondary" 
            onClick={() => onViewChange(currentView === 'offline' ? 'form' : 'offline')}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            {currentView === 'offline' ? t.emergencyBtn : t.quickGuideBtn}
          </button>

          {/* Online/Offline Status Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '9999px',
            background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            border: isOnline ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
            fontSize: '0.8rem',
            color: isOnline ? '#34D399' : '#FBBF24',
            fontWeight: 600
          }}>
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span>{isOnline ? 'NETWORK ACTIVE' : 'OFFLINE MODE'}</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Globe size={16} color="var(--accent-cyan)" />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.85rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="EN" style={{ background: '#111827' }}>English (EN)</option>
              <option value="HI" style={{ background: '#111827' }}>हिंदी (HI)</option>
              <option value="TE" style={{ background: '#111827' }}>తెలుగు (TE)</option>
              <option value="ES" style={{ background: '#111827' }}>Español (ES)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
