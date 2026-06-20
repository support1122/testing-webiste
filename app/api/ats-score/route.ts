import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText } = await req.json();
  if (!resumeText?.trim()) {
    return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) resume analyzer. Analyze the following resume and return a detailed ATS score report.

Resume:
"""
${resumeText.slice(0, 4000)}
"""

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "overallScore": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<1-2 sentence overall assessment>",
  "categories": [
    { "label": "Contact Info", "score": <0-25>, "maxScore": 25, "tip": "<specific feedback>" },
    { "label": "Formatting", "score": <0-20>, "maxScore": 20, "tip": "<specific feedback>" },
    { "label": "Keywords", "score": <0-25>, "maxScore": 25, "tip": "<specific feedback>" },
    { "label": "Action Verbs", "score": <0-15>, "maxScore": 15, "tip": "<specific feedback>" },
    { "label": "Achievements", "score": <0-15>, "maxScore": 15, "tip": "<specific feedback>" }
  ],
  "foundKeywords": ["<keyword1>", "<keyword2>", ...],
  "missingKeywords": ["<keyword1>", "<keyword2>", ...],
  "suggestions": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>", "<actionable tip 4>", "<actionable tip 5>"]
}

Rules:
- overallScore = sum of all category scores
- grade: A=85+, B=70+, C=55+, D=40+, F=below 40
- foundKeywords: list 8-15 strong keywords actually present in the resume
- missingKeywords: list 6-10 important keywords that are missing but relevant to the role
- suggestions: 3-6 specific, actionable improvements`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
