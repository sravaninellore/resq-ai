import json
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import HOST, PORT, DEBUG
from services.triage_engine import triage_engine
from services.rag_engine import rag_engine
from services.hospital_service import get_nearby_hospitals
from services.pdf_service import generate_doctor_pdf

app = FastAPI(
    title="ResQ AI Backend",
    description="Emergency Crisis Management & Triage API Engine",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmergencyAssessRequest(BaseModel):
    symptoms: str
    age: Optional[int] = 35
    symptom_tags: Optional[List[str]] = []

@app.get("/")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "ResQ AI Crisis Management API",
        "gemini_active": triage_engine.gemini_available,
        "version": "1.0.0"
    }

@app.post("/api/assess")
async def assess_emergency(
    symptoms: str = Form(...),
    age: int = Form(35),
    symptom_tags: Optional[str] = Form("[]"),
    image: Optional[UploadFile] = File(None)
):
    """
    Multimodal emergency assessment endpoint (handles text, age, tags, and optional injury image).
    """
    try:
        parsed_tags = json.loads(symptom_tags) if symptom_tags else []
    except Exception:
        parsed_tags = []

    image_bytes = None
    filename = ""
    if image:
        image_bytes = await image.read()
        filename = image.filename or "injury.jpg"

    result = triage_engine.assess_emergency(
        symptoms_text=symptoms,
        age=age,
        symptom_tags=parsed_tags,
        image_bytes=image_bytes,
        image_filename=filename
    )
    return result

@app.get("/api/hospitals")
def list_hospitals(severity: str = "CRITICAL", lat: Optional[float] = None, lng: Optional[float] = None):
    return {
        "hospitals": get_nearby_hospitals(severity, lat, lng)
    }

@app.get("/api/rag-search")
def search_knowledge(q: str):
    results = rag_engine.search(q, top_k=3)
    return {"query": q, "results": results}

@app.post("/api/export-pdf")
async def export_pdf(data: dict):
    """
    Generates and returns doctor-ready PDF emergency report binary.
    """
    triage_info = data.get("triage", {})
    patient_info = data.get("patient", {"age": 35})
    
    pdf_bytes = generate_doctor_pdf(triage_info, patient_info)
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=ResQ_Emergency_Report.pdf"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=DEBUG)
