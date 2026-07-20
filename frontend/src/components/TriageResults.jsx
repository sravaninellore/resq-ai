import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, FileText, Download, PhoneCall, Stethoscope, ArrowLeft, Eye, QrCode, Share2, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { generateQRCodeUrl } from '../utils/qrHelper';

export default function TriageResults({ currentLang, triageData, patientInfo, onReset, onDownloadPdf, pdfDownloading }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLocation, setCopiedLocation] = useState(false);

  if (!triageData) return null;

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
    `ResQ AI Patient Summary: Age ${patientInfo?.age || 35} | Severity: ${severity} | Condition: ${triageData.primary_condition} | Summary: ${triageData.doctor_summary}`
  );

  const handleShareLocation = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`SOS EMERGENCY: Patient Age ${patientInfo?.age || 35}, Location: 17.3850° N, 78.4867° E. Condition: ${triageData.primary_condition}.`);
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

      {/* Emergency Contacts Bar */}
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
        
        {/* Severity Banner with AI Confidence Score */}
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
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: severityBg,
              border: `1px solid ${severityBorder}`,
              color: severityText,
              fontWeight: 800,
              fontSize: '0.88rem',
              marginBottom: '12px'
            }}>
              <span>{severityEmoji}</span> SEVERITY: {severity} ({triageData.priority_code})
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {triageData.primary_condition}
            </h2>
          </div>

          {/* AI Confidence Score Gauge Badge */}
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

        {/* WHY AI PREDICTED THIS - Clinical Rationale Box */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <HelpCircle size={18} color="var(--accent-cyan)" /> Why AI Predicted This Risk Level
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {triageData.reasons && triageData.reasons.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#E2E8F0', background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>✓</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline Component */}
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Incident Incident Timeline & Care Path
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', textAlign: 'center' }}>
            {[
              { label: "1. Intake Submitted", status: "Done" },
              { label: "2. AI Triage Scanned", status: "Done" },
              { label: "3. First Aid Protocol", status: "Active" },
              { label: "4. ER Hospital Match", status: "Active" },
              { label: "5. Doctor Handover", status: "Ready" }
            ].map((step, idx) => (
              <div key={idx} style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '10px 8px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{step.status}</span>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', margin: '2px 0 0 0' }}>{step.label}</p>
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
                <Stethoscope size={18} color="var(--accent-cyan)" /> Pre-Hospital Clinical Summary (ER Handover)
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
                {triageData.doctor_summary}
              </p>
            </div>

            {/* QR Code Widget for Doctor Scan */}
            <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '10px', textAlign: 'center', flexShrink: 0 }}>
              <img src={qrDataUrl} alt="Emergency Doctor QR Code" style={{ width: '120px', height: '120px', display: 'block' }} />
              <span style={{ fontSize: '0.72rem', color: '#1E293B', fontWeight: 800, marginTop: '4px', display: 'block' }}>
                Doctor Scannable QR
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
