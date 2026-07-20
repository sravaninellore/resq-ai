import json
from typing import Dict, Any, List
from config import GEMINI_API_KEY
from services.rag_engine import rag_engine
from services.vision_engine import vision_engine

class TriageEngine:
    def __init__(self):
        self.gemini_available = bool(GEMINI_API_KEY)
        if self.gemini_available:
            try:
                from google import genai
                self.client = genai.Client(api_key=GEMINI_API_KEY)
            except Exception as e:
                print(f"[TriageEngine] Gemini client init fallback: {e}")
                self.gemini_available = False

    def assess_emergency(
        self,
        symptoms_text: str,
        age: int = 35,
        symptom_tags: List[str] = None,
        image_bytes: bytes = None,
        image_filename: str = ""
    ) -> Dict[str, Any]:
        """
        Executes complete multimodal emergency triage combining RAG + Vision + LLM reasoning.
        """
        symptom_tags = symptom_tags or []
        combined_symptoms = f"{symptoms_text} {' '.join(symptom_tags)}".strip()

        # 1. Execute RAG Retrieval from Medical Guidelines
        rag_results = rag_engine.search(combined_symptoms, top_k=2)
        rag_context_str = "\n\n".join([f"--- Protocol: {r['title']} ---\n{r['content']}\nDO NOT DO: {' '.join(r['do_not_do'])}" for r in rag_results])

        # 2. Execute Vision Assessment if photo attached
        vision_result = vision_engine.analyze_image(image_bytes, image_filename) if image_bytes else {"has_image": False, "findings": []}

        # 3. Prompt Construction for Gemini AI Core
        prompt = f"""
You are ResQ AI, an elite medical emergency triage intelligence system.
Analyze the following patient emergency intake and formulate a rapid clinical triage decision.

PATIENT INTAKE:
- Patient Age: {age}
- Symptoms / Situation: {combined_symptoms}
- Visual Assessment Findings: {json.dumps(vision_result.get('findings', []))}

VERIFIED RED CROSS / WHO RAG GUIDANCE CONTEXT:
{rag_context_str}

OUTPUT REQUIREMENTS:
Respond ONLY with a valid JSON object matching this schema:
{{
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "primary_condition": "Suspected main injury or medical event",
  "priority_code": "IMMEDIATE - RED TAG" | "URGENT - YELLOW TAG" | "NON-URGENT - GREEN TAG",
  "first_aid_steps": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "do_not_do": ["Warning 1", "Warning 2"],
  "ambulance_recommendation": "Recommended ambulance type and action",
  "hospital_type": "Specialized hospital type required (e.g. Level 1 Trauma Center)",
  "doctor_summary": "Clean, technical medical summary paragraph ready for ER doctor intake"
}}
"""

        # Try Gemini API execution
        if self.gemini_available:
            try:
                response = self.client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=prompt
                )
                text = response.text or ""
                # Parse JSON block
                clean_json = text.strip()
                if "```json" in clean_json:
                    clean_json = clean_json.split("```json")[1].split("```")[0].strip()
                elif "```" in clean_json:
                    clean_json = clean_json.split("```")[1].split("```")[0].strip()

                parsed = json.loads(clean_json)
                parsed["rag_sources"] = [r["title"] for r in rag_results]
                parsed["vision_findings"] = vision_result.get("findings", [])
                return parsed
            except Exception as e:
                print(f"[TriageEngine] Gemini API call error: {e}")

        # Intelligent Heuristic Fallback Triage (Guarantees zero-downtime during hackathon)
        return self._heuristic_fallback(combined_symptoms, age, rag_results, vision_result)

    def _heuristic_fallback(
        self,
        symptoms: str,
        age: int,
        rag_results: List[Dict[str, Any]],
        vision_result: Dict[str, Any]
    ) -> Dict[str, Any]:
        s_lower = symptoms.lower()
        
        # High-risk triggers
        is_critical = any(kw in s_lower for kw in ["head", "bleeding", "unconscious", "chest pain", "heart", "dizzy", "stroke", "fire", "choking"])
        is_high = any(kw in s_lower for kw in ["fracture", "broken", "burn", "deep cut", "severe pain", "asthma"])

        if is_critical or vision_result.get("visual_severity") == "CRITICAL":
            severity = "CRITICAL"
            priority = "IMMEDIATE - RED TAG (PRIORITY 1)"
            ambulance = "Call ALS (Advanced Life Support) Emergency Ambulance Immediately (Dial 108 / 911)"
            hospital = "Level 1 Emergency Trauma & Comprehensive Surgical ER"
        elif is_high:
            severity = "HIGH"
            priority = "URGENT - YELLOW TAG (PRIORITY 2)"
            ambulance = "Dispatch Standard Emergency Medical Services Ambulance"
            hospital = "General Hospital Emergency Room & Orthopedic Unit"
        else:
            severity = "MEDIUM"
            priority = "STABLE - GREEN TAG (PRIORITY 3)"
            ambulance = "Standard Non-Emergency Transport / Patient Drive-In"
            hospital = "Nearest Urgent Care Facility / Primary Clinic"

        # Combine steps from RAG
        steps = []
        warnings = []
        for r in rag_results:
            lines = r["content"].split("\n")
            for l in lines:
                if l.strip() and len(steps) < 5:
                    steps.append(l.strip("12345. "))
            warnings.extend(r.get("do_not_do", []))

        if not steps:
            steps = [
                "Keep patient stationary, calm, and warmly covered.",
                "Maintain open airway and continuously monitor breathing and pulse.",
                "Apply clean sterile compress if any bleeding is observed.",
                "Do not leave patient unattended until emergency responders arrive."
            ]

        if not warnings:
            warnings = [
                "DO NOT give any food, drink, or oral medications until evaluated by a doctor.",
                "DO NOT move patient if spinal cord injury or neck trauma is suspected."
            ]

        condition_name = "Acute Trauma / Emergency Symptom Complex"
        if "head" in s_lower or "dizzy" in s_lower:
            condition_name = "Suspected Closed Head Injury & Concussion Risk"
        elif "bleeding" in s_lower or "cut" in s_lower:
            condition_name = "Acute Soft Tissue Hemorrhage"
        elif "chest" in s_lower or "heart" in s_lower:
            condition_name = "Acute Coronary Symptom / Cardiac Distress"
        elif "burn" in s_lower:
            condition_name = "Thermal Burn Injury"

        summary = (
            f"Patient ({age}y) presents with acute symptoms: {symptoms}. "
            f"Triage triage severity assigned as {severity} ({priority}). "
            f"Initial field management focused on maintaining stability, preventing secondary tissue damage, "
            f"and routing to {hospital} via {ambulance}."
        )

        return {
            "severity": severity,
            "primary_condition": condition_name,
            "priority_code": priority,
            "first_aid_steps": steps[:5],
            "do_not_do": list(set(warnings))[:4],
            "ambulance_recommendation": ambulance,
            "hospital_type": hospital,
            "doctor_summary": summary,
            "rag_sources": [r["title"] for r in rag_results],
            "vision_findings": vision_result.get("findings", [])
        }

triage_engine = TriageEngine()
