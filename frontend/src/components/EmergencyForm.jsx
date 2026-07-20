import React, { useState } from 'react';
import { Mic, MicOff, Upload, Activity, AlertTriangle, User, Camera, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

const QUICK_TAGS = [
  { id: 'bleeding', label: '🩸 Severe Bleeding' },
  { id: 'head_injury', label: '🧠 Head Trauma / Dizzy' },
  { id: 'chest_pain', label: '🫀 Chest Pain / Heart' },
  { id: 'fracture', label: '🦴 Bone Fracture' },
  { id: 'burn', label: '🔥 Thermal Burn' },
  { id: 'unconscious', label: '⚠️ Unconscious' },
  { id: 'choking', label: '🫁 Choking / Gasping' }
];

export default function EmergencyForm({ currentLang, onSubmit }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.EN;

  const [symptomsText, setSymptomsText] = useState('');
  const [age, setAge] = useState(45);
  const [selectedTags, setSelectedTags] = useState(['head_injury', 'bleeding']);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please type symptoms.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = currentLang === 'HI' ? 'hi-IN' : currentLang === 'TE' ? 'te-IN' : 'en-US';
    
    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSymptomsText((prev) => prev ? `${prev} ${transcript}` : transcript);
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      symptomsText,
      age,
      selectedTags,
      imageFile
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>
      <div className="glass-panel glass-card-critical" style={{ padding: '32px' }}>
        {/* Banner Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="pulse-badge critical">
              <span className="pulse-dot"></span> LIVE EMERGENCY INTAKE
            </div>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            AI Core Response Engine
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
          {t.intakeHeader}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px' }}>
          Describe the situation or upload photos. ResQ AI will synthesize medical RAG protocols & vision algorithms instantly.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Quick Indicator Tags */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>
              {t.quickTagsLabel}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {QUICK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    className={`tag-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input + Voice Recording */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {t.symptomLabel} *
              </label>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleVoiceInput}
                style={{ padding: '6px 12px', fontSize: '0.8rem', color: isRecording ? '#EF4444' : 'var(--accent-cyan)' }}
              >
                {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                <span>{isRecording ? "Listening..." : "Voice Input"}</span>
              </button>
            </div>
            <textarea
              className="input-field"
              rows={4}
              value={symptomsText}
              onChange={(e) => setSymptomsText(e.target.value)}
              placeholder={t.symptomPlaceholder}
              style={{ resize: 'vertical' }}
              required
            />
          </div>

          {/* Patient Age & Image Upload Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            {/* Age Input */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                <User size={16} color="var(--accent-cyan)" /> {t.ageLabel}
              </label>
              <input
                type="number"
                className="input-field"
                value={age}
                min={1}
                max={120}
                onChange={(e) => setAge(parseInt(e.target.value) || 35)}
                required
              />
            </div>

            {/* Injury Image Upload */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
                <Camera size={16} color="var(--accent-cyan)" /> {t.photoLabel}
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                border: '1.5px dashed rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                background: 'rgba(15, 23, 42, 0.5)',
                color: 'var(--text-muted)',
                fontSize: '0.88rem'
              }}>
                <Upload size={18} />
                <span>{imageFile ? imageFile.name : "Select or Drop Image..."}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Image Preview if uploaded */}
          {imagePreview && (
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px' }}>
              <img src={imagePreview} alt="Injury Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--accent-red)' }} />
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-red)' }}>Injury Photo Attached</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gemini Vision AI will perform visual wound scan.</p>
              </div>
            </div>
          )}

          {/* Submit Action CTA */}
          <button
            type="submit"
            className="btn-emergency"
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '12px' }}
          >
            <Sparkles size={22} />
            {t.analyzeBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
