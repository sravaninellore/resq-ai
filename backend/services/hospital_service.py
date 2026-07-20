from typing import List, Dict, Any

MOCK_HOSPITALS = [
    {
        "id": "hosp_1",
        "name": "Apex Central Trauma & Emergency Center",
        "type": "Level 1 Trauma Center & Neurosurgery",
        "distance_km": 1.8,
        "eta_mins": 4,
        "address": "450 Emergency Blvd, Healthcare District",
        "phone": "+1 (800) 555-RESQ",
        "emergency_beds": 12,
        "specialties": ["Trauma", "Neurosurgery", "Cardiology", "Burn Care"],
        "status": "IMMEDIATE ER ACCEPTANCE",
        "match_reasons": [
            "Level 1 Comprehensive Trauma Center with 24/7 Neurosurgery ER",
            "1.8 km away (4 min estimated transit time)",
            "Active ER capacity with immediate bed acceptance"
        ]
    },
    {
        "id": "hosp_2",
        "name": "St. Jude Cardiac & General Hospital",
        "type": "Level 2 Emergency & Heart Institute",
        "distance_km": 3.4,
        "eta_mins": 8,
        "address": "120 Medical Park Drive",
        "phone": "+1 (800) 555-9111",
        "emergency_beds": 6,
        "specialties": ["Cardiology", "ICU", "Internal Medicine"],
        "status": "ACCEPTED - LOW WAIT",
        "match_reasons": [
            "Specialized Cardiac ICU & Emergency Resuscitation Unit",
            "3.4 km away (8 min transit time)",
            "Low ER wait times for acute chest distress"
        ]
    },
    {
        "id": "hosp_3",
        "name": "City Children & General Emergency Clinic",
        "type": "Pediatric & Urgent Care Facility",
        "distance_km": 5.1,
        "eta_mins": 12,
        "address": "88 Community Avenue",
        "phone": "+1 (800) 555-CARE",
        "emergency_beds": 18,
        "specialties": ["Pediatric ER", "General Surgery", "Orthopedics"],
        "status": "OPEN",
        "match_reasons": [
            "Dedicated Pediatric ER & General Surgical Unit",
            "5.1 km away (12 min transit time)",
            "Open for non-life-threatening urgent care triage"
        ]
    }
]

def get_nearby_hospitals(severity: str = "CRITICAL", lat: float = None, lng: float = None) -> List[Dict[str, Any]]:
    """
    Returns prioritized emergency hospitals sorted by proximity and severity suitability.
    """
    hospitals = MOCK_HOSPITALS.copy()
    
    if severity == "CRITICAL":
        hospitals.sort(key=lambda x: (x["distance_km"], "Level 1" not in x["type"]))
    else:
        hospitals.sort(key=lambda x: x["distance_km"])

    return hospitals
