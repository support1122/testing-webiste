"use client";

import { useCallback, useRef, useState } from "react";
import { Bot, BriefcaseBusiness, Copy, Info, RotateCcw, Sparkles, Wand2 } from "lucide-react";

type Tone = "concise" | "confident" | "senior";

interface Template {
  tone: Tone;
  opener: string;
  situation: string; // use {{role}}
  task: string;
  action: string;
  result: string;   // use {{achievement}}
  why: string;
}

const TEMPLATES: Template[] = [
  // ── CONFIDENT ──────────────────────────────────────────────────────────────
  {
    tone: "confident",
    opener: "Here is a confident answer you can use as a base:",
    situation: "While working as a {{role}}, I identified a critical gap in our workflow that was quietly eroding team output and stakeholder trust.",
    task: "I took full ownership — scoped the problem, aligned the key stakeholders, and committed to a clear resolution timeline.",
    action: "I broke the work into focused sprints, removed blockers in real time, and communicated progress transparently so leadership was never caught off guard.",
    result: "The outcome: {{achievement}}. The team now operates with a repeatable playbook instead of institutional tribal knowledge.",
    why: "I bring that same combination of urgency and follow-through to every role I step into.",
  },
  {
    tone: "confident",
    opener: "A bold, results-first draft — personalize the specifics:",
    situation: "As a {{role}}, I spotted a recurring problem that others had flagged but nobody had formally owned. I stepped up.",
    task: "My goal was to turn a vague, chronic issue into a concrete, bounded project with a clear owner, timeline, and success metric.",
    action: "I ran a structured root-cause session, built a targeted fix, and got cross-functional buy-in before shipping anything.",
    result: "We landed it: {{achievement}}. Stakeholders noticed the change immediately and the improvement has held.",
    why: "That ownership mindset is exactly what I'd bring here from day one.",
  },
  {
    tone: "confident",
    opener: "Here's a strong, ownership-forward draft to build from:",
    situation: "In my {{role}} role, I inherited a process that technically worked — but left significant value on the table.",
    task: "I was accountable for diagnosing the real bottleneck, building the business case for change, and executing without waiting for permission.",
    action: "I piloted a lightweight experiment first, validated the signal, then scaled the fix with a clear communication plan so no one was blindsided.",
    result: "The result: {{achievement}}. It also unblocked two downstream teams who had been quietly working around the same issue.",
    why: "I thrive in environments where ownership is real — and I'd bring that energy directly to this team.",
  },
  {
    tone: "confident",
    opener: "Here's a draft that leads with impact — make the details yours:",
    situation: "As a {{role}}, I was pulled into a situation where the team had hit a wall and needed someone to cut through the noise.",
    task: "I took responsibility for both diagnosing what was actually wrong and driving the fix — no handoffs, full accountability end to end.",
    action: "I aligned the right people in a single 30-minute session, distributed ownership of action items, and tracked progress with weekly check-ins.",
    result: "We closed it out: {{achievement}}. I also documented the process so it wouldn't require heroics to maintain.",
    why: "Moving fast with clarity under pressure is something I've built into how I work — and I'd bring that here.",
  },
  {
    tone: "confident",
    opener: "Confident and direct — personalize this with your real numbers:",
    situation: "Working as a {{role}}, I noticed the team was making decisions with incomplete information and paying for it with rework.",
    task: "My mandate was to fix the information gap, get everyone on the same page, and prevent the same misalignment from happening again.",
    action: "I built a lightweight shared source of truth, trained the team in one session, and set up a review cadence to keep it current.",
    result: "From that point forward: {{achievement}}. Decision quality improved and the rework cycles nearly disappeared.",
    why: "I'm at my best when I can bring structure to ambiguity — and this role looks like a great fit for that.",
  },
  {
    tone: "confident",
    opener: "Here's a high-ownership framing — swap in your real details:",
    situation: "As a {{role}}, I flagged a risk early that, left unaddressed, would have escalated into a much bigger problem by end of quarter.",
    task: "I took it on personally: understand the blast radius, find the fastest safe fix, and make sure leadership had visibility without alarm.",
    action: "I moved quickly — implemented a stop-gap within 48 hours, then built the permanent solution over the following two weeks.",
    result: "The risk never materialized: {{achievement}}. We turned a potential incident into a quiet win.",
    why: "Proactive problem detection and clean execution is the value I consistently bring — I'd do the same here.",
  },
  {
    tone: "confident",
    opener: "A results-first draft — replace the generic parts with your story:",
    situation: "During a high-pressure quarter in my {{role}} role, I took on a challenge that most people on the team were hoping someone else would own.",
    task: "I committed to delivering a measurable outcome, not just effort. That meant setting a clear goal, resourcing it properly, and not letting it slip.",
    action: "I used a daily standup with two key collaborators, resolved conflicts quickly by escalating only what truly needed leadership input.",
    result: "We delivered: {{achievement}}. On time, under budget, and with a team that was genuinely proud of the work.",
    why: "That's how I operate: commit clearly, deliver consistently, and make the people around me better in the process.",
  },
  {
    tone: "confident",
    opener: "Here's a sharp, confident draft to personalize:",
    situation: "As a {{role}}, I saw an opportunity to deliver real impact on a problem the business cared about but hadn't yet invested in solving.",
    task: "I wrote up a one-page case for why this mattered, got 15 minutes with the right stakeholder, and walked out with approval to run a pilot.",
    action: "I ran the pilot lean — small team, tight timeline, clear success criteria — and built in a mechanism to capture what we learned.",
    result: "The pilot validated the approach: {{achievement}}. We scaled it the next quarter.",
    why: "I love identifying high-ROI opportunities and building the business case to act on them. I'd bring that here.",
  },

  // ── CONCISE ────────────────────────────────────────────────────────────────
  {
    tone: "concise",
    opener: "Here is a concise answer you can adapt:",
    situation: "In my {{role}} role, I identified a process problem that was slowing the team down and creating avoidable friction.",
    task: "I owned the fix — root cause, stakeholder alignment, solution design.",
    action: "I broke it into pieces, prioritized the highest-impact changes, and shipped incrementally so the team could see progress quickly.",
    result: "Result: {{achievement}}. The team has a cleaner process now and the improvement has stuck.",
    why: "Same approach here: diagnose clearly, move quickly, follow through.",
  },
  {
    tone: "concise",
    opener: "Short and sharp — personalize the specifics:",
    situation: "Working as a {{role}}, I noticed a gap that was quietly costing the team time every week.",
    task: "I took it on: scoped it, found the root cause, and built the fix.",
    action: "Ran a focused sprint, kept the stakeholders updated, shipped the solution.",
    result: "Outcome: {{achievement}}. No regression since.",
    why: "That's how I work — find the real problem, fix it properly, move on.",
  },
  {
    tone: "concise",
    opener: "Clean and direct — here's a draft to start from:",
    situation: "As a {{role}}, I inherited a broken workflow and was expected to make it work.",
    task: "My job: understand what was actually broken, not just what appeared broken, and fix the right thing.",
    action: "I dug into the data, found the root cause, and implemented a targeted solution with minimal disruption.",
    result: "It worked: {{achievement}}. Faster than expected and with full stakeholder buy-in.",
    why: "I cut through noise quickly and fix things that actually matter — that's what I'd do here.",
  },
  {
    tone: "concise",
    opener: "Here is a brief, structured answer draft:",
    situation: "During my time as a {{role}}, the team hit a recurring problem that nobody had properly solved.",
    task: "I stepped up, scoped it, and owned the resolution.",
    action: "Mapped the issue, aligned with one key stakeholder, and implemented a fix that addressed the root cause — not just the symptom.",
    result: "We got there: {{achievement}}. Clean and durable.",
    why: "I bring focused execution and clear communication — the same skills I'd use here.",
  },
  {
    tone: "concise",
    opener: "A focused, to-the-point draft for you:",
    situation: "As a {{role}}, I spotted a cross-team bottleneck that everyone was working around but nobody had formally addressed.",
    task: "I proposed a fix, got approval in one meeting, and executed.",
    action: "Kept the scope tight, communicated the change early, delivered without drama.",
    result: "End result: {{achievement}}. Two teams unblocked immediately.",
    why: "That's how I prefer to work — identify the real problem, fix it, move on.",
  },
  {
    tone: "concise",
    opener: "Here's a concise STAR draft — swap in your real details:",
    situation: "Working as a {{role}}, I was asked to solve a problem that had been on the backlog for months.",
    task: "I made it a sprint priority, set a two-week deadline, and committed to a specific outcome.",
    action: "Prioritized ruthlessly, cut scope where it didn't matter, and shipped the core fix on time.",
    result: "Delivered: {{achievement}}. Under the deadline and within scope.",
    why: "I work best with clear constraints and full ownership — that's what I'd bring here.",
  },
  {
    tone: "concise",
    opener: "Tight and purposeful — here's a starting draft:",
    situation: "As a {{role}}, I noticed the team was losing time on a problem that had a fixable root cause.",
    task: "I investigated, built a solution, and got it shipped.",
    action: "One-week turnaround. Two collaborators. Clear communication throughout.",
    result: "The fix landed: {{achievement}}. Measurable and sustained.",
    why: "I move fast on the things that matter. I'd do the same here.",
  },
  {
    tone: "concise",
    opener: "Here's a direct, no-fluff draft to build from:",
    situation: "In my {{role}} position, I caught a problem early that would have caused significant rework if left alone.",
    task: "I flagged it, owned the resolution, and kept the timeline intact.",
    action: "Quick diagnosis, targeted fix, clean handoff — no surprises for the broader team.",
    result: "Clean outcome: {{achievement}}. Zero rework downstream.",
    why: "Early detection and clean execution — that's the value I bring.",
  },
  {
    tone: "concise",
    opener: "Simple and structured — personalize with your story:",
    situation: "As a {{role}}, I was brought in to fix something that wasn't working and nobody had clearly owned.",
    task: "My task: take ownership, find the real problem, and fix it.",
    action: "Scoped it in a day. Had a working solution in a week. Communicated throughout.",
    result: "Result: {{achievement}}. Team was relieved. Leadership noticed.",
    why: "Fast, focused, and reliable — that's how I'd show up here too.",
  },

  // ── SENIOR ─────────────────────────────────────────────────────────────────
  {
    tone: "senior",
    opener: "Here is a senior-level answer with clear ownership:",
    situation: "In my {{role}} capacity, I identified a systemic issue that was creating drag across multiple teams and masking itself as an execution problem.",
    task: "I reframed the problem for leadership — shifting it from 'people aren't working hard enough' to 'the system is designed to produce exactly these results' — and took accountability for the redesign.",
    action: "I ran a structured diagnosis, brought in cross-functional perspectives, and designed an intervention at the system level rather than patching individual symptoms.",
    result: "The redesign worked: {{achievement}}. Three teams reported improved velocity in the following quarter as a direct result.",
    why: "I bring strategic framing, execution credibility, and the ability to work across levels of an organization. That's what I'd contribute here.",
  },
  {
    tone: "senior",
    opener: "Here's a leadership-framed draft for your review:",
    situation: "As a senior {{role}}, I was accountable for a domain that was underperforming — not because of effort, but because of structural misalignment.",
    task: "My responsibility was to diagnose the real constraint, build stakeholder alignment around a new direction, and lead the change without disrupting ongoing operations.",
    action: "I mapped the value chain, identified the single highest-leverage intervention point, and built a phased plan that minimized risk while maximizing reversibility.",
    result: "We moved the needle: {{achievement}}. The change also surfaced a secondary improvement opportunity that we captured the following quarter.",
    why: "This is the kind of systems-level thinking I'd apply here — find the real lever, build alignment, execute with discipline.",
  },
  {
    tone: "senior",
    opener: "A strategic, senior perspective — refine with your details:",
    situation: "In a {{role}} role, I was brought in during a period of significant organizational change — and asked to stabilize a function that had lost direction.",
    task: "My mandate was to rebuild clarity of purpose, re-establish trust with key stakeholders, and put the function on a path toward measurable impact.",
    action: "I started with listening: 12 stakeholder conversations in week one. Then I synthesized the findings into a 90-day plan, got explicit alignment from leadership, and began executing.",
    result: "By the end of the engagement: {{achievement}}. More importantly, the team had re-developed a shared identity and a clear north star.",
    why: "I've built the muscle for turning ambiguous, high-stakes situations into organized, high-performing systems. I'd bring that here.",
  },
  {
    tone: "senior",
    opener: "Here's a principal-level framing to work from:",
    situation: "As a {{role}}, I owned a strategic initiative that cut across four teams and had no natural home in the org chart.",
    task: "My job was to create the structure this initiative needed to succeed — governance, decision rights, communication rhythms — without adding unnecessary bureaucracy.",
    action: "I designed a lightweight operating model, assembled a working group with clear roles, and established a weekly decision forum that resolved blockers in real time.",
    result: "The initiative delivered: {{achievement}}. It also became a model for how we run cross-functional work going forward.",
    why: "Creating clarity and momentum in ambiguous, cross-functional environments is a core strength I'd contribute here.",
  },
  {
    tone: "senior",
    opener: "Senior tone, strong narrative — personalize below:",
    situation: "In my {{role}} capacity, I recognized that a significant business risk was hiding inside a process that everyone assumed was working fine.",
    task: "I had to make the invisible visible — quantify the risk, build the case for action, and get leadership aligned before the risk materialized.",
    action: "I combined qualitative signals from the team with quantitative data from our systems, built a risk brief for the executive team, and proposed a time-boxed remediation sprint.",
    result: "We addressed it before it became a crisis: {{achievement}}. Leadership cited this as an example of the kind of proactive thinking they want more of.",
    why: "I'm wired to see around corners and act before problems become emergencies. That's the value I'd bring to this role.",
  },
  {
    tone: "senior",
    opener: "Here's a strong senior-level draft — make it yours:",
    situation: "As a {{role}}, I was asked to lead a post-mortem on a significant failure — one that had affected customers and damaged trust with a key partner.",
    task: "Beyond the post-mortem itself, I was tasked with rebuilding the internal operating practices that had allowed the failure to happen without early warning.",
    action: "I ran the post-mortem with psychological safety as the primary design constraint — blameless, structured, and focused on systemic causes. Then I converted findings into five operational changes, each with a DRI and a measurable success criterion.",
    result: "We rebuilt the foundation: {{achievement}}. The partner relationship was restored and we haven't had a repeat incident.",
    why: "I know how to learn from failure fast and convert lessons into durable operational improvements. I'd apply that capability here.",
  },
  {
    tone: "senior",
    opener: "A leadership draft that shows strategic range:",
    situation: "In my {{role}} role, I identified that two adjacent teams were solving the same problem independently — creating duplicated effort, inconsistent user experiences, and technical debt.",
    task: "I took on the politically complex task of proposing a consolidation, getting both team leads aligned, and designing a shared solution without either team feeling like they lost.",
    action: "I ran structured interviews with both teams, mapped their requirements onto a single framework, and proposed a shared ownership model with clear interface boundaries. Then I facilitated three working sessions to turn the proposal into a joint commitment.",
    result: "The consolidation succeeded: {{achievement}}. Both teams are now co-owners of a single, better solution.",
    why: "Navigating organizational complexity to unlock better outcomes is something I've done consistently — and something I'd do here.",
  },
  {
    tone: "senior",
    opener: "Senior-level and ownership-forward — adapt this for your interview:",
    situation: "As a {{role}}, I inherited a team that was technically capable but organizationally scattered — unclear priorities, low morale, and high attrition risk.",
    task: "My first responsibility was to stabilize the team: clarify priorities, rebuild psychological safety, and give people a reason to stay and invest.",
    action: "I ran skip-levels in week one, hosted a team offsite in week three to co-build a team charter, and established a new operating rhythm with clear priorities and visible progress.",
    result: "Within 90 days: {{achievement}}. Attrition dropped, velocity improved, and two team members told me it was the best they'd felt about their work in over a year.",
    why: "Building high-performing teams in ambiguous, high-pressure environments is where I do my best work — and where I'd want to contribute here.",
  },
  {
    tone: "senior",
    opener: "Here's a strategic framing — make the story yours:",
    situation: "Working as a senior {{role}}, I spotted a misalignment between the roadmap we were executing and the business outcomes leadership actually cared about.",
    task: "I needed to reorient the team without creating chaos — shifting direction mid-flight while protecting morale, relationships, and delivery commitments.",
    action: "I facilitated a focused strategy session with the team, used outcome-based reframing to show how our existing work could be repositioned to higher-value goals, and got alignment in a single working session rather than months of debate.",
    result: "The pivot landed cleanly: {{achievement}}. We delivered more business value in the next quarter than in the previous two combined.",
    why: "Strategic clarity and the ability to bring teams with you through change — that's the edge I'd bring to this role.",
  },

  // ── MORE CONFIDENT ─────────────────────────────────────────────────────────
  {
    tone: "confident",
    opener: "Here's a direct, confident draft — personalize it:",
    situation: "As a {{role}}, I was handed a project mid-flight that was behind schedule and over budget, with a demoralized team.",
    task: "I had to reset expectations with stakeholders, re-energize the team, and find a path to a credible outcome — fast.",
    action: "I held a transparent reset meeting with all stakeholders on day two, rebuilt the plan from actual capacity (not wishful thinking), and introduced a daily 15-minute standup to surface blockers immediately.",
    result: "We turned it around: {{achievement}}. The project closed on the new timeline and the team finished in a stronger place than they started.",
    why: "I take messy situations and make them clean. That's a skill I'd put to work immediately here.",
  },
  {
    tone: "confident",
    opener: "Results-led and ownership-forward — here's your draft:",
    situation: "While in a {{role}} capacity, I discovered that a key assumption underpinning our strategy was wrong — and that we'd been building on a faulty foundation for two quarters.",
    task: "I had to make the case for pivoting without triggering a crisis of confidence in the team or the product.",
    action: "I assembled the evidence carefully, framed the pivot as 'course correction based on new signal' rather than failure, and led the strategic replanning with the team rather than presenting a top-down solution.",
    result: "We pivoted cleanly: {{achievement}}. The new direction aligned better with user needs and the team felt heard in the process.",
    why: "Intellectual honesty and the ability to change course without losing momentum — that's something I'd bring here.",
  },
  {
    tone: "confident",
    opener: "A confident, impact-first draft to adapt:",
    situation: "In my {{role}} role, I noticed that our onboarding process was causing early churn — users were leaving before they experienced the core value.",
    task: "I championed a redesign, secured resourcing, and led the cross-functional team through a six-week sprint.",
    action: "I established clear success metrics before we started, ran weekly demos with stakeholders to maintain alignment, and shipped iteratively so we could learn as we went.",
    result: "The redesign paid off: {{achievement}}. Retention in the first 30 days improved significantly.",
    why: "Customer-centric thinking with strong execution discipline — I'd apply both directly in this role.",
  },

  // ── MORE CONCISE ───────────────────────────────────────────────────────────
  {
    tone: "concise",
    opener: "A clean, concise draft — fill in your real details:",
    situation: "As a {{role}}, I found a problem that was easy to ignore but expensive to leave alone.",
    task: "I prioritized it, scoped it properly, and got it fixed.",
    action: "Short timeline, small team, clear outcome criteria. Delivered.",
    result: "The fix: {{achievement}}. Still holding.",
    why: "That's my default mode — find the thing that matters, fix it right.",
  },
  {
    tone: "concise",
    opener: "Here's a no-fluff draft to start from:",
    situation: "Working as a {{role}}, I flagged a dependency risk that the project plan hadn't accounted for.",
    task: "I owned the mitigation — identified alternatives, presented options, got a decision made.",
    action: "Moved in 48 hours. Kept the project on track.",
    result: "Outcome: {{achievement}}. No schedule impact.",
    why: "I'm wired for early risk detection and fast, clean resolution.",
  },
  {
    tone: "concise",
    opener: "Short and structured — make it yours:",
    situation: "As a {{role}}, I was asked to solve a problem under a tight deadline with limited resources.",
    task: "I scoped ruthlessly, focused on the 20% that would drive 80% of the outcome, and executed.",
    action: "Two-week sprint. Daily syncs with one key collaborator. Shipped on time.",
    result: "Result: {{achievement}}. The constrained approach actually produced a cleaner solution.",
    why: "Constraints make me sharper. I'd bring that same focus here.",
  },
  {
    tone: "concise",
    opener: "Clean and direct — here's a starting point:",
    situation: "During my time as a {{role}}, I spotted an inefficiency that the team had normalized but that was quietly costing us.",
    task: "I proposed a fix, got a quick green light, and ran with it.",
    action: "Scoped it, shipped it, documented it. Three weeks start to finish.",
    result: "The payoff: {{achievement}}. Team noticed immediately.",
    why: "I see things others normalize. Then I fix them. I'd do the same here.",
  },

  // ── MORE SENIOR ────────────────────────────────────────────────────────────
  {
    tone: "senior",
    opener: "Here's a senior-level answer showing organizational impact:",
    situation: "As a {{role}}, I was asked to evaluate why a high-priority initiative had stalled despite significant investment.",
    task: "My job was to diagnose the real blocker — organizational, technical, or strategic — and propose a credible path forward.",
    action: "I ran a structured discovery: interviewed ten stakeholders, reviewed the project artifacts, and identified three distinct failure modes that were compounding each other. I presented a clear diagnosis with a prioritized remediation plan.",
    result: "The initiative got back on track: {{achievement}}. Leadership used my diagnostic framework on two other stalled projects.",
    why: "I'm particularly good at diagnosing why things aren't working and building the organizational will to fix them. That's what I'd bring here.",
  },
  {
    tone: "senior",
    opener: "A strategic, systems-level draft — personalize below:",
    situation: "In my {{role}} capacity, I identified that our metrics were measuring activity, not impact — and that the entire team was optimizing for the wrong things.",
    task: "I needed to shift the measurement culture without demoralizing a team that had been working hard by the old definitions.",
    action: "I introduced the concept of outcome-based metrics through a workshop rather than a mandate, let the team design their own KPIs within a framework, and committed to reviewing them quarterly.",
    result: "Culture shifted: {{achievement}}. The team is now genuinely outcome-focused and the quality of strategic conversations has improved dramatically.",
    why: "Changing culture through inclusion rather than imposition — that's a capability I'd apply here.",
  },
  {
    tone: "senior",
    opener: "Here's a senior framing that shows range — adapt it:",
    situation: "As a {{role}}, I was responsible for a partnership that had significant strategic value but was increasingly strained at the operational level.",
    task: "My job was to repair the relationship, identify the operational root cause, and put a governance model in place that would prevent future friction.",
    action: "I opened with an honest conversation directly with my counterpart — no agenda, just listening. Then I mapped the points of friction, identified the two that were causing 80% of the strain, and proposed a joint task force to resolve them.",
    result: "The partnership stabilized: {{achievement}}. We're now considered a reference customer for their enterprise program.",
    why: "Relationship repair and structural governance are underrated skills — and ones I'd put to use here.",
  },
  {
    tone: "senior",
    opener: "Senior-level and cross-functional — here's your draft:",
    situation: "Working as a {{role}}, I discovered that two business units had developed conflicting roadmaps that, if left unresolved, would create significant customer confusion and internal duplication.",
    task: "I was asked to broker alignment — a politically sensitive task that required both parties to give something up.",
    action: "I facilitated a structured negotiation over three sessions, starting with shared goals rather than individual positions. I built a joint scorecard that made trade-offs visible and kept the conversation grounded in customer value.",
    result: "Alignment achieved: {{achievement}}. The combined roadmap was stronger than either standalone version.",
    why: "I bring the kind of credibility and facilitation skill that makes hard alignment conversations productive rather than painful.",
  },
  {
    tone: "senior",
    opener: "A leadership-level draft with strategic depth:",
    situation: "In a {{role}} role, I led a team through a significant technology migration during a period of organizational uncertainty.",
    task: "My challenge was to maintain delivery quality and team morale while navigating a migration that had unclear business sponsorship and shifting requirements.",
    action: "I instituted a bi-weekly 'state of the migration' communication to all stakeholders, built a risk register with named owners, and created explicit decision escalation paths so the team was never blocked waiting for direction.",
    result: "We completed the migration: {{achievement}}. Zero unplanned downtime and the team emerged with stronger cross-functional relationships.",
    why: "Leading complex change with clarity and composure — that's the capability I'd bring to this role from day one.",
  },

  // ── EXTRA VARIED ───────────────────────────────────────────────────────────
  {
    tone: "confident",
    opener: "Here's a fresh, confident draft — make it yours:",
    situation: "As a {{role}}, I took on a challenge that had already burned through two previous owners without resolution.",
    task: "I started by understanding why the previous attempts had failed — not to assign blame, but to avoid the same traps.",
    action: "I identified the single structural blocker neither previous owner had addressed, built a targeted solution around it, and managed stakeholder expectations weekly.",
    result: "Third time was the resolution: {{achievement}}. Leadership asked me to document the approach for future use.",
    why: "I learn fast from what didn't work. That diagnostic instinct is something I'd bring here.",
  },
  {
    tone: "concise",
    opener: "Here's a tight STAR draft — swap in your specifics:",
    situation: "As a {{role}}, I found a manual process that was creating unnecessary error and toil for the team.",
    task: "I proposed automating it, built the case in one slide, and got approval in a single meeting.",
    action: "Built the automation in a week. Tested it. Shipped it.",
    result: "The payoff was immediate: {{achievement}}.",
    why: "I find toil and eliminate it. Same approach, every role.",
  },
  {
    tone: "senior",
    opener: "Here's a nuanced senior-level answer — personalize it:",
    situation: "As a {{role}}, I was responsible for a team that was technically strong but struggling with strategic alignment — shipping work that didn't clearly connect to company priorities.",
    task: "I needed to build that connection without micromanaging — helping the team see the strategic context and make better prioritization decisions on their own.",
    action: "I introduced a practice of opening every planning cycle with a 'strategy brief' that I co-wrote with leadership — a one-pager on what mattered most and why. The team used it to self-score their own backlog.",
    result: "The alignment improved dramatically: {{achievement}}. The team started generating better ideas because they finally understood the context they were working in.",
    why: "I believe clarity is a leadership responsibility. I'd bring that same commitment to context-setting here.",
  },
  {
    tone: "confident",
    opener: "A polished, confident draft — swap in your real story:",
    situation: "Working as a {{role}}, I identified an opportunity to significantly improve a customer-facing experience that had low satisfaction scores but no clear owner.",
    task: "I volunteered to own it, assembled a small cross-functional team, and set a 60-day target to move the satisfaction metric.",
    action: "I ran weekly customer feedback synthesis sessions, prioritized changes by impact-to-effort, and shipped six incremental improvements over the period.",
    result: "The experience transformed: {{achievement}}. The metric moved in the first month and kept improving.",
    why: "I take ownership of things that matter, even when they're not explicitly on my job description. I'd do the same here.",
  },
  {
    tone: "concise",
    opener: "Brief and structured — here's your draft:",
    situation: "In my {{role}} role, a key deliverable was at risk because of a dependency that hadn't been properly managed.",
    task: "I stepped in, identified the real blocker, and drove it to resolution.",
    action: "One conversation with the right person. Issue resolved in two days.",
    result: "Deliverable back on track: {{achievement}}.",
    why: "I remove blockers fast. That's the value I'd bring here.",
  },
  {
    tone: "senior",
    opener: "Senior-level and operationally sharp — personalize below:",
    situation: "As a {{role}}, I was tasked with scaling a function that had grown organically — effective at small scale but starting to show cracks under increased load.",
    task: "My challenge was to professionalize the function without losing the agility and culture that had made it effective in the first place.",
    action: "I ran a capability assessment, identified three structural gaps, and introduced changes incrementally over two quarters — piloting each change with a subset of the team before scaling.",
    result: "The function scaled: {{achievement}}. Agility was preserved and the team culture actually improved through the process.",
    why: "Scaling teams and functions while preserving what makes them effective is hard — and it's something I've done well. I'd bring that skill here.",
  },
  {
    tone: "confident",
    opener: "Here's a confident, delivery-focused draft:",
    situation: "As a {{role}}, I committed to an ambitious goal that most people on the team privately thought was unreachable in the given timeframe.",
    task: "I took that skepticism as useful signal, built a plan that accounted for the real constraints, and committed publicly to a credible path.",
    action: "I broke the goal into weekly milestones, ran a weekly review to catch variance early, and made scope trade-offs proactively rather than reactively.",
    result: "We hit the goal: {{achievement}}. The team's confidence in ambitious target-setting increased significantly.",
    why: "I believe ambitious goals are achievable with the right structure and honest tracking. I'd bring that belief — and the execution to back it up — to this team.",
  },
  {
    tone: "concise",
    opener: "Clean, crisp, and ready to personalize:",
    situation: "As a {{role}}, I was asked to step into a gap that had formed when a key team member departed unexpectedly.",
    task: "I covered the responsibilities, prevented any customer impact, and used the moment to address some underlying issues the departure had exposed.",
    action: "Triaged in day one. Stabilized in week one. Rebuilt better in month one.",
    result: "Outcome: {{achievement}}. No customer impact, cleaner process than before.",
    why: "I'm reliable under pressure. That's the value I'd bring here.",
  },
  {
    tone: "senior",
    opener: "Here's a senior-level answer showing executive presence:",
    situation: "In my {{role}} capacity, I was asked to present a strategic recommendation to the executive team on a topic where the data was ambiguous and opinions were divided.",
    task: "My job was to make the ambiguity legible, present a clear recommendation, and give leadership the confidence to make a decision.",
    action: "I structured my analysis around the key uncertainties, quantified the risk of each option, and presented a clear recommendation with an explicit set of conditions under which I'd revisit it.",
    result: "Decision made: {{achievement}}. Leadership cited the clarity of the framing as a model for future strategic reviews.",
    why: "Making complex decisions clear and actionable — that's a skill I've developed over years of senior work, and one I'd contribute here.",
  },
];

function generateAnswer(role: string, question: string, achievement: string, tone: Tone, seed: number): string {
  const pool = TEMPLATES.filter((t) => t.tone === tone);
  const template = pool[seed % pool.length];

  const cleanRole = role.trim() || "the role";
  const cleanQuestion = question.trim() || "Tell me about yourself.";
  const cleanAchievement = achievement.trim() || "delivered a measurable business improvement";

  const situation = template.situation.replace(/\{\{role\}\}/g, cleanRole);
  const result = template.result.replace(/\{\{achievement\}\}/g, cleanAchievement);

  return `${template.opener}

Question: ${cleanQuestion}

Situation: ${situation}

Task: ${template.task}

Action: ${template.action}

Result: ${result}

Why this matters for this role: ${template.why}`;
}

export default function AIInterviewAnswerGenerator() {
  const [role, setRole] = useState("Software Engineer");
  const [question, setQuestion] = useState("Tell me about a time you solved a difficult problem.");
  const [achievement, setAchievement] = useState("improved a slow workflow and reduced manual effort");
  const [tone, setTone] = useState<Tone>("confident");
  const [answer, setAnswer] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const lastSeedRef = useRef(-1);

  const generate = useCallback(() => {
    setGenerating(true);
    setAnswer(null);

    // pick a random seed, making sure we don't repeat the last one
    const pool = TEMPLATES.filter((t) => t.tone === tone);
    let seed = Math.floor(Math.random() * pool.length);
    if (seed === lastSeedRef.current && pool.length > 1) {
      seed = (seed + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
    }
    lastSeedRef.current = seed;

    setTimeout(() => {
      setAnswer(generateAnswer(role, question, achievement, tone, seed));
      setGenerating(false);
    }, 1600);
  }, [role, question, achievement, tone]);

  const reset = () => {
    setRole("Software Engineer");
    setQuestion("Tell me about a time you solved a difficult problem.");
    setAchievement("improved a slow workflow and reduced manual effort");
    setTone("confident");
    setAnswer(null);
    lastSeedRef.current = -1;
  };

  const copyToClipboard = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <Bot size={18} aria-hidden="true" />
            AI Interview Answer Generator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Generate a polished interview answer draft.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Turn a role, interview question, and achievement into a structured STAR-style answer you can personalize.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: Inputs */}
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Answer inputs</h2>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset interview answer generator"
                title="Reset generator"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Target role</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <BriefcaseBusiness size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="text"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Interview question</span>
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  rows={4}
                  className="w-full resize-none border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-base font-bold outline-none"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Achievement or result to include</span>
                <textarea
                  value={achievement}
                  onChange={(event) => setAchievement(event.target.value)}
                  rows={3}
                  className="w-full resize-none border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-base font-bold outline-none"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Tone</span>
                <select
                  value={tone}
                  onChange={(event) => setTone(event.target.value as Tone)}
                  className="min-h-12 w-full border border-[#ead8cf] bg-[#fffaf7] px-4 text-base font-bold outline-none"
                >
                  <option value="concise">Concise</option>
                  <option value="confident">Confident</option>
                  <option value="senior">Senior-level</option>
                </select>
              </label>

              {/* Generate Button */}
              <button
                type="button"
                onClick={generate}
                disabled={generating}
                className="mt-2 flex w-full items-center justify-center gap-3 bg-[#f55d1d] px-6 py-4 text-base font-black uppercase tracking-[0.06em] text-white transition hover:bg-[#d94e14] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Wand2 size={20} aria-hidden="true" />
                {generating ? "Generating…" : answer ? "Regenerate Answer" : "Generate Answer"}
              </button>
            </div>
          </section>

          {/* Right: Output */}
          <section className="grid gap-4 content-start">
            <div className="relative min-h-[320px] bg-[#101114] p-7 text-white max-[480px]:p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">
                  <Sparkles size={18} aria-hidden="true" />
                  Generated answer draft
                </p>
                {answer && !generating && (
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:border-white/50 hover:text-white"
                  >
                    <Copy size={14} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>

              {/* Idle state */}
              {!generating && !answer && (
                <div className="mt-8 flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-white/5">
                    <Wand2 size={28} className="text-[#f55d1d]" />
                  </div>
                  <p className="text-base font-medium text-white/40">
                    Fill in the details on the left,<br />then hit Generate Answer.
                  </p>
                </div>
              )}

              {/* Generating animation */}
              {generating && (
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#f55d1d]" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#f55d1d]" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[#f55d1d]" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider text-white/50">Crafting your answer</span>
                  </div>
                  <div className="mt-2 grid gap-3">
                    {[100, 90, 95, 75, 100, 85, 90, 70, 100, 80].map((w, i) => (
                      <div
                        key={i}
                        className="h-3 animate-pulse rounded-sm bg-white/10"
                        style={{ width: `${w}%`, animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Answer */}
              {!generating && answer && (
                <pre className="mt-5 whitespace-pre-wrap font-sans text-base font-medium leading-7 text-[#f6ddd1]">
                  {answer}
                </pre>
              )}
            </div>

            <div className="flex gap-3 border border-[#f0ded4] bg-[#fffdfb] p-4 text-sm font-medium leading-6 text-[#6b5b53]">
              <Info size={18} className="mt-1 shrink-0 text-[#f55d1d]" aria-hidden="true" />
              <p>
                Use this as a draft, then replace generic details with your real metrics, project names, stakeholders, and decisions.
                Hit <strong>Regenerate</strong> for a completely different variation.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
