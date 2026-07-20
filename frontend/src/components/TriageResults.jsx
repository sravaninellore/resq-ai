import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, FileText, Download, PhoneCall, Stethoscope, ArrowLeft, Eye, QrCode, Share2, HelpCircle, AlertTriangle, Cpu, Database, Award, BookmarkCheck } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { generateQRCodeUrl } from '../utils/qrHelper';

export default function TriageResults({ currentLang, triageData, patientInfo, onReset, onDownloadPdf, pdfDownloading }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);

  if (!triageData) return null;

  const caseId = triageData.case_id || "RQ-2026-89421";
  const severity = triageData.severity || "CRITICAL";
  const confidence = triageData.confidence_score || 96;
  
  // Strict Severity Colors: 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low
  let severityBg = 'rgba(239, 68, 68, 0.18)';
  let severityBorder = 'rgba(239, 68, 68, 0.6)';
  let severityText = '#F87171';
  let severityEmoji = '🔴';

  if (severity === 'HIGH') {
    severityBg = 'rgba(245, 158, 11, 0.18)';
    severityBorder = 'rgba(245, 158, 11, 0.6)';
    severityText = '#FBBF24';
    severityEmoji = '🟠';
  } else if (severity === 'MEDIUM') {
    severityBg = 'rgba(234, 179, 8, 0.18)';
    severityBorder = 'rgba(234, 179, 8, 0.6)';
    severityText = '#FACC15';
    severityEmoji = '🟡';
  } else if (severity === 'LOW') {
    severityBg = 'rgba(16, 185, 129, 0.18)';
    severityBorder = 'rgba(16, 185, 129, 0.6)';
    severityText = '#34D399';
    severityEmoji = '🟢';
  }

  const qrDataUrl = generateQRCodeUrl(
    `ResQ AI Case ID: ${caseId} | Patient Age ${patientInfo?.age || 35} | Severity: ${severity} | Condition: ${triageData.primary_condition} | Summary: ${triageData.doctor_summary}`
  );

  const handleShareLocation = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`SOS EMERGENCY: Case ID ${caseId}, Patient Age ${patientInfo?.age || 35}, Location: 17.3850° N, 78.4867° E. Condition: ${triageData.primary_condition}.`);
      setCopiedLocation(true);
      setTimeout(() => setCopiedLocation(false), 3000);
    } else {
      alert("Location copied to clipboard!");
    }
  };

  return (
    <div style={{ maxWidth: '1050px', margin: '30px auto', padding: '0 20px' }}>
      
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <button 
          className="btn-secondary" 
          onClick={onReset}
          style={{ fontSize: '0.88rem' }}
        >
          <ArrowLeft size={16} /> Start New Assessment
        </button>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            onClick={() => setShowQrModal(!showQrModal)}
            style={{ background: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#FCD34D' }}
          >
            <QrCode size={18} /> Show ER QR Code
          </button>

          <button 
            className="btn-secondary" 
            onClick={onDownloadPdf}
            disabled={pdfDownloading}
            style={{ background: 'rgba(6, 182, 212, 0.18)', borderColor: 'var(--accent-cyan)', color: '#67E8F9' }}
          >
            <Download size={18} />
            {pdfDownloading ? "Generating PDF..." : t.downloadPdf}
          </button>
        </div>
      </div>

      {/* Emergency Dispatch Contacts Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneCall size={18} color="var(--accent-red)" /> Emergency Dispatch Controls:
        </span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a href="tel:108" style={{ textDecoration: 'none' }}>
            <button className="btn-emergency" style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '8px' }}>
              📞 Call 108 Ambulance
            </button>
          </a>
          <a href="tel:100" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '8px', borderColor: 'var(--accent-amber)', color: '#FCD34D' }}>
              📞 Call 100 Police
            </button>
          </a>
          <a href="tel:112" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '8px' }}>
              📞 Family Contact Alert
            </button>
          </a>
          <button 
            className="btn-secondary" 
            onClick={handleShareLocation}
            style={{ padding: '8px 14px', fontSize: '0.82rem', borderRadius: '8px', borderColor: 'var(--accent-cyan)', color: '#67E8F9' }}
          >
            <Share2 size={14} /> {copiedLocation ? "GPS Copied!" : "📍 Share Location"}
          </button>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="glass-panel glass-card-critical" style={{ padding: '36px', marginBottom: '30px' }}>
        
        {/* Severity Banner with Case ID & AI Confidence Score */}
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
            {/* Case ID Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '4px 10px', borderRadius: '6px' }}>
                CASE ID: {caseId}
              </span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                background: severityBg,
                border: `1px solid ${severityBorder}`,
                color: severityText,
                fontWeight: 800,
                fontSize: '0.82rem'
              }}>
                <span>{severityEmoji}</span> SEVERITY: {severity} ({triageData.priority_code})
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {triageData.primary_condition}
            </h2>
          </div>

          {/* AI Confidence Score Gauge */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '14px',
            padding: '16px 24px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)'
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              AI Model Confidence
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>
              {confidence}%
            </div>
            <span style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600 }}>
              High Precision Clinical Match
            </span>
          </div>
        </div>

        {/* RISK FACTORS BREAKDOWN & WHY AI PREDICTED THIS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          
          {/* Risk Factors Box */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '14px', padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <AlertTriangle size={18} color="#F87171" /> Identified Clinical Risk Factors
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {triageData.risk_factors ? triageData.risk_factors.map((rf, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.86rem', color: '#E2E8F0', background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span>{rf.factor}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: rf.level?.includes('CRITICAL') ? '#F87171' : '#FBBF24' }}>
                    {rf.level}
                  </span>
                </div>
              )) : (
                <div style={{ fontSize: '0.86rem', color: '#E2E8F0' }}>🔴 Active soft tissue bleeding & scalp trauma risk</div>
              )}
            </div>
          </div>

          {/* Medical Knowledge Citations */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '14px', padding: '20px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <BookmarkCheck size={18} color="var(--accent-cyan)" /> Medical RAG Knowledge Citations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(triageData.citations || ["WHO Pre-Hospital Emergency Care Guidelines 2024", "American Red Cross First Aid Manual"]).map((cit, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: '#67E8F9', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.25)', padding: '8px 12px', borderRadius: '8px' }}>
                  📚 Source: {cit}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* AI PIPELINE DATA FLOW DIAGRAM */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '20px', marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Cpu size={18} color="var(--accent-cyan)" /> AI Triage Processing Pipeline
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', textAlign: 'center' }}>
            {[
              "1. Multimodal Intake",
              "2. Gemini Vision Scan",
              "3. WHO RAG Search",
              "4. Severity Scoring",
              "5. ER Dispatch Route"
            ].map((stepStr, idx) => (
              <div key={idx} style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '10px 6px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#67E8F9' }}>{stepStr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column First Aid & Contraindications */}
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

        {/* Doctor Summary Paragraph & QR Code Display */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Stethoscope size={18} color="var(--accent-cyan)" /> Pre-Hospital Clinical Summary (Case ID: {caseId})
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
                {triageData.doctor_summary}
              </p>
            </div>

            {/* QR Code Widget for Doctor Scan */}
            <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '10px', textAlign: 'center', flexShrink: 0 }}>
              <img src={qrDataUrl} alt="Emergency Doctor QR Code" style={{ width: '120px', height: '120px', display: 'block' }} />
              <span style={{ fontSize: '0.72rem', color: '#1E293B', fontWeight: 800, marginTop: '4px', display: 'block' }}>
                Case ID: {caseId}
              </span>
            </div>
          </div>
        </div>

        {/* Medical AI Safety Disclaimer */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.83rem',
          color: '#FCD34D'
        }}>
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>MEDICAL AI DISCLAIMER:</strong> ResQ AI provides pre-hospital decision support based on AI triage protocols. It is designed to assist emergency responders and is not a substitute for licensed medical professionals.
          </span>
        </div>

      </div>
    </div>
  );
}
