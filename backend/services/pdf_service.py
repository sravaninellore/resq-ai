import io
from typing import Dict, Any

def generate_doctor_pdf(triage_data: Dict[str, Any], patient_info: Dict[str, Any]) -> bytes:
    """
    Generates a formal Doctor-Ready Emergency Medical PDF report.
    """
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.lib import colors
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36
        )

        styles = getSampleStyleSheet()
        
        # Custom Styles
        title_style = ParagraphStyle(
            'DocTitle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            textColor=colors.HexColor("#DC2626"),
            spaceAfter=4
        )
        
        subtitle_style = ParagraphStyle(
            'DocSubtitle',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor("#475569"),
            spaceAfter=12
        )

        h2_style = ParagraphStyle(
            'Heading2',
            parent=styles['Heading2'],
            fontName='Helvetica-Bold',
            fontSize=13,
            textColor=colors.HexColor("#1E293B"),
            spaceBefore=10,
            spaceAfter=6
        )

        body_style = ParagraphStyle(
            'Body',
            parent=styles['Normal'],
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#334155")
        )

        warning_style = ParagraphStyle(
            'Warning',
            parent=styles['Normal'],
            fontName='Helvetica-Bold',
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#991B1B")
        )

        story = []

        # 1. Header
        story.append(Paragraph("ResQ AI — Emergency Triage & Clinical Summary Report", title_style))
        story.append(Paragraph("CONFIDENTIAL MEDICAL INCIDENT DOCUMENTATION • FOR ER ADMISSION & AMBULANCE HANDOVER", subtitle_style))
        story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor("#DC2626"), spaceAfter=15))

        # 2. Patient & Triage Meta Table
        severity = triage_data.get("severity", "CRITICAL")
        sev_color = colors.HexColor("#DC2626") if severity == "CRITICAL" else colors.HexColor("#EA580C")
        
        meta_data = [
            [
                Paragraph("<b>Patient Name / ID:</b> Emergency Intake", body_style),
                Paragraph(f"<b>Triage Level:</b> <font color='{sev_color.hexval()}'><b>{severity} ({triage_data.get('priority_code', 'PRIORITY 1')})</b></font>", body_style)
            ],
            [
                Paragraph(f"<b>Patient Age:</b> {patient_info.get('age', '35')} years", body_style),
                Paragraph(f"<b>Suspected Condition:</b> {triage_data.get('primary_condition', 'N/A')}", body_style)
            ],
            [
                Paragraph(f"<b>Intake Time:</b> Immediate Dispatch", body_style),
                Paragraph(f"<b>Target ER Facility:</b> {triage_data.get('hospital_type', 'Trauma Center')}", body_style)
            ]
        ]
        
        meta_table = Table(meta_data, colWidths=[270, 270])
        meta_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
            ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
            ('PADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(meta_table)
        story.append(Spacer(1, 15))

        # 3. ER Clinical Summary
        story.append(Paragraph("1. Clinical Incident Summary (Doctor Handover)", h2_style))
        story.append(Paragraph(triage_data.get("doctor_summary", "No clinical summary provided."), body_style))
        story.append(Spacer(1, 12))

        # 4. First Aid Protocol Executed
        story.append(Paragraph("2. Pre-Hospital Field Actions & First Aid Executed", h2_style))
        steps = triage_data.get("first_aid_steps", [])
        for idx, s in enumerate(steps, 1):
            story.append(Paragraph(f"• <b>Step {idx}:</b> {s}", body_style))
            story.append(Spacer(1, 3))
        story.append(Spacer(1, 10))

        # 5. Critical Safety Warnings ("DO NOT DO")
        story.append(Paragraph("3. Critical Safety Warnings & Contraindications", h2_style))
        donts = triage_data.get("do_not_do", [])
        for d in donts:
            story.append(Paragraph(f"⚠️ {d}", warning_style))
            story.append(Spacer(1, 4))
        story.append(Spacer(1, 12))

        # 6. Medical Guideline RAG References & Vision
        story.append(Paragraph("4. RAG Knowledge Base Sources & Vision Findings", h2_style))
        rag_sources = ", ".join(triage_data.get("rag_sources", ["Red Cross Emergency Care Manual"]))
        story.append(Paragraph(f"<b>Verified Knowledge Sources:</b> {rag_sources}", body_style))
        
        vision_findings = triage_data.get("vision_findings", [])
        if vision_findings:
            story.append(Paragraph("<b>AI Vision Assessment:</b> " + "; ".join(vision_findings), body_style))
        
        story.append(Spacer(1, 20))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceAfter=8))
        story.append(Paragraph("Generated by ResQ AI Crisis Intelligence • Developed by Sravani", subtitle_style))

        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes

    except Exception as e:
        print(f"[PDF Engine Fallback] Error building ReportLab PDF: {e}")
        # Plaintext emergency fallback
        fallback_text = (
            f"RESQ AI EMERGENCY CLINICAL REPORT\n"
            f"Severity: {triage_data.get('severity')}\n"
            f"Condition: {triage_data.get('primary_condition')}\n"
            f"Summary: {triage_data.get('doctor_summary')}\n"
        )
        return fallback_text.encode('utf-8')
