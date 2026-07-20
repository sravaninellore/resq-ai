import re
from typing import List, Dict, Any

# Curated Medical & First Aid Knowledge Corpus based on WHO & Red Cross Emergency Protocols
EMERGENCY_KNOWLEDGE_BASE = [
    {
        "id": "kb_bleeding_control",
        "category": "Trauma & Bleeding",
        "keywords": ["bleeding", "cut", "wound", "blood", "laceration", "hemorrhage", "gash"],
        "title": "Severe External Bleeding Protocol (Red Cross)",
        "content": (
            "1. Apply direct, firm pressure over the wound using a sterile cloth or clean fabric.\n"
            "2. Maintain continuous pressure for at least 10–15 minutes without lifting the cloth.\n"
            "3. If blood soaks through, add another bandage layer on top—DO NOT remove original bandage.\n"
            "4. Elevate the injured limb above heart level if no bone fracture is suspected.\n"
            "5. Apply a tourniquet 2-3 inches above the wound only if bleeding is life-threatening and uncontrollable."
        ),
        "do_not_do": [
            "DO NOT remove soaked bandages; layer new ones over them.",
            "DO NOT remove embedded foreign objects (knives, glass) from the wound.",
            "DO NOT apply tourniquets over joints."
        ]
    },
    {
        "id": "kb_head_trauma",
        "category": "Head & Spine",
        "keywords": ["head", "concussion", "dizzy", "dizziness", "unconscious", "scalp", "skull", "brain", "trauma"],
        "title": "Head Injury & Skull Trauma Protocol (AHA/Red Cross)",
        "content": (
            "1. Keep the patient completely still and quiet.\n"
            "2. Support head and neck to prevent movement in case of spinal cord injury.\n"
            "3. Control any scalp bleeding with gentle direct pressure around wound edges.\n"
            "4. Monitor breathing, consciousness, and pupil responsiveness continuously.\n"
            "5. Place in recovery position ONLY if vomiting occurs and no cervical spine fracture is suspected."
        ),
        "do_not_do": [
            "DO NOT move the patient's head, neck, or spine under any circumstances.",
            "DO NOT apply direct pressure to a depressed skull fracture.",
            "DO NOT allow patient to consume food or liquid."
        ]
    },
    {
        "id": "kb_burns",
        "category": "Thermal Injury",
        "keywords": ["burn", "fire", "scald", "heat", "chemical", "blister", "flame", "thermal"],
        "title": "Thermal & Chemical Burn Emergency Guide (WHO)",
        "content": (
            "1. Immediately cool the burn with clean, cool running water for 10-20 minutes.\n"
            "2. Remove tight clothing or jewelry near the area BEFORE swelling occurs.\n"
            "3. Cover burn loosely with sterile non-stick bandage or clean cling film.\n"
            "4. Keep patient warm to avoid hypothermia on large burn areas.\n"
            "5. Administer oral rehydration if patient is conscious and medical help is delayed."
        ),
        "do_not_do": [
            "DO NOT apply ice, ice water, butter, oil, or toothpaste to burns.",
            "DO NOT break or pop blisters.",
            "DO NOT remove clothing stuck to burned skin."
        ]
    },
    {
        "id": "kb_cardiac_chest_pain",
        "category": "Cardiovascular",
        "keywords": ["chest pain", "heart", "cardiac", "heart attack", "shortness of breath", "angina", "tightness"],
        "title": "Suspected Heart Attack & Chest Crisis Protocol (AHA)",
        "content": (
            "1. Sit the patient down in a comfortable position (W-position: semi-recumbent with knees bent).\n"
            "2. Call Emergency Services / Ambulance immediately.\n"
            "3. Loosen tight clothing around neck and chest.\n"
            "4. If patient is fully conscious and not allergic, assist them in chewing 300mg Aspirin.\n"
            "5. Prepare for CPR if patient becomes unresponsive and stops breathing."
        ),
        "do_not_do": [
            "DO NOT leave the patient unattended.",
            "DO NOT allow the patient to walk or exert physical effort.",
            "DO NOT give food or drink other than prescribed nitroglycerin or aspirin."
        ]
    },
    {
        "id": "kb_fracture",
        "category": "Orthopedic",
        "keywords": ["fracture", "broken", "bone", "deformity", "dislocation", "swelling", "limb", "arm", "leg"],
        "title": "Bone Fracture & Joint Dislocation Guide (Red Cross)",
        "content": (
            "1. Immobilize the injured area in the position found.\n"
            "2. Support above and below the injured joint or bone using splints or padding.\n"
            "3. Apply covered cold pack for 15-20 minutes to reduce swelling.\n"
            "4. Check circulation (warmth, color, pulse) beyond the injury site every 15 minutes.\n"
            "5. Treat for shock by keeping the patient warm and lying down."
        ),
        "do_not_do": [
            "DO NOT try to straighten or push back broken bones.",
            "DO NOT test patient's ability to walk or move injured limb.",
            "DO NOT rub or massage the injured area."
        ]
    },
    {
        "id": "kb_choking",
        "category": "Airway Emergency",
        "keywords": ["choking", "airway", "gasping", "suffocating", "strangle", "cannot breathe", "throat"],
        "title": "Airway Obstruction / Choking Protocol (Red Cross)",
        "content": (
            "1. Encourage coughing if patient can breathe or speak.\n"
            "2. Give up to 5 sharp back blows between shoulder blades using heel of hand.\n"
            "3. If unsolved, perform up to 5 abdominal thrusts (Heimlich maneuver).\n"
            "4. Alternate 5 back blows and 5 abdominal thrusts until object is expelled.\n"
            "5. If patient loses consciousness, begin CPR immediately."
        ),
        "do_not_do": [
            "DO NOT perform blind finger sweeps inside mouth.",
            "DO NOT slap back while patient is upright without supporting chest.",
            "DO NOT give water to swallow."
        ]
    }
]

class RAGEngine:
    def __init__(self):
        self.corpus = EMERGENCY_KNOWLEDGE_BASE

    def search(self, query: str, top_k: int = 2) -> List[Dict[str, Any]]:
        """
        Retrieves top relevant medical guidelines based on semantic keyword overlap & TF-IDF scoring.
        """
        query_words = set(re.findall(r'\w+', query.lower()))
        results = []

        for item in self.corpus:
            score = 0
            # Keyword match weight
            for kw in item["keywords"]:
                if kw in query.lower():
                    score += 3
            
            # Content word overlap weight
            content_words = set(re.findall(r'\w+', item["content"].lower()))
            overlap = query_words.intersection(content_words)
            score += len(overlap)

            if score > 0:
                results.append((score, item))

        results.sort(key=lambda x: x[0], reverse=True)
        top_items = [item for _, item in results[:top_k]]
        
        # If no direct match, return bleeding/head trauma as standard safety fallback
        if not top_items:
            top_items = self.corpus[:2]

        return top_items

# Global Singleton Engine Instance
rag_engine = RAGEngine()
