import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText, jobDescription } = await req.json();
  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return NextResponse.json({ error: "Resume and job description required" }, { status: 400 });
  }

  const prompt = `You are an expert ATS keyword analyzer. Do a deep, exhaustive keyword analysis comparing the resume against the job description.

Resume:
"""
${resumeText.slice(0, 4000)}
"""

Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Extract ALL meaningful keywords from the job description — technical skills, tools, domain knowledge, soft skills, responsibilities, industry terms, methodologies, certifications, job titles.

IMPORTANT: Do NOT include things like "2+ years experience", "5+ years", "Bachelor's degree" or any experience/education duration requirements as keywords. Only extract actual skills, tools, technologies, domain terms, and competencies.

Then check each keyword against the resume.

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{
  "matchRate": <number 0-100>,
  "matchLevel": "<Strong Match / Good Match / Partial Match / Low Match>",
  "summary": "<2-3 sentence honest assessment including what matches well and what gaps exist>",
  "matched": [
    "<every skill/tool/domain term from the JD found in the resume — be exhaustive>"
  ],
  "missing": [
    "<every skill/tool/domain term from the JD NOT in the resume — sorted by importance>"
  ],
  "suggestions": [
    "<specific actionable tip 1>",
    "<specific actionable tip 2>",
    "<specific actionable tip 3>",
    "<specific actionable tip 4>",
    "<specific actionable tip 5>"
  ]
}

Rules:
- Be EXHAUSTIVE: extract 30-50+ keywords total from the JD
- matched: all skills/tools/terms from JD found in resume (aim for 15-30)
- missing: all skills/tools/terms from JD NOT in resume (aim for 10-20)
- NEVER include experience duration ("2+ years", "5+ years") or degree requirements as keywords
- NEVER include generic phrases like "strong skills", "ability to", "knowledge of" — extract the actual skill behind them
- Do NOT group keywords — list each one separately
- matchRate = (matched / total keywords extracted) * 100`;

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
        temperature: 0.2,
        max_tokens: 1500,
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
