import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.rag_engine import rag_engine
from services.vision_engine import vision_engine
from services.triage_engine import triage_engine
from services.hospital_service import get_nearby_hospitals
from services.pdf_service import generate_doctor_pdf

def test_rag_engine_search():
    results = rag_engine.search("head injury dizzy bleeding", top_k=2)
    assert len(results) > 0
    titles = [r["title"] for r in results]
    assert any("Head Injury" in t or "Bleeding" in t for t in titles)
    print("[OK] RAG engine search passed")

def test_vision_engine_fallback():
    res = vision_engine.analyze_image(b"fake_image_content", "wound.jpg")
    assert res["has_image"] is True
    assert "findings" in res
    assert len(res["findings"]) > 0
    print("[OK] Vision engine fallback passed")

def test_triage_engine_assessment():
    res = triage_engine.assess_emergency(
        symptoms_text="Head injury, bleeding, dizzy",
        age=52,
        symptom_tags=["head_injury", "bleeding"]
    )
    assert res["severity"] in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    assert len(res["first_aid_steps"]) > 0
    assert len(res["do_not_do"]) > 0
    assert "doctor_summary" in res
    print("[OK] Triage engine assessment passed")

def test_hospital_service():
    hospitals = get_nearby_hospitals("CRITICAL")
    assert len(hospitals) >= 2
    assert "distance_km" in hospitals[0]
    print("[OK] Hospital service passed")

def test_pdf_generation():
    triage_info = {
        "severity": "CRITICAL",
        "priority_code": "IMMEDIATE - RED TAG",
        "primary_condition": "Suspected Head Injury",
        "first_aid_steps": ["Apply direct pressure", "Do not move patient"],
        "do_not_do": ["DO NOT move neck"],
        "doctor_summary": "Test clinical summary for ER handover.",
        "rag_sources": ["Red Cross Protocol"]
    }
    pdf_bytes = generate_doctor_pdf(triage_info, {"age": 52})
    assert pdf_bytes is not None
    assert len(pdf_bytes) > 100
    print("[OK] PDF report generation passed")

if __name__ == "__main__":
    test_rag_engine_search()
    test_vision_engine_fallback()
    test_triage_engine_assessment()
    test_hospital_service()
    test_pdf_generation()
    print("\nALL RESQ AI BACKEND TESTS PASSED SUCCESSFULLY!")
