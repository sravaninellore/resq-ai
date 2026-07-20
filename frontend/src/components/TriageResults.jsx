import React from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, FileText, Download, PhoneCall, Stethoscope, ArrowLeft, Eye } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

export default function TriageResults({ currentLang, triageData, patientInfo, onReset, onDownloadPdf, pdfDownloading }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  if (!triageData) return null;

  const severity = triageData.severity || "CRITICAL";
  const isCritical = severity === "CRITICAL";
  const isHigh = severity === "HIGH";

  const badgeColorClass = isCritical ? 'critical' : isHigh ? 'high' : 'medium';

  return (
    <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
      {/* Back Button */}
      <button 
        className="btn-secondary" 
        onClick={onReset}
        style={{ marginBottom: '20px', fontSize: '0.85rem' }}
      >
        <ArrowLeft size={16} /> Start New Assessment
      </button>

      {/* Main Results Container */}
      <div className="glass-panel glass-card-critical" style={{ padding: '36px', marginBottom: '30px' }}>
        {/* Severity Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '24px',
          marginBottom: '28px'
        }}>
          <div>
            <div className={`pulse-badge ${badgeColorClass}`} style={{ marginBottom: '12px' }}>
              <span className="pulse-dot"></span> SEVERITY: {severity} ({triageData.priority_code})
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {triageData.primary_condition}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="tel:108" style={{ textDecoration: 'none' }}>
              <button className="btn-emergency" style={{ padding: '12px 20px', fontSize: '0.95rem' }}>
                <PhoneCall size={18} /> CALL 108 AMBULANCE
              </button>
            </a>

            <button 
              className="btn-secondary" 
              onClick={onDownloadPdf}
              disabled={pdfDownloading}
              style={{ background: 'rgba(6, 182, 212, 0.2)', borderColor: 'var(--accent-cyan)', color: '#67E8F9' }}
            >
              <Download size={18} />
              {pdfDownloading ? "Generating PDF..." : t.downloadPdf}
            </button>
          </div>
        </div>

        {/* AI Vision & RAG Badges if available */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {triageData.vision_findings && triageData.vision_findings.length > 0 && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', color: '#FCA5A5', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Eye size={14} /> AI Vision: Injury Scan Verified
            </div>
          )}
          {triageData.rag_sources && triageData.rag_sources.map((src, i) => (
            <div key={i} style={{ background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', color: '#67E8F9' }}>
              📚 RAG Protocol: {src}
            </div>
          ))}
        </div>

        {/* Two Column Protocol Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Step by Step First Aid */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <CheckCircle2 size={22} color="var(--accent-cyan)" /> {t.firstAidHeader}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {triageData.first_aid_steps && triageData.first_aid_steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '0.92rem', lineHeight: '1.5', color: '#E2E8F0' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: 'var(--accent-cyan)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DO NOT DO Critical Warnings */}
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#F87171', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <AlertOctagon size={22} color="#F87171" /> {t.doNotDoHeader}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {triageData.do_not_do && triageData.do_not_do.map((warning, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', lineHeight: '1.5', color: '#FCA5A5' }}>
                  <span style={{ fontWeight: 800 }}>⚠️</span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Doctor Summary Paragraph */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Stethoscope size={18} color="var(--accent-cyan)" /> Pre-Hospital Clinical Summary (ER Handover)
          </h4>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
            {triageData.doctor_summary}
          </p>
        </div>

      </div>
    </div>
  );
}
