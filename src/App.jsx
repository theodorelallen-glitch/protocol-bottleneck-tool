import { useState } from "react";

const KLAVIYO_COMPANY_ID = "XGm6Si";
const KLAVIYO_LIST_ID = "R3YAQh";
const CATALOG_URL = "https://project-theo.com/collections/browse-research-guides";

const GUIDES = {
  rpb: { label: "Research Protocol Bible", url: CATALOG_URL },
  reta: { label: "Retatrutide Guide", url: CATALOG_URL },
  stack: { label: "Retatrutide, Tesamorelin, and Ipamorelin Guide", url: CATALOG_URL },
  motsc: { label: "MOTS-C and SS-31 Guide", url: CATALOG_URL },
  catalog: { label: "Research Guides", url: CATALOG_URL },
};

async function trackResultEvent(resultKey, email) {
  try {
    await fetch(`https://a.klaviyo.com/client/events/?company_id=${KLAVIYO_COMPANY_ID}`, {
      method: "POST",
      headers: { "content-type": "application/json", revision: "2024-02-15" },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: { data: { type: "metric", attributes: { name: "Protocol Tool Result" } } },
            properties: { result_key: resultKey },
            profile: { data: { type: "profile", attributes: { email: email } } }
          }
        }
      })
    });
  } catch (e) {}
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .pt-wrap { background: #2c2e24; color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; min-height: 100vh; padding: 0 0 80px 0; }
  .pt-header { padding: 52px 24px 48px; border-bottom: 1px solid rgba(232,224,208,0.15); margin-bottom: 44px; max-width: 520px; margin-left: auto; margin-right: auto; }
  .pt-eyebrow { font-family: 'Jost', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.6); margin-bottom: 22px; }
  .pt-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(38px, 8vw, 58px); line-height: 1.05; color: #e8e0d0; margin-bottom: 22px; }
  .pt-sell-line { font-size: 15px; line-height: 1.75; color: rgba(232,224,208,0.75); margin-bottom: 12px; }
  .pt-sell-sub { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.55); margin-bottom: 30px; }
  .pt-spec-line { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.4); margin-bottom: 36px; }
  .pt-progress-bar { height: 2px; background: rgba(232,224,208,0.12); margin: 0 24px 44px; border-radius: 2px; overflow: hidden; }
  .pt-progress-fill { height: 100%; background: #e8e0d0; border-radius: 2px; transition: width 0.5s ease; }
  .pt-card { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-step-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 14px; }
  .pt-question { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(22px, 5vw, 30px); line-height: 1.25; color: #e8e0d0; margin-bottom: 12px; }
  .pt-question-note { font-size: 13px; color: rgba(232,224,208,0.5); line-height: 1.65; margin-bottom: 28px; font-style: italic; }
  .pt-multi-hint { font-size: 10px; color: rgba(232,224,208,0.45); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }
  .pt-options { display: flex; flex-direction: column; gap: 10px; }
  .pt-option { background: rgba(232,224,208,0.06); border: 1px solid rgba(232,224,208,0.18); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.55; padding: 16px 20px; text-align: left; cursor: pointer; border-radius: 2px; transition: all 0.2s ease; width: 100%; }
  .pt-option:hover { background: rgba(232,224,208,0.12); border-color: rgba(232,224,208,0.45); }
  .pt-multi-options { display: flex; flex-direction: column; gap: 10px; }
  .pt-option-multi { background: rgba(232,224,208,0.06); border: 1px solid rgba(232,224,208,0.18); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.55; padding: 15px 20px 15px 50px; text-align: left; cursor: pointer; border-radius: 2px; transition: all 0.2s ease; width: 100%; position: relative; }
  .pt-option-multi::before { content: ''; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border: 1px solid rgba(232,224,208,0.35); border-radius: 2px; transition: all 0.2s; }
  .pt-option-multi.checked { background: rgba(232,224,208,0.12); border-color: rgba(232,224,208,0.6); }
  .pt-option-multi.checked::before { background: #e8e0d0; border-color: #e8e0d0; }
  .pt-option-multi.checked::after { content: '✓'; position: absolute; left: 19px; top: 50%; transform: translateY(-52%); font-size: 10px; color: #2c2e24; font-weight: 700; }
  .pt-option-multi:hover { background: rgba(232,224,208,0.1); border-color: rgba(232,224,208,0.35); }
  .pt-pill { display: block; background: #e8e0d0; color: #2c2e24; font-family: 'Jost', sans-serif; font-weight: 400; font-size: 14px; letter-spacing: 0.5px; padding: 17px 32px; text-align: center; cursor: pointer; border: none; border-radius: 50px; width: 100%; margin-top: 22px; transition: opacity 0.2s, transform 0.15s; text-decoration: none; }
  .pt-pill:hover { opacity: 0.88; transform: translateY(-1px); }
  .pt-pill:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
  .pt-back { background: none; border: none; color: rgba(232,224,208,0.4); font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 1px; cursor: pointer; padding: 0; margin-top: 24px; display: block; transition: color 0.2s; }
  .pt-back:hover { color: rgba(232,224,208,0.75); }
  .pt-gate-screen { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-gate-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 16px; }
  .pt-gate-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(28px, 6vw, 42px); line-height: 1.1; color: #e8e0d0; margin-bottom: 18px; }
  .pt-gate-body { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.65); margin-bottom: 32px; }
  .pt-gate-divider { height: 1px; background: rgba(232,224,208,0.1); margin: 0 0 32px; }
  .pt-gate-form-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 16px; }
  .pt-gate-form { display: flex; flex-direction: column; gap: 14px; }
  .pt-gate-input { width: 100%; background: rgba(0,0,0,0.18); border: 1px solid rgba(232,224,208,0.22); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.5; padding: 16px 20px; border-radius: 50px; outline: none; transition: border-color 0.2s, background 0.2s; }
  .pt-gate-input::placeholder { color: rgba(232,224,208,0.4); }
  .pt-gate-input:focus { border-color: rgba(232,224,208,0.5); background: rgba(0,0,0,0.24); }
  .pt-gate-error { font-size: 13px; line-height: 1.6; color: #f2b8b5; margin-top: 2px; }
  .pt-result { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-result-tag { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 14px; }
  .pt-result-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(26px, 5.5vw, 40px); line-height: 1.15; color: #e8e0d0; margin-bottom: 20px; }
  .pt-result-body { font-size: 14px; line-height: 1.85; color: rgba(232,224,208,0.75); margin-bottom: 16px; }
  .pt-bn-block { margin: 20px 0; padding: 22px; border: 1px solid rgba(232,224,208,0.12); border-radius: 2px; }
  .pt-bn-block-tag { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.4); margin-bottom: 8px; }
  .pt-bn-block-title { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 400; color: #e8e0d0; margin-bottom: 10px; line-height: 1.2; }
  .pt-bn-block-body { font-size: 13px; line-height: 1.8; color: rgba(232,224,208,0.65); }
  .pt-result-what { border-left: 2px solid rgba(232,224,208,0.22); padding-left: 18px; margin: 28px 0; }
  .pt-result-what-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 10px; }
  .pt-result-what-text { font-size: 14px; line-height: 1.8; color: rgba(232,224,208,0.65); font-style: italic; }
  .pt-divider { height: 1px; background: rgba(232,224,208,0.1); margin: 32px 0; }
  .pt-cta-block { background: rgba(232,224,208,0.05); border: 1px solid rgba(232,224,208,0.12); padding: 28px 24px; margin-top: 36px; border-radius: 2px; }
  .pt-cta-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 12px; }
  .pt-cta-text { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.65); margin-bottom: 22px; }
  .pt-audit-mention { font-size: 13px; line-height: 1.75; color: rgba(232,224,208,0.45); margin-top: 18px; font-style: italic; }
  .pt-restart { display: block; text-align: center; margin-top: 40px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.35); cursor: pointer; background: none; border: none; font-family: 'Jost', sans-serif; transition: color 0.2s; }
  .pt-restart:hover { color: rgba(232,224,208,0.6); }
  .pt-disclaimer { text-align: center; font-size: 10px; color: rgba(232,224,208,0.3); letter-spacing: 1px; margin-top: 52px; line-height: 1.8; padding: 0 24px; }
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

const QUESTIONS = {
  // ─── NEW: Opening position question ───────────────────────────────────────
  q_position: {
    stepLabel: "Step 1 — Where You Are",
    question: "Where are you in your research right now?",
    note: "This determines which diagnostic path applies to your situation.",
    options: [
      { label: "I am researching but have not started a protocol yet", next: "q_pre_goal" },
      { label: "I am currently running a protocol", next: "q_start" },
      { label: "I was running a protocol and have stopped or paused", next: "q_start" },
    ],
  },

  // ─── NEW: Pre-protocol path ────────────────────────────────────────────────
  q_pre_goal: {
    stepLabel: "Step 1 — Research Focus",
    question: "What is the primary result you are researching toward?",
    note: null,
    options: [
      { label: "Fat loss — reducing body fat while preserving muscle", next: "q_pre_barrier" },
      { label: "Body recomposition — changing the ratio of fat to muscle", next: "q_pre_barrier" },
      { label: "Energy and recovery — performance without significant fat loss as the goal", next: "q_pre_energy_barrier" },
      { label: "Not sure yet — still trying to understand the landscape", next: "q_pre_landscape" },
    ],
  },
  q_pre_barrier: {
    stepLabel: "Step 1 — Research Focus",
    question: "What is the single biggest thing stopping you from starting?",
    note: null,
    options: [
      { label: "Not sure which compound fits my situation", next: "q_pre_foundation" },
      { label: "Not sure if my foundation is ready to support a protocol", next: "q_pre_foundation" },
      { label: "Concerned about side effects and how to manage them", next: "q_pre_sideeffects" },
      { label: "Still trying to understand the research and mechanism", next: "q_pre_mechanism" },
    ],
  },
  q_pre_energy_barrier: {
    stepLabel: "Step 1 — Research Focus",
    question: "What does the energy or recovery problem look like right now?",
    note: null,
    options: [
      { label: "Energy is declining despite adequate sleep and nutrition", next: "q_pre_foundation" },
      { label: "Recovery between training sessions is slow", next: "q_pre_foundation" },
      { label: "Both energy and recovery are the issue", next: "q_pre_foundation" },
    ],
  },
  q_pre_foundation: {
    stepLabel: "Step 2 — Foundation Check",
    question: "Before any compound is considered, how stable are these right now?",
    note: "Select all that currently apply to your situation.",
    multiSelect: true,
    options: [
      { id: "sleep", label: "Sleep is consistently under 6 hours or poor quality" },
      { id: "protein", label: "Protein intake is inconsistent or likely too low" },
      { id: "stimulant", label: "Relying on stimulants daily just to reach baseline function" },
      { id: "none", label: "None of these — foundation inputs are reasonably stable" },
    ],
    multiNext: (ids) => {
      if (ids.includes("none") || ids.length === 0) return "q_pre_research_duration";
      return "r_pre_foundation";
    },
  },
  q_pre_sideeffects: {
    stepLabel: "Step 2 — Side Effect Concerns",
    question: "Which side effect area concerns you most?",
    note: null,
    options: [
      { label: "GI symptoms — nausea, discomfort, or appetite changes", next: "r_pre_gi_concern" },
      { label: "Muscle loss during a fat loss protocol", next: "r_pre_muscle_concern" },
      { label: "Sleep disruption from the protocol", next: "r_pre_sleep_concern" },
      { label: "Not sure what to expect at all", next: "r_pre_general_concern" },
    ],
  },
  q_pre_mechanism: {
    stepLabel: "Step 2 — Research Clarity",
    question: "What part of the mechanism is most unclear?",
    note: null,
    options: [
      { label: "How GLP-1 compounds actually work beyond just appetite suppression", next: "r_pre_glp1_mechanism" },
      { label: "Why different compounds are used at different phases", next: "r_pre_phase_logic" },
      { label: "How to know which compound matches my specific situation", next: "r_pre_compound_match" },
      { label: "What a support compound is and when it becomes relevant", next: "r_pre_support_logic" },
    ],
  },
  q_pre_research_duration: {
    stepLabel: "Step 2 — Research Context",
    question: "How long have you been researching this area?",
    note: null,
    options: [
      { label: "Less than a month — still in early research", next: "r_pre_early_researcher" },
      { label: "One to three months — building a picture", next: "r_pre_ready" },
      { label: "More than three months — have a clear picture, ready to act", next: "r_pre_ready_experienced" },
    ],
  },
  q_pre_landscape: {
    stepLabel: "Step 1 — Research Focus",
    question: "What has your research focused on so far?",
    note: null,
    options: [
      { label: "GLP-1 compounds — semaglutide, tirzepatide, or retatrutide", next: "q_pre_foundation" },
      { label: "Peptides for recovery, repair, or longevity", next: "q_pre_foundation" },
      { label: "GH secretagogues — CJC, Tesamorelin, Ipamorelin", next: "q_pre_foundation" },
      { label: "No specific focus yet — still mapping the landscape", next: "r_pre_early_researcher" },
    ],
  },

  // ─── EXISTING: Active protocol path (unchanged) ───────────────────────────
  q_start: {
    stepLabel: "Step 1 — Protocol Type",
    question: "What best describes your current research protocol?",
    note: "This determines which diagnostic path applies to your situation.",
    options: [
      { label: "GLP-1 based — semaglutide, tirzepatide, or retatrutide", next: "q_glp1_duration" },
      { label: "GH secretagogue stack — CJC, Tesamorelin, Ipamorelin, or similar", next: "q_gh_duration" },
      { label: "Peptide stack without a GLP-1 or GH base — repair, longevity, cognitive, or metabolic", next: "q_peptide_type" },
      { label: "Combination — GLP-1 with one or more support peptides", next: "q_glp1_duration" },
    ],
  },
  q_glp1_duration: {
    stepLabel: "Step 1 — Phase Identification",
    question: "How long have you been running your current protocol?",
    note: "This establishes which phase of the research cycle you are in.",
    options: [
      { label: "Less than 4 weeks — still in the early phase", next: "q_glp1_early" },
      { label: "4 to 12 weeks — past the adjustment window", next: "q_glp1_status" },
      { label: "More than 12 weeks — extended protocol", next: "q_glp1_status" },
    ],
  },
  q_glp1_early: {
    stepLabel: "Step 1 — Phase Identification",
    question: "Are you seeing any change in appetite or hunger patterns since starting?",
    note: "The first 4 weeks are a titration phase. Visible results typically follow once the effective dose range is reached.",
    options: [
      { label: "Yes — hunger is noticeably different", next: "q_found_sleep" },
      { label: "No — appetite feels completely unchanged", next: "r_no_intake" },
      { label: "Hard to tell — inconsistent or unclear", next: "r_phase1_early" },
    ],
  },
  q_glp1_status: {
    stepLabel: "Step 1 — Phase Identification",
    question: "What best describes where results are right now?",
    note: null,
    options: [
      { label: "Still progressing consistently — no stall", next: "q_found_sleep" },
      { label: "Results have slowed significantly or stopped", next: "q_glp1_stall_context" },
      { label: "Never really got started despite being past week 4", next: "q_glp1_no_start" },
    ],
  },
  q_glp1_no_start: {
    stepLabel: "Step 1 — Phase Identification",
    question: "Has intake — calories or hunger — actually changed since starting?",
    note: "A GLP-1 compound that is not suppressing intake is either under-dosed, still titrating, or there is a reconstitution variable worth ruling out.",
    options: [
      { label: "Yes, hunger is down but the scale is not moving", next: "q_glp1_caloric" },
      { label: "No — appetite feels completely unchanged", next: "r_no_intake" },
    ],
  },
  q_glp1_stall_context: {
    stepLabel: "Step 1 — Phase Identification",
    question: "When results stalled, what else was happening at the same time?",
    note: "Select all that apply. The combination matters for phase identification.",
    multiSelect: true,
    options: [
      { id: "energy", label: "Energy started declining" },
      { id: "training", label: "Training performance dropped noticeably" },
      { id: "sleep", label: "Sleep degraded — poor quality or waking" },
      { id: "nothing", label: "Nothing else changed — just results stopped" },
    ],
    multiNext: (ids) => {
      if (ids.includes("sleep")) return "q_p4_sleep";
      if (ids.includes("training")) return "q_p3_training";
      return "q_glp1_caloric";
    },
  },
  q_glp1_caloric: {
    stepLabel: "Step 1 — Phase Identification",
    question: "Is caloric intake being tracked with reasonable precision?",
    note: "Metabolic rate adapts during extended protocols. What was a real deficit at week 4 may not be one at week 12.",
    options: [
      { label: "Yes — tracked consistently", next: "q_found_sleep" },
      { label: "Roughly — not precise", next: "r_caloric_audit" },
      { label: "No — going by feel", next: "r_caloric_audit" },
    ],
  },
  q_p3_training: {
    stepLabel: "Step 1 — Phase Identification",
    question: "Has training performance measurably declined?",
    note: "Less output at the same or lower load is a signal the system is under recovery strain.",
    options: [
      { label: "Yes — noticeably weaker or less endurance", next: "q_found_sleep_p3" },
      { label: "Slightly — but manageable", next: "q_found_sleep" },
      { label: "No — training is holding steady", next: "q_found_sleep" },
    ],
  },
  q_p4_sleep: {
    stepLabel: "Step 1 — Phase Identification",
    question: "How significantly has sleep degraded?",
    note: null,
    options: [
      { label: "Significantly — poor quality most nights, not recovering", next: "r_phase4" },
      { label: "Somewhat — worse than before the protocol", next: "q_found_sleep" },
      { label: "About the same as before", next: "q_found_sleep" },
    ],
  },
  q_gh_duration: {
    stepLabel: "Step 1 — Protocol Assessment",
    question: "How long have you been running your GH secretagogue stack?",
    note: null,
    options: [
      { label: "Less than 6 weeks", next: "q_gh_early" },
      { label: "6 to 12 weeks", next: "q_gh_results" },
      { label: "More than 12 weeks", next: "q_gh_results" },
    ],
  },
  q_gh_early: {
    stepLabel: "Step 1 — Protocol Assessment",
    question: "Are you seeing any early signs — improved sleep depth, recovery, or body composition shifts?",
    note: "GH secretagogue results are gradual. Lean mass and recovery changes typically become measurable at 6 to 12 weeks.",
    options: [
      { label: "Yes — some early signs are present", next: "q_found_sleep" },
      { label: "No — nothing noticeable yet", next: "q_gh_environment" },
    ],
  },
  q_gh_results: {
    stepLabel: "Step 1 — Protocol Assessment",
    question: "What best describes the current state of results from your GH stack?",
    note: null,
    options: [
      { label: "Working well — seeing expected changes", next: "q_found_sleep" },
      { label: "Inconsistent — some weeks better than others", next: "q_gh_environment" },
      { label: "Minimal or no results despite consistent protocol", next: "q_gh_environment" },
      { label: "Results started strong then faded", next: "q_gh_timing" },
    ],
  },
  q_gh_environment: {
    stepLabel: "Step 2 — Signaling Environment",
    question: "When you inject, how far from your last meal are you typically injecting?",
    note: "GH secretagogues require a fasted state to produce a clean pulse. On an active GLP-1 protocol, gastric emptying slows — a standard 2 to 3 hour window may not be enough.",
    options: [
      { label: "1 to 2 hours post-meal", next: "r_gh_insulin" },
      { label: "2 to 3 hours post-meal", next: "q_gh_sleep" },
      { label: "3 or more hours — genuinely fasted", next: "q_gh_sleep" },
    ],
  },
  q_gh_timing: {
    stepLabel: "Step 2 — Signaling Environment",
    question: "When in the day are you typically injecting Tesamorelin or CJC?",
    note: "Timing is one of the most common reasons GH stacks produce inconsistent results.",
    options: [
      { label: "At bedtime", next: "r_gh_bedtime" },
      { label: "Daytime, fasted", next: "q_gh_sleep" },
      { label: "Mixed — no consistent timing", next: "r_gh_mixed" },
    ],
  },
  q_gh_sleep: {
    stepLabel: "Step 2 — Signaling Environment",
    question: "How is sleep quality — depth, consistency, waking through the night?",
    note: "GH pulses are partly governed by slow-wave sleep depth. Fragmented sleep reduces pulse frequency regardless of compound.",
    options: [
      { label: "Good — consistent and restorative most nights", next: "q_found_sleep" },
      { label: "Inconsistent — some nights poor", next: "r_gh_environment" },
      { label: "Consistently poor — shallow, fragmented, not restorative", next: "r_gh_environment" },
    ],
  },
  q_peptide_type: {
    stepLabel: "Step 1 — Protocol Assessment",
    question: "What is the primary research objective of your peptide stack?",
    note: "This routes to the correct bottleneck framework.",
    options: [
      { label: "Tissue repair — injury recovery, connective tissue, or gut health", next: "q_peptide_repair" },
      { label: "Longevity and cellular health — SS-31, MOTS-c, Epithalon, NAD+", next: "q_peptide_longevity" },
      { label: "Cognitive or mood — Semax, Selank, or similar", next: "q_peptide_cog" },
      { label: "Metabolic or energy output", next: "q_found_sleep" },
    ],
  },
  q_peptide_repair: {
    stepLabel: "Step 2 — Repair Assessment",
    question: "How would you describe the repair response at this point?",
    note: null,
    options: [
      { label: "No meaningful improvement after 4 or more weeks", next: "r_repair_none" },
      { label: "Some response but slower than expected", next: "q_peptide_repair_found" },
      { label: "Improvement present but plateaued", next: "q_peptide_repair_found" },
    ],
  },
  q_peptide_repair_found: {
    stepLabel: "Step 2 — Repair Assessment",
    question: "Is sleep consistent and is training load moderate relative to recovery capacity?",
    note: "Repair compounds amplify existing repair signaling. Poor sleep and excessive load reduce the signal they have to work with.",
    options: [
      { label: "Yes — both are reasonably managed", next: "r_repair_slow" },
      { label: "No — sleep is poor or training load is high", next: "r_foundation_sleep" },
    ],
  },
  q_peptide_longevity: {
    stepLabel: "Step 2 — Protocol Assessment",
    question: "What is the primary symptom or gap driving the longevity stack?",
    note: null,
    options: [
      { label: "Energy output declining despite adequate sleep", next: "q_found_stimulant" },
      { label: "Recovery is slow — not returning to baseline between sessions", next: "q_found_sleep_p3" },
      { label: "General cellular or longevity support — no specific symptom", next: "r_longevity_general" },
      { label: "Immune resilience or inflammation", next: "r_immune" },
    ],
  },
  q_peptide_cog: {
    stepLabel: "Step 2 — Protocol Assessment",
    question: "What best describes the cognitive or mood symptom driving the stack?",
    note: null,
    options: [
      { label: "Mental flatness — low drive, difficulty focusing", next: "q_peptide_cog_cause" },
      { label: "Anxiety or elevated stress response", next: "r_selank" },
      { label: "Sleep quality is the primary driver", next: "r_bn04" },
    ],
  },
  q_peptide_cog_cause: {
    stepLabel: "Step 2 — Protocol Assessment",
    question: "When did mental flatness start?",
    note: null,
    options: [
      { label: "During an extended caloric deficit or hard cut", next: "r_bn06" },
      { label: "As a baseline issue — independent of a deficit", next: "r_semax" },
      { label: "After a recent dose change or new compound was added", next: "r_cog_compound" },
    ],
  },
  q_found_sleep: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Are you averaging at least 6 hours of sleep most nights?",
    note: "Sleep is checked first because it affects every other input downstream. No compound resolves what sleep deprivation creates.",
    options: [
      { label: "Yes — sleep is reasonably stable", next: "q_found_stimulant" },
      { label: "No — consistently under 6 hours or poor quality", next: "r_foundation_sleep" },
    ],
  },
  q_found_sleep_p3: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Are you averaging at least 6 hours of sleep most nights?",
    note: "With training or recovery declining, sleep is the first variable to rule out.",
    options: [
      { label: "Yes — reasonably stable", next: "q_found_stimulant_p3" },
      { label: "No — consistently poor", next: "r_foundation_sleep" },
    ],
  },
  q_found_stimulant: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Are you relying on stimulants daily just to reach baseline function?",
    note: "Not for performance — just to feel operational. Daily stimulant use elevates cortisol and contaminates the protocol read.",
    options: [
      { label: "No — stimulants are occasional or not used", next: "q_found_protein" },
      { label: "Yes — daily use to feel normal", next: "r_foundation_stimulant" },
    ],
  },
  q_found_stimulant_p3: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Are you relying on stimulants daily just to reach baseline function?",
    note: null,
    options: [
      { label: "No — occasional or not used", next: "q_found_protein_p3" },
      { label: "Yes — daily use to feel normal", next: "r_foundation_stimulant" },
    ],
  },
  q_found_protein: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Is protein intake consistent — roughly 0.7 to 1g per pound of lean body mass?",
    note: "Compounds cannot protect lean mass not being supported by adequate protein. This is an upstream variable.",
    options: [
      { label: "Yes — protein is consistent", next: "q_bn_main" },
      { label: "No or unsure — intake has dropped", next: "r_foundation_protein" },
    ],
  },
  q_found_protein_p3: {
    stepLabel: "Step 2 — Foundation Gate",
    question: "Is protein intake consistent despite appetite changes?",
    note: null,
    options: [
      { label: "Yes — protein is maintained", next: "q_bn_p3" },
      { label: "No — protein has dropped too", next: "r_foundation_protein" },
    ],
  },
  q_bn_main: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "Which of these are you experiencing right now?",
    note: "Select all that apply. Multiple active bottlenecks produce different compound logic than a single one.",
    multiSelect: true,
    options: [
      { id: "fatlose", label: "Fat loss or body composition has stalled or slowed" },
      { id: "muscle", label: "Losing weight but also losing visible muscle" },
      { id: "energy", label: "Energy is consistently low" },
      { id: "sleep", label: "Sleep is disturbed — waking, shallow, or not restorative" },
      { id: "gi", label: "GI symptoms — nausea, bloating, or discomfort" },
      { id: "mood", label: "Mood flat, motivation gone, drive depleted" },
      { id: "dose", label: "Dose has been escalated and nothing is working anymore" },
    ],
    multiNext: (ids) => {
      if (ids.includes("dose")) return "r_bn07";
      if (ids.length === 0) return "q_bn_main";
      if (ids.length === 1) {
        const map = { fatlose: "q_fatlose_dose", muscle: "r_bn01", energy: "q_energy_timing", sleep: "r_bn04", gi: "r_bn05", mood: "r_bn06" };
        return map[ids[0]] || "r_bn01";
      }
      return "MULTI:" + ids.sort().join(",");
    },
  },
  q_bn_p3: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "Alongside the training decline, what else is most prominent?",
    note: "Select all that apply.",
    multiSelect: true,
    options: [
      { id: "fatigue", label: "General fatigue even on rest days — not recovering" },
      { id: "muscle", label: "Muscle is visibly decreasing" },
      { id: "mood", label: "Mood and drive significantly affected" },
      { id: "none", label: "Primarily just the training performance decline" },
    ],
    multiNext: (ids) => {
      if (ids.includes("none") || ids.length === 0) return "r_phase3";
      if (ids.includes("muscle") && ids.includes("mood")) return "MULTI:mood,muscle,phase3";
      if (ids.includes("muscle")) return "r_bn01";
      if (ids.includes("mood")) return "r_bn06";
      return "r_phase3";
    },
  },
  q_fatlose_dose: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "Has the dose been escalated in response to the stall?",
    note: "This changes which bottleneck is most likely active.",
    options: [
      { label: "Yes — dose has been increased once or more", next: "r_bn07_stall" },
      { label: "No — still at the original dose", next: "q_fatlose_duration" },
    ],
  },
  q_fatlose_duration: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "How long has the stall been present?",
    note: null,
    options: [
      { label: "Less than 3 weeks", next: "r_bn02_early" },
      { label: "3 to 6 weeks", next: "r_bn02" },
      { label: "More than 6 weeks", next: "r_bn02_extended" },
    ],
  },
  q_energy_timing: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "When did energy drop relative to the protocol?",
    note: "Timing reveals whether this is a dose variable or a genuine bottleneck.",
    options: [
      { label: "Shortly after a dose increase", next: "r_bn03_dose" },
      { label: "Gradually over several weeks", next: "r_bn03" },
      { label: "Low since the beginning of the protocol", next: "r_bn03_baseline" },
    ],
  },
};

const RESULTS = {
  // ─── NEW: Pre-protocol results ─────────────────────────────────────────────
  r_pre_foundation: {
    tag: "Foundation — Pre-Protocol",
    title: "The foundation needs to be stable before a compound has the conditions to work.",
    body: "Every compound in the research literature produces its most meaningful results inside a reasonably stable physiological environment. Sleep deprivation suppresses the hormonal signaling that fat loss and recovery compounds depend on. Inadequate protein removes the substrate that lean mass preservation compounds are trying to work with. Daily stimulant use elevates cortisol and creates a ceiling on what any metabolic compound can accomplish. None of this is disqualifying. But adding a compound before correcting these inputs means running an experiment inside a broken environment — and the result, whatever it is, will not be readable.",
    whatItMeans: "The research guides cover the Foundation Gate in full — what each input does to compound efficacy and the order in which to address them before starting any protocol. Starting here produces cleaner results and a more accurate read from week one.",
    auditMention: null,
  },
  r_pre_gi_concern: {
    tag: "Pre-Protocol — Side Effect Awareness",
    title: "GI symptoms are the most common early challenge and the most manageable.",
    body: "GLP-1 compounds work partly by slowing gastric emptying — the rate at which the stomach moves food through. That mechanism is also what produces nausea and early GI discomfort in a subset of researchers. Research suggests most GI symptoms are dose and timing variables rather than compound incompatibilities. They appear most commonly during the titration phase and resolve or reduce significantly once the effective dose range is established and timing is optimized. The researchers who manage this best are the ones who understand the mechanism before it happens rather than reacting to it after.",
    whatItMeans: "The Retatrutide guide covers GI symptom management in the context of an active GLP-1 protocol — the three distinct presentations, the dose and timing variables that drive each one, and how to distinguish a manageable titration response from a signal that something else is wrong.",
    auditMention: null,
  },
  r_pre_muscle_concern: {
    tag: "Pre-Protocol — Lean Mass Preservation",
    title: "Muscle loss during a fat loss protocol is real — and it is addressable before it starts.",
    body: "Caloric restriction tells the body to break down stored energy. Without a counteracting signal, that breakdown pulls from both fat and muscle. Research is consistent on what drives lean mass preservation: adequate protein intake at or above 0.7 to 1 gram per pound of lean body mass, a training stimulus that signals muscle as necessary tissue, and — at certain phases — a GH secretagogue support layer that adds an anabolic signal the deficit removes. Understanding which of these applies to your situation before starting means the protocol is designed correctly from day one rather than correcting a problem after it is visible.",
    whatItMeans: "The Research Protocol Bible covers lean mass preservation across all four protocol phases — which inputs protect it, when a GH support compound becomes the rational addition, and the sequencing logic that prevents the most common lean mass mistakes on an active fat loss protocol.",
    auditMention: null,
  },
  r_pre_sleep_concern: {
    tag: "Pre-Protocol — Sleep and Protocol Timing",
    title: "Sleep disruption from a protocol is almost always a timing variable, not a compound problem.",
    body: "GLP-1 compounds, particularly retatrutide, activate a glucagon receptor that produces a thermogenic effect — meaning it pushes the body toward burning stored energy. Injecting in the evening or at bedtime means that activation peaks during sleep, which can disrupt sleep architecture in a meaningful way. This is not a sign the compound is not working. It is a sign the timing is wrong. Research suggests morning injection eliminates or significantly reduces sleep disruption for most researchers. Knowing this before starting means it is a non-issue from the beginning.",
    whatItMeans: "The Retatrutide guide covers injection timing in detail — the mechanism behind morning versus evening injection, why timing matters differently for retatrutide than for other GLP-1 compounds, and what the data shows about sleep disruption as a timing variable.",
    auditMention: null,
  },
  r_pre_general_concern: {
    tag: "Pre-Protocol — Setting Expectations",
    title: "Understanding what to expect from week one removes most of what makes protocols fail.",
    body: "The most common reason protocols underperform is not a compound selection problem. It is a misread of what normal looks like. Early water and glycogen shifts inflate apparent fat loss in weeks one through four, then disappear — which looks like a stall but is just the protocol settling into its actual rate. GI symptoms during titration look like compound intolerance but are almost always dose and timing variables. Energy changes during a deficit look like a compound problem but are usually a caloric or foundation input issue. Researchers who understand these patterns before they happen do not make the reactive decisions that derail most protocols.",
    whatItMeans: "The Research Protocol Bible covers the full phase framework from the start — what each phase looks like, what normal variation looks like at each stage, and how to read results accurately rather than reacting to them.",
    auditMention: null,
  },
  r_pre_glp1_mechanism: {
    tag: "Pre-Protocol — Mechanism Clarity",
    title: "GLP-1 compounds do more than suppress appetite — and understanding the full mechanism changes how you use them.",
    body: "GLP-1 receptors are found in the gut, brain, and pancreas. The gut signal slows gastric emptying and reduces appetite. The brain signal reduces what researchers call food noise — the constant low-level preoccupation with food that drives overconsumption even when the person is not genuinely hungry. The pancreatic signal improves insulin sensitivity, which affects how the body handles carbohydrates and fat storage. Retatrutide adds a third receptor — glucagon — which pushes toward burning stored energy rather than just eating less. Each mechanism has practical implications for how the protocol behaves and what to expect at each phase.",
    whatItMeans: "The Retatrutide guide and the Research Protocol Bible both cover the mechanism in plain language — what each receptor does, how that translates into observable results, and why the same compound works differently for different researchers depending on which mechanism is the active limiting variable.",
    auditMention: null,
  },
  r_pre_phase_logic: {
    tag: "Pre-Protocol — Phase Framework",
    title: "The phase framework is what separates researchers who figure it out from those who keep cycling through compounds.",
    body: "Fat loss does not fail because a compound stops working. It moves through phases, and at each phase the limiting variable shifts. Phase 1 is intake-driven — the GLP-1 compound is the rational tool and nothing else is needed. Phase 2 is output-driven — the intake mechanism has done its job and the body needs a fat mobilization signal. Phase 3 is recovery-driven — the deficit that drove fat loss in Phase 2 has become the ceiling on recovery capacity. Phase 4 is sleep and GH pulsatility-driven. Adding a Phase 2 compound in Phase 1 adds complexity without benefit. Using a Phase 3 compound in Phase 2 makes recovery worse. The phase has to be identified first.",
    whatItMeans: "The Research Protocol Bible is built around the phase framework. It covers all four phases in detail — how to identify which one applies, what the rational compound logic is at each stage, and why the sequence matters more than the compound choice.",
    auditMention: null,
  },
  r_pre_compound_match: {
    tag: "Pre-Protocol — Compound Selection",
    title: "The right compound is not the strongest one — it is the one that addresses the actual limiting variable.",
    body: "Semaglutide is the rational starting point when intake is the primary limiting variable and the researcher has no prior GLP-1 experience. Tirzepatide adds a GIP receptor that produces greater fat loss in head-to-head data and better GI tolerance for most researchers. Retatrutide adds a glucagon receptor that drives thermogenesis — it is the rational next step when a researcher has plateaued on semaglutide or tirzepatide and needs a different mechanism rather than more of the same one. Choosing based on which compound sounds strongest rather than which mechanism addresses the actual bottleneck is the most common selection mistake.",
    whatItMeans: "The Research Protocol Bible covers the GLP-1 starting point decision and the compound selection framework in the first chapter — how to identify which compound fits the actual limiting variable before starting, not after the first plateau.",
    auditMention: null,
  },
  r_pre_support_logic: {
    tag: "Pre-Protocol — Support Compound Logic",
    title: "A support compound is not an upgrade — it is a tool for a specific bottleneck that does not exist yet.",
    body: "Support compounds — GH secretagogues, MOTS-c, SS-31, BPC-157 — are often researched before a foundation compound is even started. The logic is usually that more is better or that starting with a full stack produces faster results. Research consistently shows the opposite. Support compounds amplify signals that the foundation compound creates. Adding them before the foundation is established means running a more complex protocol without the signal they are designed to amplify. The result is added complexity and cost with no additional benefit — and a protocol that is harder to read if something goes wrong.",
    whatItMeans: "The Research Protocol Bible covers the support compound decision framework — which bottleneck each support compound addresses, when that bottleneck becomes the active limiting variable, and why the sequencing matters more than the compound itself.",
    auditMention: null,
  },
  r_pre_early_researcher: {
    tag: "Pre-Protocol — Early Research Phase",
    title: "You are still building the picture — and starting with the right framework matters more than starting fast.",
    body: "The most common mistake in early research is reaching for a compound decision before the phase and mechanism framework is clear. Researchers who start with a clear understanding of how the phase logic works, what each compound actually does at the receptor level, and what the foundation needs to look like produce cleaner results and make fewer reactive decisions. The researchers who start fast and learn as they go spend most of their time trying to read a protocol that has too many variables to produce a readable result.",
    whatItMeans: "The Research Protocol Bible is the logical starting point. It covers the full framework — phase identification, compound selection logic, foundation requirements, and the bottleneck diagnostic system — before any protocol decision is made. The researchers who use it as a starting framework rather than a reference tool consistently report cleaner results.",
    auditMention: null,
  },
  r_pre_ready: {
    tag: "Pre-Protocol — Ready to Start",
    title: "You have built a research foundation — the next step is confirming the protocol matches the actual limiting variable.",
    body: "One to three months of research puts you ahead of most people who start. The question at this stage is not whether to start — it is whether the protocol design matches the actual limiting variable in your situation. Most researchers who have done the reading still start with the compound that sounds most interesting rather than the one that addresses the mechanism that is actually limiting their results. That mismatch is what produces the first plateau and the first round of reactive decisions.",
    whatItMeans: "The Research Protocol Bible covers the starting point decision and the compound selection framework in detail — how to confirm the match between your limiting variable and the compound mechanism before committing to a protocol.",
    auditMention: "A personalized protocol review — where your specific situation, goals, and research history get analyzed and the correct starting point gets identified for your case — is what the Protocol Audit is designed for. It is the difference between a framework and a diagnosis.",
  },
  r_pre_ready_experienced: {
    tag: "Pre-Protocol — Experienced Researcher",
    title: "Three months of research is a strong foundation — but the gap between knowing the framework and applying it correctly is where most protocols fail.",
    body: "Experienced researchers who have spent three or more months in this space often have a clear picture of the compounds but a less clear picture of their own limiting variable. The phase framework is understood conceptually. The question is which phase applies to their specific starting point, and whether the protocol they are planning correctly addresses the mechanism that is actually limiting their results. Getting that match right before starting means fewer reactive decisions in weeks four through twelve.",
    whatItMeans: "The Research Protocol Bible covers the compound selection framework from the starting point decision forward — how to identify the actual limiting variable, how to confirm the compound mechanism addresses it, and what the correct Foundation Gate looks like before starting.",
    auditMention: "A personalized protocol review — where your specific situation, goals, and research history get analyzed against the diagnostic framework — is what the Protocol Audit is designed for. If you want a diagnosis rather than a framework before you start, that is the next step.",
  },

  // ─── EXISTING: Active protocol results (unchanged) ────────────────────────
  r_phase1_early: { tag: "Phase Identification", title: "You are still in the titration window.", body: "The first 4 weeks on a GLP-1 compound are a dose escalation and adjustment phase. Research suggests meaningful results typically appear after the effective dose range is reached and the body has adapted to the intake shift. Evaluating the compound before that window closes produces a misleading read.", whatItMeans: "The most common mistake at this stage is escalating the dose because nothing is visible yet. The data supports patience over escalation during weeks one through six." },
  r_no_intake: { tag: "Dose and Titration", title: "Intake is not yet suppressed — this is a titration variable, not a bottleneck.", body: "If hunger and food intake have not changed after several weeks, the compound is either under-dosed, still titrating, or there is a reconstitution or administration variable worth ruling out. Research on GLP-1 compounds shows intake suppression as the primary mechanism. If that is absent, the downstream fat loss effect has no mechanism to work through.", whatItMeans: "This is not a stacking question. It is a titration question. Adding support compounds on top of an ineffective foundation dose does not resolve the underlying issue." },
  r_caloric_audit: { tag: "Foundation Check", title: "The caloric picture needs to be established before the protocol can be evaluated.", body: "Metabolic rate adapts during extended GLP-1 protocols. What was a real deficit at week 4 may produce a much smaller deficit by week 12 — not because the compound stopped working, but because the body adjusted. Research consistently shows most plateaus at this stage resolve or become diagnosable once intake is tracked precisely for 7 days.", whatItMeans: "Running a 7-day tracked intake period before making any protocol change is the first step the RPB framework recommends at Phase 2. It is the check that most often identifies the actual problem fastest." },
  r_foundation_sleep: { tag: "Foundation Gate — Sleep", title: "Sleep is the first intervention, not a compound addition.", body: "Sleep deprivation suppresses growth hormone pulsatility, elevates cortisol, and disrupts the metabolic signaling that compounds are designed to work within. Adding a compound on top of chronic sleep deprivation produces a fraction of the documented effect because the environment is actively working against it.", whatItMeans: "Before anything else, check whether GLP-1 injection timing or a recent dose escalation is contributing to the sleep disruption. A timing adjustment frequently resolves the problem without any compound addition." },
  r_foundation_stimulant: { tag: "Foundation Gate — Stimulant Load", title: "Daily stimulant use is contaminating the protocol read.", body: "Using stimulants daily to reach baseline energy elevates cortisol and creates ongoing oxidative stress. This sets a physiological ceiling on what any metabolic compound can accomplish. Research suggests this is one of the most underreported variables in protocol failure.", whatItMeans: "The experiment cannot produce a clean result while this input is active. Reducing stimulant frequency alongside sleep correction is the first rational move — not a compound addition." },
  r_foundation_protein: { tag: "Foundation Gate — Protein", title: "Protein intake has dropped with appetite — and lean mass is paying for it.", body: "GLP-1 compounds suppress appetite broadly, which often pulls protein intake down alongside caloric intake. If total protein has dropped below roughly 0.7g per pound of lean body mass, lean mass preservation becomes the primary issue.", whatItMeans: "Correcting protein intake before adding a lean mass support compound produces a cleaner result. Adding it on top of inadequate protein does not solve the upstream problem." },
  r_bn01: { tag: "Bottleneck 01 — Losing Muscle", title: "The limiting variable is lean mass — the body is breaking down muscle alongside fat.", body: "When running a significant caloric deficit, the body breaks down muscle tissue for energy — especially when protein intake is low or training stimulus is not strong enough to send a preservation signal. This is not a failure of the compound. It is the body doing exactly what sustained caloric restriction tells it to do when there is no counteracting anabolic signal.", whatItMeans: "The research points to a GH secretagogue stack as the correct support layer here — specifically compounds that send a lean mass preservation signal without adding metabolic demand the system cannot handle." },
  r_bn02_early: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The stall is recent — a GLP-1 audit should run before any protocol change.", body: "A stall under 3 weeks is within normal variation for most protocols. Research suggests running three checks before interpreting it as a bottleneck: precise caloric tracking for 7 days, dose and timing review, and compound-specific stall pattern assessment.", whatItMeans: "The Retatrutide guide walks through all three checks and the compound-specific stall patterns in the context of an active GLP-1 protocol." },
  r_bn02: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Phase 2 fat loss bottleneck — the limiting variable has shifted from intake to output.", body: "After the initial intake suppression phase, fat loss transitions from appetite-driven to output-driven. The compound has done its primary job. The question becomes whether the body's fat mobilization capacity is keeping pace with the caloric environment.", whatItMeans: "This is the most common plateau pattern on GLP-1 protocols. The Retatrutide guide covers the Phase 2 transition in detail — what drives it, what the research supports at this stage, and how to sequence the response correctly." },
  r_bn02_extended: { tag: "Bottleneck 02 — Extended Stall", title: "An extended stall may involve overlapping bottlenecks.", body: "A plateau lasting more than 6 weeks that has not responded to standard Phase 2 interventions often involves more than one active bottleneck — or a phase read that looked accurate but had a second variable running underneath it.", whatItMeans: "The Research Protocol Bible covers the full diagnostic framework for identifying overlapping bottlenecks — what each combination typically signals and how to sequence the response when standard Phase 2 interventions have not moved the plateau." },
  r_bn03_dose: { tag: "Bottleneck 03 — Energy (Dose Variable)", title: "Energy dropped after a dose increase — this is a GLP-1 variable, not a compound gap.", body: "When energy drops shortly after a dose escalation, research suggests the dose itself is creating a deficit too aggressive for the body to sustain output. The result looks like an energy bottleneck but is actually a dose or timing issue.", whatItMeans: "The Retatrutide guide covers the dose-driven energy drop pattern and how to distinguish it from a genuine energy bottleneck — including what the data supports as the correct first move before adding anything." },
  r_bn03: { tag: "Bottleneck 03 — Energy (Gradual Decline)", title: "Gradual energy decline points to a systemic output issue, not a single dose event.", body: "Energy that declines gradually over weeks during a sustained deficit signals that the body's output capacity is being compressed by the caloric environment. Research suggests this pattern has three distinct presentations that each map to a different compound response.", whatItMeans: "The Research Protocol Bible covers all three energy bottleneck presentations and the compound logic for each. Getting the presentation right matters more than the compound choice itself — the RPB gives you the framework to identify which one you are in." },
  r_bn03_baseline: { tag: "Foundation Gate — Baseline Energy", title: "Low energy from the start is almost always a foundation variable, not a compound gap.", body: "When energy has been low since protocol initiation, research consistently points to foundational inputs rather than a compound bottleneck. Adding an energy compound in this situation amplifies the problem — it does not correct it.", whatItMeans: "The Research Protocol Bible covers the Foundation Gate in full — all four inputs in the correct order — and explains why adding a compound before ruling out foundational causes typically makes the picture worse before it gets better." },
  r_bn04: { tag: "Bottleneck 04 — Sleep and Recovery", title: "Sleep disruption during a protocol is often a timing issue before it is a bottleneck.", body: "Sleep disruption that begins or worsens after starting or escalating a compound is worth investigating as a timing or dose variable first. GLP-1 injection timing relative to sleep can affect quality directly.", whatItMeans: "The Research Protocol Bible covers the sleep and recovery bottleneck protocol — the timing and dose variables to check first, and the specific compounds the research supports for each presentation of sleep disruption during an active protocol." },
  r_bn05: { tag: "Bottleneck 05 — GI Issues", title: "GI symptoms have three distinct presentations — which one applies changes the entire approach.", body: "Nausea driven by dose timing, gut motility issues from sustained suppression, and mucosal inflammation from extended restriction all present differently and respond to different interventions. Treating all GI symptoms the same way is one of the more consistent reasons they persist.", whatItMeans: "The Retatrutide guide covers GI symptoms in the context of an active GLP-1 protocol and how to distinguish between the three presentations — including the audit check to run before reaching for any intervention." },
  r_bn06: { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood and depleted drive are almost always downstream signals, not the root cause.", body: "Mood and motivation loss during a protocol is rarely a willpower issue. Research suggests it is almost always a downstream signal of elevated cortisol, hormonal suppression from extended restriction, or energy depletion. The compound response depends on which is the upstream driver.", whatItMeans: "The Research Protocol Bible covers the mood and motivation bottleneck and the diagnostic sequence for identifying whether the upstream driver is cortisol elevation, hormonal suppression, or energy depletion — each one maps to a different compound response." },
  r_bn07: { tag: "Bottleneck 07 — Dose Escalation", title: "Results stopped when the dose kept going up — the problem is almost never the dose.", body: "Escalating dose in response to a plateau is one of the most common patterns in extended protocols. Research consistently shows it is almost never the correct response. When dose escalation produces diminishing returns, the data suggests the limiting variable is not compound level.", whatItMeans: "The Research Protocol Bible covers the five checks to run before any further dose change and why the plateau almost always resolves when the actual limiting variable is correctly identified — not when the dose goes up again." },
  r_bn07_stall: { tag: "Bottleneck 07 — Dose Escalation Pattern", title: "A stall that triggered a dose increase is the most common misread in protocol research.", body: "When a plateau leads to dose escalation and the plateau continues, the research is clear: the dose was not the limiting variable. Most plateaus at this stage are Phase 2 metabolic shifts — escalating the intake-suppression mechanism does not address an output bottleneck.", whatItMeans: "The Research Protocol Bible covers the pre-escalation checklist and the Phase 2 assessment that almost always identifies the actual limiting variable. Running both in sequence is the correct diagnostic approach — the RPB walks through both in order." },
  r_phase3: { tag: "Phase 3 — Recovery Bottleneck", title: "The system is under recovery strain — output capacity is the limiting variable, not intake.", body: "When training performance declines alongside a stall, research suggests the protocol has entered Phase 3. The caloric deficit that drove fat loss in Phase 2 has become the ceiling on recovery capacity. Adding more metabolic demand at this stage typically makes both problems worse.", whatItMeans: "Phase 3 requires a different compound logic than Phase 2. The Retatrutide, Tesamorelin, and Ipamorelin guide covers Phase 3 recovery strain and the specific GH secretagogue stack decisions the research supports for rebuilding output capacity without adding demand the system cannot handle." },
  r_phase4: { tag: "Phase 4 — Recovery Ceiling", title: "Significant sleep degradation alongside a stall suggests the recovery ceiling has collapsed.", body: "When sleep has significantly degraded, progress has stalled across multiple metrics, and recovery is consistently poor, research suggests this is a Phase 4 pattern. Recovery capacity is the primary limiting variable — and adding more is most likely to make things worse.", whatItMeans: "The Research Protocol Bible covers the Phase 4 framework in full — what the research supports for rebuilding recovery capacity, what to avoid adding, and the correct sequence before any further protocol changes." },
  r_gh_insulin: { tag: "GH Signaling — Insulin Window", title: "The pulse is being blunted by elevated insulin at injection time.", body: "GH secretagogues require a genuinely fasted state to produce a measurable pulse. When insulin is elevated, GH amplitude drops significantly. On an active GLP-1 protocol, gastric emptying slows — extending the fasted window to 4 to 5 hours post-meal is often the only correction needed.", whatItMeans: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the fasted window requirement in detail — including how an active GLP-1 protocol changes that window by slowing gastric emptying, and the specific timing logic for each compound in the stack." },
  r_gh_bedtime: { tag: "GH Secretagogue — Timing Error", title: "Bedtime injection is the most common timing mistake for Tesamorelin.", body: "Tesamorelin has a 2 to 3 hour active window — injected at bedtime, the compound signal is already fading by the time the natural GH peak arrives during deep sleep. Daytime injection creates an additive pulse, which is what drives measurable IGF-1 changes. CJC-1295 without DAC is the one exception where bedtime injection is rational.", whatItMeans: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers injection timing for every compound in the stack — the active window for each, when daytime versus bedtime injection is rational, and why this single variable is the most common reason GH stacks underperform." },
  r_gh_mixed: { tag: "GH Secretagogue — Consistency", title: "Inconsistent timing is producing inconsistent results — not an inconsistent compound.", body: "GH secretagogues depend on consistent environmental conditions to produce a readable result. Varying the injection window changes the insulin environment, the cortisol context, and the somatostatin brake at injection time.", whatItMeans: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the consistency requirements for GH secretagogue protocols and how to establish a fixed injection window that produces a readable result — including what to expect once consistency is established." },
  r_gh_environment: { tag: "GH Signaling — Environment", title: "The signaling environment is suppressing the pulse before the compound can work.", body: "GH secretagogue output mirrors the quality of the environment it enters. Sleep deprivation reduces pulse frequency. Chronic stress elevates cortisol and competes with GH signaling. Research suggests most researchers who describe CJC and Ipamorelin as inconsistent were injecting into a suppressed environment.", whatItMeans: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the environmental inputs that govern GH pulse quality — sleep depth, cortisol context, insulin environment, and the somatostatin brake — and the audit to run before concluding the stack is not working." },
  r_repair_none: { tag: "Tissue Repair — No Response", title: "No repair response at 4 or more weeks warrants a protocol audit before changing compounds.", body: "No response after an adequate run typically points to one of three variables: reconstitution error, insufficient dose consistency, or an environmental factor suppressing the repair signal. Adding a second repair compound before diagnosing the first reliably produces an unreadable result.", whatItMeans: "The Research Protocol Bible covers the tissue repair bottleneck including the three most common causes of a null result and the reconstitution audit to run first — reconstitution errors are the most common and most overlooked source of null results in peptide research." },
  r_repair_slow: { tag: "Tissue Repair — Slower Than Expected", title: "Repair response is present but slower than expected — the foundation is the variable.", body: "BPC-157 and TB-500 amplify the body's existing repair signaling. Poor sleep and high training load reduce the signal they have to work with. The fastest repair responses come from researchers who have stabilized sleep and moderated training load relative to recovery capacity.", whatItMeans: "The Research Protocol Bible covers the full tissue repair framework — how to evaluate whether the compound combination is correctly matched to the repair presentation, and what the signaling environment needs to look like for that amplification to produce a measurable result." },
  r_longevity_general: { tag: "Longevity Stack", title: "General longevity support — the Foundation Gate applies here as much as anywhere.", body: "Compounds like SS-31, MOTS-c, Epithalon, and NAD+ work by amplifying existing biological systems. Research suggests they produce their most meaningful results when foundational inputs are reasonably stable. Adding longevity compounds on top of poor sleep and high cortisol amplifies the stress environment, not the longevity signal.", whatItMeans: "The MOTS-C and SS-31 guide covers the general longevity stack decision directly — when each compound becomes the rational choice, how they interact with each other, and why the foundational environment needs to be reasonably stable before they produce their most meaningful results." },
  r_immune: { tag: "Immune and Recovery", title: "Immune resilience and inflammation — the correct compound depends on which pattern applies.", body: "Thymosin Alpha-1, Glutathione, and KPV each address different aspects of immune function and inflammation. The correct compound depends on whether the issue is immune suppression, systemic inflammation, gut-specific inflammation, or oxidative stress from a prolonged protocol.", whatItMeans: "The MOTS-C and SS-31 guide covers immune resilience and cellular support compounds — how to distinguish between the patterns each one addresses, and the framework for identifying which pattern applies." },
  r_semax: { tag: "Cognitive — Semax", title: "Baseline mental flatness points to BDNF signaling as the likely target.", body: "Semax is researched primarily for its effect on BDNF — the brain protein that drives motivation, cognitive performance, and mood regulation. Research suggests it is most relevant when mental flatness and reduced focus are present as baseline issues rather than downstream effects of cortisol or caloric restriction.", whatItMeans: "The Research Protocol Bible covers Semax, Selank, and DSIP in the cognitive and mood section — when each one is the rational choice, how to confirm which pattern applies, and how they interact with an active fat loss protocol." },
  r_selank: { tag: "Cognitive — Selank", title: "Elevated stress response points to cortisol as the primary variable.", body: "Selank is researched for its ability to reduce stress-driven cortisol and anxiety without sedation or dependency. Research suggests it is the more relevant cognitive compound when the primary symptom is an elevated stress response rather than cognitive flatness.", whatItMeans: "The Research Protocol Bible covers the full cognitive and mood framework — when Selank is the correct choice over Semax, the mechanism behind it, and how to confirm cortisol is the upstream driver before making the compound decision." },
  r_cog_compound: { tag: "Cognitive — Compound Variable", title: "Cognitive change that followed a new compound is a compound variable, not a baseline issue.", body: "Mental flatness or mood shift that appears after a new compound is introduced or a dose is changed is more likely a compound interaction than a cognitive bottleneck requiring a separate addition. Adding a cognitive compound on top of an unidentified interaction rarely resolves it.", whatItMeans: "The Research Protocol Bible covers compound interaction logic and the isolation framework for identifying which variable is driving a cognitive or mood change when the timing points to a recent protocol change." },
};

const MULTI_RESULTS = {
  "energy,fatlose": {
    tag: "Two Active Bottlenecks",
    title: "Fat loss stalled and energy declining — these two are almost always connected.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The limiting variable has shifted from intake to output.", body: "After the initial intake suppression phase, fat loss transitions from appetite-driven to output-driven. The compound has done its primary job. The question is whether the body's fat mobilization capacity is keeping pace with the caloric environment." },
      { tag: "Bottleneck 03 — Energy Decline", title: "Energy compression is reducing output capacity at the same time.", body: "When energy declines alongside a fat loss plateau, research suggests the caloric deficit has become too aggressive for the body to sustain output. The intake-side mechanism is working. The output side is being compressed by it." }
    ],
    interaction: "These two bottlenecks are almost always the same problem expressed in two ways. The deficit that created fat loss in Phase 1 has become the ceiling on energy output in Phase 2. Addressing one without the other produces a partial result. The Research Protocol Bible covers the Phase 2 compound logic for fat mobilization alongside the energy pattern identification — the sequence matters significantly.",
    guide: "rpb"
  },
  "fatlose,muscle": {
    tag: "Two Active Bottlenecks",
    title: "Stalled fat loss while losing muscle — the deficit is working against itself.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization capacity is not keeping pace with the deficit.", body: "The intake suppression mechanism has reached its ceiling. The limiting variable has shifted to output — specifically whether the body can mobilize stored fat efficiently at this phase of the protocol." },
      { tag: "Bottleneck 01 — Losing Muscle", title: "The caloric deficit is pulling from lean mass as well as fat.", body: "Without a counteracting anabolic signal, sustained caloric restriction breaks down muscle alongside fat. This is not a compound failure — it is the body doing exactly what restricted intake tells it to do when there is no preservation signal." }
    ],
    interaction: "This combination is one of the clearest signals that the protocol needs a GH secretagogue support layer. The fat loss mechanism is working but the body is using muscle as a secondary fuel source. The Retatrutide, Tesamorelin, and Ipamorelin guide covers the lean mass support stack decisions that address this specific pattern — including the correct sequencing before adding a fat mobilization compound on top.",
    guide: "stack"
  },
  "energy,muscle": {
    tag: "Two Active Bottlenecks",
    title: "Low energy and muscle loss together — the deficit is running too deep.",
    bottlenecks: [
      { tag: "Bottleneck 03 — Energy Decline", title: "Output capacity is being compressed by the caloric environment.", body: "Gradual energy decline during a sustained deficit signals that the body's output capacity is being compressed. Research suggests this has three distinct presentations — identifying which one applies changes the compound response significantly." },
      { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down alongside fat.", body: "Without an adequate anabolic signal and sufficient protein, the body breaks down muscle for energy alongside fat. This is compounding the energy problem — less lean mass means a lower metabolic floor." }
    ],
    interaction: "Low energy and muscle loss in combination almost always signals the deficit is running too aggressively for the recovery system to maintain lean mass. The Research Protocol Bible covers the correct sequence — lean mass support first, then energy pattern identification — and why reversing that order tends to accelerate both problems.",
    guide: "rpb"
  },
  "energy,mood": {
    tag: "Two Active Bottlenecks",
    title: "Low energy and flat mood together — cortisol is likely the upstream driver of both.",
    bottlenecks: [
      { tag: "Bottleneck 03 — Energy Decline", title: "Energy output is being compressed by the protocol environment.", body: "Gradual energy decline during a sustained deficit often involves cortisol elevation as one of the primary mechanisms. The body under prolonged restriction increases cortisol to mobilize energy — and that cortisol elevation becomes its own ceiling." },
      { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood and depleted drive are almost always downstream cortisol signals.", body: "Mood and motivation loss during a protocol is almost always a downstream signal of elevated cortisol, hormonal suppression, or energy depletion — not a primary cognitive problem." }
    ],
    interaction: "When energy and mood decline together during an extended protocol, the research consistently points to cortisol elevation as the upstream variable driving both. The Research Protocol Bible covers the cortisol-driven pattern specifically — how to identify whether this is a cortisol ceiling, hormonal suppression, or pure energy depletion, and the compound logic that applies to each.",
    guide: "rpb"
  },
  "fatlose,mood": {
    tag: "Two Active Bottlenecks",
    title: "Stalled fat loss and flat mood — two signals the system is running at its ceiling.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The limiting variable has shifted from intake to output.", body: "Fat loss has transitioned past the appetite suppression phase. The question is whether fat mobilization capacity is keeping pace — and whether cortisol elevation from the extended deficit is part of what is limiting it." },
      { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood is a downstream signal of an upstream variable.", body: "Mood flatness during an extended protocol is almost always a cortisol or hormonal suppression signal. It tends to appear when the protocol has been running long enough for cumulative restriction stress to become significant." }
    ],
    interaction: "A fat loss plateau and mood flatness appearing together is a common presentation at weeks 10 to 16 of an extended protocol. Research suggests both are often downstream effects of a cortisol ceiling that has been quietly building. The Research Protocol Bible covers how to identify the cortisol component and why addressing the fat loss bottleneck without it tends to produce a protocol that looks correct on paper but does not respond.",
    guide: "rpb"
  },
  "fatlose,sleep": {
    tag: "Two Active Bottlenecks",
    title: "Stalled fat loss and disrupted sleep — sleep may be the upstream variable for both.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization has reached a ceiling.", body: "The intake suppression mechanism has done its work. The question is whether the output side is keeping pace — and whether poor sleep quality is suppressing the metabolic output that fat mobilization depends on." },
      { tag: "Bottleneck 04 — Sleep and Recovery", title: "Sleep disruption during a protocol is often a GLP-1 timing issue first.", body: "Sleep disruption that begins or worsens after starting or escalating a compound is worth investigating as a timing or dose variable before assuming it is a standalone bottleneck." }
    ],
    interaction: "Poor sleep suppresses growth hormone pulsatility, elevates cortisol, and reduces the metabolic output that fat loss at Phase 2 depends on. When these two appear together, fixing sleep is almost always the correct first move. The Research Protocol Bible covers the sleep and recovery bottleneck protocol and the GLP-1 timing variables that most commonly drive disruption.",
    guide: "rpb"
  },
  "energy,fatlose,muscle": {
    tag: "Three Active Bottlenecks",
    title: "Stalled fat loss, muscle loss, and low energy — the protocol is running beyond its recovery ceiling.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization capacity is not keeping pace with the deficit.", body: "The intake-side mechanism has reached its ceiling. The body needs a fat mobilization signal — but adding one without addressing the other two active bottlenecks runs it on a system that cannot process the output." },
      { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down as a secondary fuel source.", body: "Without an adequate anabolic signal, the body breaks down muscle alongside fat during sustained restriction. This is lowering the metabolic floor and compounding the energy problem." },
      { tag: "Bottleneck 03 — Energy Decline", title: "Output capacity is being compressed at the same time.", body: "Energy declining across all three of these patterns simultaneously signals the deficit has become more aggressive than the recovery system can manage." }
    ],
    interaction: "This three-bottleneck combination signals the protocol has moved past what a general framework can diagnose from the outside. The interactions are compounding: muscle loss lowers the metabolic floor, which deepens energy suppression, which reduces the body's ability to mobilize fat efficiently. The Research Protocol Bible covers all three bottlenecks and the sequencing logic that prevents adding compounds in an order that makes things worse before they get better.",
    guide: "rpb"
  },
  "energy,fatlose,mood": {
    tag: "Three Active Bottlenecks",
    title: "Stalled fat loss, low energy, and flat mood — a cortisol ceiling is likely driving all three.",
    bottlenecks: [
      { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Output capacity is the limiting variable.", body: "Fat loss has transitioned to output-driven. The question is whether cortisol elevation from extended restriction is part of what is suppressing fat mobilization." },
      { tag: "Bottleneck 03 — Energy Decline", title: "Energy output is being compressed by the caloric environment.", body: "Gradual energy decline during a sustained deficit often involves cortisol as one of the primary mechanisms. The body under prolonged restriction increases cortisol — and that elevation becomes a ceiling." },
      { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood is a downstream cortisol or hormonal suppression signal.", body: "Mood flatness during an extended protocol is almost always downstream of elevated cortisol or hormonal suppression — not a standalone problem." }
    ],
    interaction: "When all three appear together, the research consistently points to a cortisol ceiling as the variable driving the entire picture. The Research Protocol Bible covers this specific pattern — the cortisol-driven triple bottleneck — and the diagnostic sequence for identifying the correct upstream cause before making any compound decision.",
    guide: "rpb"
  },
  "mood,muscle,phase3": {
    tag: "Phase 3 — Multiple Active Bottlenecks",
    title: "Training decline, muscle loss, and mood flatness together — Phase 3 with compounding signals.",
    bottlenecks: [
      { tag: "Phase 3 — Recovery Strain", title: "The system is under recovery strain from sustained restriction and training load.", body: "Phase 3 occurs when the caloric deficit that drove fat loss in Phase 2 becomes the ceiling on recovery capacity. Training performance declines because the body cannot recover fast enough between sessions." },
      { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down alongside the recovery strain.", body: "In Phase 3, lean mass preservation becomes critical. Without an adequate anabolic signal, the combination of caloric restriction and training load accelerates muscle breakdown." },
      { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood at this stage is almost always a downstream cortisol signal.", body: "Phase 3 increases cortisol load from both the deficit and the training stimulus. Mood and drive flatness here is a physiological signal — not a willpower issue." }
    ],
    interaction: "This combination in Phase 3 is a systemic problem, not three separate bottlenecks. The Retatrutide, Tesamorelin, and Ipamorelin guide covers Phase 3 recovery strain and the GH secretagogue stack decisions the research supports for this specific presentation — including the protocol structure adjustments that need to happen before any compound addition.",
    guide: "stack"
  }
};

const RESULT_GUIDE_MAP = {
  // ─── NEW: Pre-protocol CTA map ─────────────────────────────────────────────
  r_pre_foundation: { guide: "rpb", explanation: "The research guides cover the Foundation Gate framework — what each input does to compound efficacy, the order in which to address them, and what stable looks like before any protocol starts. Starting with the foundation correct produces cleaner results from week one and removes the most common source of unreadable protocol data.", auditMention: null },
  r_pre_gi_concern: { guide: "reta", explanation: "The Retatrutide guide covers GI symptom management in detail — the three distinct presentations, the dose and timing variables that drive each one, and how to distinguish a manageable titration response from a signal that something else needs attention. Understanding this before starting means it is not a surprise when it happens.", auditMention: null },
  r_pre_muscle_concern: { guide: "rpb", explanation: "The Research Protocol Bible covers lean mass preservation across all four protocol phases — which inputs protect it, when a GH support compound becomes the rational addition, and the sequencing logic that prevents the most common lean mass mistakes on an active fat loss protocol.", auditMention: null },
  r_pre_sleep_concern: { guide: "reta", explanation: "The Retatrutide guide covers injection timing in detail — the mechanism behind morning versus evening injection, why timing matters differently for retatrutide than for other GLP-1 compounds, and what the data shows about sleep disruption as a timing variable. This is a non-issue when timing is correct from the start.", auditMention: null },
  r_pre_general_concern: { guide: "rpb", explanation: "The Research Protocol Bible covers the full phase framework from the start — what each phase looks like, what normal variation looks like at each stage, and how to read results accurately rather than reacting to them. Researchers who understand these patterns before they happen make far fewer reactive decisions.", auditMention: null },
  r_pre_glp1_mechanism: { guide: "reta", explanation: "The Retatrutide guide covers the full GLP-1 mechanism in plain language — what each receptor does, how that translates into observable results at each phase, and why the same compound works differently for different researchers depending on which mechanism is the active limiting variable.", auditMention: null },
  r_pre_phase_logic: { guide: "rpb", explanation: "The Research Protocol Bible is built around the phase framework. It covers all four phases in detail — how to identify which one applies, what the rational compound logic is at each stage, and why the sequence matters more than the compound choice itself.", auditMention: null },
  r_pre_compound_match: { guide: "rpb", explanation: "The Research Protocol Bible covers the GLP-1 starting point decision and the compound selection framework in the first chapter — how to identify which compound fits the actual limiting variable before starting, not after the first plateau.", auditMention: null },
  r_pre_support_logic: { guide: "rpb", explanation: "The Research Protocol Bible covers the support compound decision framework — which bottleneck each support compound addresses, when that bottleneck becomes the active limiting variable, and why the sequencing matters more than the compound itself.", auditMention: null },
  r_pre_early_researcher: { guide: "rpb", explanation: "The Research Protocol Bible is the logical starting point for researchers still building the picture. It covers the full framework — phase identification, compound selection logic, foundation requirements, and the bottleneck diagnostic system — before any protocol decision is made.", auditMention: null },
  r_pre_ready: { guide: "rpb", explanation: "The Research Protocol Bible covers the starting point decision and the compound selection framework in detail — how to confirm the match between your limiting variable and the compound mechanism before committing to a protocol.", auditMention: "A personalized protocol review is a structured analysis where your specific situation, goals, and research history get mapped against the diagnostic framework and the correct starting point gets identified for your case. That is what the Protocol Audit is designed for." },
  r_pre_ready_experienced: { guide: "rpb", explanation: "The Research Protocol Bible covers the compound selection framework from the starting point decision forward — how to identify the actual limiting variable, how to confirm the compound mechanism addresses it, and what the Foundation Gate looks like before starting.", auditMention: "A personalized protocol review applies the full diagnostic framework to your specific situation and identifies the correct starting point and sequencing for your case. If you want a diagnosis rather than a framework before you start, the Protocol Audit is that next step." },

  // ─── EXISTING: Active protocol CTA map (unchanged) ───────────────────────
  r_phase1_early: { guide: "reta", explanation: "The Retatrutide: From First Dose to Full Protocol guide covers the titration window in detail — what the research shows about weeks one through six, how to read early signals correctly, and why escalating the dose before the effective range is established almost always produces a worse outcome than waiting. If you are in this window and unsure whether it is working, this guide gives you the framework to evaluate it without guessing." },
  r_no_intake: { guide: "reta", explanation: "The Retatrutide guide covers the intake suppression mechanism and what an absent appetite response actually signals. It walks through the three most common causes — under-dosing, active titration, and reconstitution error — and how to distinguish between them. If the compound is not suppressing appetite yet, this is where you find out why before changing anything." },
  r_caloric_audit: { guide: "reta", explanation: "The Retatrutide guide covers the Phase 2 metabolic adaptation pattern directly — why a real deficit at week 4 often becomes a marginal one by week 12, and how to run the 7-day intake audit that identifies the actual gap. Most plateaus at this stage are not compound failures. They are intake drift that becomes invisible without tracking. This guide shows you how to confirm which one you are dealing with." },
  r_foundation_sleep: { guide: "rpb", explanation: "The Research Protocol Bible covers the full Foundation Gate framework — the four inputs that determine whether any compound can produce a measurable result. Sleep is Gate 1, and the RPB covers the specific GLP-1 timing and dose variables that most commonly drive disruption. Before adding anything, this framework tells you what to check first and in what order." },
  r_foundation_stimulant: { guide: "rpb", explanation: "The Research Protocol Bible covers the Foundation Gate including the stimulant load variable and why daily use creates a cortisol ceiling that caps what any metabolic compound can accomplish. The RPB walks through how to evaluate whether stimulant load is the active ceiling in your protocol and what the correct sequencing looks like before any compound addition." },
  r_foundation_protein: { guide: "rpb", explanation: "The Research Protocol Bible covers protein as a Foundation Gate variable and why GLP-1-driven appetite suppression so commonly pulls protein intake down alongside calories. The RPB gives you the framework for correcting protein intake in the context of an active protocol without disrupting the caloric environment that is driving fat loss." },
  r_bn01: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the lean mass bottleneck directly. It walks through which GH secretagogue combinations the research supports for lean mass preservation during an active GLP-1 protocol, the sequencing logic for introducing them, and what to rule out on the GLP-1 side before adding anything. If you are losing muscle on a cut, this guide covers the specific stack decisions that address it." },
  r_bn02_early: { guide: "reta", explanation: "The Retatrutide guide covers the three checks to run before interpreting a recent stall as a bottleneck — precise caloric tracking, dose and timing review, and compound-specific stall pattern identification. A stall under three weeks is almost always one of these three things. This guide walks through all of them in the context of an active retatrutide or GLP-1 protocol." },
  r_bn02: { guide: "reta", explanation: "The Retatrutide guide covers the Phase 2 fat loss pattern in detail — what drives the transition from intake-driven to output-driven fat loss, which fat mobilization variables the research points to at this stage, and how to evaluate whether your protocol has genuinely entered Phase 2 or whether a caloric drift is the simpler explanation. This is the most common plateau pattern on GLP-1 protocols and this guide covers it directly." },
  r_bn02_extended: { guide: "rpb", explanation: "The Research Protocol Bible covers the extended stall pattern and the framework for identifying overlapping bottlenecks. When a plateau has lasted more than six weeks and standard Phase 2 interventions have not moved it, the RPB gives you the diagnostic sequence for finding the second variable running underneath the first — which is almost always what an extended stall represents." },
  r_bn03_dose: { guide: "reta", explanation: "The Retatrutide guide covers the dose-driven energy drop pattern and how to distinguish it from a genuine energy bottleneck. When energy falls shortly after an escalation, the compound is most likely creating a deficit the body cannot sustain output under. This guide walks through the evaluation logic and what the data supports as the correct first move before adding anything." },
  r_bn03: { guide: "rpb", explanation: "The Research Protocol Bible covers all three presentations of the gradual energy decline pattern and the compound logic that applies to each. Getting the presentation right matters more than the compound choice itself — the RPB gives you the framework for identifying which of the three you are in before making any addition." },
  r_bn03_baseline: { guide: "rpb", explanation: "The Research Protocol Bible covers the Foundation Gate in full, which is where baseline energy issues almost always trace back to. The RPB walks through all four foundation inputs in order and explains why adding an energy compound before ruling out foundational causes typically amplifies the problem rather than correcting it." },
  r_bn04: { guide: "rpb", explanation: "The Research Protocol Bible covers the sleep and recovery bottleneck protocol — the timing and dose variables to check first, and the specific compounds the research supports for each presentation of sleep disruption during an active protocol. Sleep disruption that begins with a protocol change is almost always a protocol variable before it is a bottleneck. The RPB covers how to tell the difference." },
  r_bn05: { guide: "reta", explanation: "The Retatrutide guide covers GI symptoms in the context of an active GLP-1 protocol and how to distinguish between the three presentations — dose timing driven nausea, gut motility issues from sustained suppression, and mucosal stress from extended restriction. Each one responds differently. This guide gives you the framework to identify which pattern applies before reaching for an intervention." },
  r_bn06: { guide: "rpb", explanation: "The Research Protocol Bible covers the mood and motivation bottleneck and the diagnostic sequence for identifying whether the upstream driver is cortisol elevation, hormonal suppression, or energy depletion. For male researchers past week 12, the RPB covers the hormonal suppression evaluation specifically — adding mood support compounds before identifying the upstream cause rarely resolves it." },
  r_bn07: { guide: "rpb", explanation: "The Research Protocol Bible covers the dose escalation pattern and the five checks to run before any further dose change. The RPB is direct on this: when escalating the dose does not move the plateau, the dose was not the limiting variable. The framework tells you what is." },
  r_bn07_stall: { guide: "rpb", explanation: "The Research Protocol Bible covers the pre-escalation checklist and the Phase 2 assessment that almost always identifies the actual limiting variable when a stall triggered a dose increase. Running both in sequence is the correct diagnostic approach — the RPB walks through both in order." },
  r_phase3: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers Phase 3 recovery strain and the compound logic that applies when training performance declines alongside a stall. This is a different compound framework than Phase 2 — the guide covers the specific GH secretagogue stack decisions the research supports for rebuilding output capacity without adding metabolic demand the system cannot handle." },
  r_phase4: { guide: "rpb", explanation: "The Research Protocol Bible covers the Phase 4 framework and what the research supports for rebuilding recovery capacity when the sleep-stall-recovery pattern has collapsed together. Phase 4 requires a different compound logic than any earlier phase — adding more at this stage almost always makes things worse. The RPB covers what to do instead and in what order." },
  r_gh_insulin: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the fasted window requirement for GH secretagogues in detail — including how an active GLP-1 protocol changes the required window by slowing gastric emptying. A standard two to three hour post-meal window is often insufficient on a combined protocol. This guide covers the specific timing logic for each compound in the stack." },
  r_gh_bedtime: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers injection timing for every GH secretagogue in the stack and explains specifically why bedtime Tesamorelin is the most common timing mistake. It covers the active window for each compound, when daytime versus bedtime injection is rational, and the one exception where bedtime injection is the correct choice." },
  r_gh_mixed: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the consistency requirements for GH secretagogue protocols and why varying the injection window produces inconsistent results regardless of compound quality. It walks through how to establish a fixed injection protocol and what to expect once consistency is established." },
  r_gh_environment: { guide: "stack", explanation: "The Retatrutide, Tesamorelin, and Ipamorelin guide covers the environmental inputs that govern GH pulse quality — sleep depth, cortisol context, insulin environment, and somatostatin brake at injection time. If the stack is not producing a measurable result, this guide walks through the environmental audit before concluding the compound is not working." },
  r_repair_none: { guide: "rpb", explanation: "The Research Protocol Bible covers the tissue repair bottleneck including the three most common causes of a null result — reconstitution error, dose inconsistency, and environmental suppression of the repair signal. The RPB Reconstitution Reference is the first check to run. Most null repair results trace back to a preparation variable, not a compound selection problem." },
  r_repair_slow: { guide: "rpb", explanation: "The Research Protocol Bible covers the tissue repair framework and how to evaluate whether the compound combination is correctly matched to the repair presentation. BPC-157 and TB-500 amplify existing repair signaling — the RPB covers what the signaling environment needs to look like for that amplification to produce a measurable result." },
  r_longevity_general: { guide: "motsc", explanation: "The MOTS-C and SS-31 guide covers the general longevity stack decision directly — when each compound becomes the rational choice, how they interact with each other, and why foundational inputs need to be reasonably stable before longevity compounds produce their most meaningful results. If you are running a cellular health stack and trying to evaluate whether you have the right compounds in the right context, this guide addresses that decision." },
  r_immune: { guide: "motsc", explanation: "The MOTS-C and SS-31 guide covers immune resilience and cellular support compounds and how to distinguish between the patterns that each one addresses. Immune suppression, systemic inflammation, and oxidative stress from a prolonged protocol each call for a different approach — this guide covers the framework for identifying which pattern applies." },
  r_semax: { guide: "rpb", explanation: "The Research Protocol Bible covers the cognitive and mood section including Semax, Selank, and DSIP — when each one is the rational choice and how they interact with an active fat loss protocol. Baseline mental flatness that points to BDNF signaling is a specific pattern, and the RPB covers how to confirm that is what you are dealing with before making a compound decision." },
  r_selank: { guide: "rpb", explanation: "The Research Protocol Bible covers the full cognitive and mood framework including when Selank is the correct choice over Semax based on the symptom presentation. An elevated stress response and anxiety pattern points to cortisol as the primary variable — the RPB covers the Selank mechanism, when it applies, and how it interacts with an active protocol." },
  r_cog_compound: { guide: "rpb", explanation: "The Research Protocol Bible covers compound interaction logic and how to systematically isolate which variable is driving a cognitive or mood change when the timing points to a recent protocol change. Adding a cognitive compound on top of an unidentified interaction almost never resolves it — the RPB gives you the isolation framework to find the actual cause." },
};

function getProgress(qid) {
  if (!qid) return 0;
  if (qid.startsWith("r_") || qid.startsWith("MULTI:")) return 100;
  const map = {
    q_position: 3,
    q_pre_goal: 10, q_pre_barrier: 18, q_pre_energy_barrier: 18,
    q_pre_foundation: 28, q_pre_sideeffects: 28, q_pre_mechanism: 28,
    q_pre_research_duration: 38, q_pre_landscape: 18,
    q_start: 5, q_glp1_duration: 15, q_glp1_early: 20, q_glp1_status: 20,
    q_glp1_no_start: 25, q_glp1_stall_context: 28, q_glp1_caloric: 32,
    q_p3_training: 28, q_p4_sleep: 28, q_gh_duration: 15, q_gh_early: 20,
    q_gh_results: 22, q_gh_environment: 35, q_gh_timing: 35, q_gh_sleep: 42,
    q_peptide_type: 15, q_peptide_repair: 25, q_peptide_repair_found: 35,
    q_peptide_longevity: 25, q_peptide_cog: 25, q_peptide_cog_cause: 35,
    q_found_sleep: 48, q_found_sleep_p3: 48, q_found_stimulant: 58,
    q_found_stimulant_p3: 58, q_found_protein: 68, q_found_protein_p3: 68,
    q_bn_main: 78, q_bn_p3: 78, q_fatlose_dose: 86, q_fatlose_duration: 92,
    q_energy_timing: 88
  };
  return map[qid] || 50;
}

function CTABlock({ resultKey }) {
  const isMultiKey = resultKey && resultKey.startsWith("MULTI:");
  const multiKey = isMultiKey ? resultKey.replace("MULTI:", "") : null;
  const multiResult = multiKey ? MULTI_RESULTS[multiKey] : null;

  const guideKey = isMultiKey
    ? (multiResult ? multiResult.guide : "rpb")
    : (RESULT_GUIDE_MAP[resultKey] ? RESULT_GUIDE_MAP[resultKey].guide : "rpb");

  const ctaEntry = !isMultiKey ? RESULT_GUIDE_MAP[resultKey] : null;
  const explanation = ctaEntry ? ctaEntry.explanation : null;
  const auditMention = ctaEntry ? ctaEntry.auditMention : null;

  return (
    <div className="pt-cta-block">
      <div className="pt-cta-label">Where to go next</div>
      {explanation && <p className="pt-cta-text">{explanation}</p>}
      <a className="pt-pill" href={CATALOG_URL} target="_blank" rel="noopener noreferrer">
        Find the Right Guide
      </a>
      {auditMention && (
        <p className="pt-audit-mention">{auditMention}</p>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("start");
  const [history, setHistory] = useState(["q_position"]);
  const [selected, setSelected] = useState([]);
  const [emailValue, setEmailValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const current = history[history.length - 1];
  const isMultiResult = current.startsWith("MULTI:");
  const isResult = current.startsWith("r_") || isMultiResult;
  const question = !isResult && screen === "questions" ? QUESTIONS[current] : null;
  const progress = getProgress(current);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    const trimmedEmail = emailValue.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSubmitError("Enter a valid email address to unlock your result.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_COMPANY_ID}`, {
        method: "POST",
        headers: { "content-type": "application/json", revision: "2024-02-15" },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              custom_source: "Protocol Bottleneck Tool",
              profile: { data: { type: "profile", attributes: { email: trimmedEmail } } }
            },
            relationships: { list: { data: { type: "list", id: KLAVIYO_LIST_ID } } }
          }
        })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.errors?.[0]?.detail || "Subscription failed");
      trackResultEvent(history[history.length - 1], trimmedEmail);
      setScreen("result");
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function routeResult(next) {
    setHistory((h) => [...h, next]);
    setScreen("gate");
  }

  function handleSingle(next) {
    setSelected([]);
    const targetIsResult = next.startsWith("r_") || next.startsWith("MULTI:");
    if (targetIsResult) { routeResult(next); } else { setHistory((h) => [...h, next]); }
  }

  function handleMultiToggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleMultiContinue() {
    if (selected.length === 0) return;
    const q = QUESTIONS[current];
    const next = q.multiNext(selected);
    setSelected([]);
    const targetIsResult = next.startsWith("r_") || next.startsWith("MULTI:");
    if (targetIsResult) { routeResult(next); } else { setHistory((h) => [...h, next]); }
  }

  function handleBack() {
    if (history.length > 1) {
      setSelected([]);
      setHistory((h) => h.slice(0, -1));
      if (screen === "gate") setScreen("questions");
    }
  }

  function handleRestart() {
    setSelected([]);
    setEmailValue("");
    setSubmitError("");
    setIsSubmitting(false);
    setHistory(["q_position"]);
    setScreen("start");
  }

  const resultKey = history[history.length - 1];
  const isMulti = resultKey.startsWith("MULTI:");
  const multiKey = isMulti ? resultKey.replace("MULTI:", "") : null;
  const singleResult = !isMulti && resultKey.startsWith("r_") ? RESULTS[resultKey] : null;
  const multiResult = multiKey ? MULTI_RESULTS[multiKey] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="pt-wrap">
        <div className="pt-header">
          <div className="pt-eyebrow">Free Protocol Diagnostic</div>
          <h1 className="pt-title">Your protocol is not the problem. Finding the limiting variable is.</h1>
          <p className="pt-sell-line">Most people do not need another compound. They need a clearer read on what is actually failing.</p>
          <p className="pt-sell-sub">This tool identifies the likely bottleneck first. Then it routes you to the right research guide for your specific situation.</p>
          <p className="pt-spec-line">4 phases · 7 bottlenecks · layered result routing · 5 minutes</p>
          {screen === "start" && (
            <button className="pt-pill" onClick={() => setScreen("questions")}>Find Your Bottleneck</button>
          )}
        </div>

        {screen !== "start" && (
          <div className="pt-progress-bar">
            <div className="pt-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        {screen === "questions" && question && (
          <div className="pt-card fade-in" key={current}>
            <div className="pt-step-label">{question.stepLabel}</div>
            <h2 className="pt-question">{question.question}</h2>
            {question.note && <p className="pt-question-note">{question.note}</p>}
            {question.multiSelect ? (
              <>
                <p className="pt-multi-hint">Select all that apply</p>
                <div className="pt-multi-options">
                  {question.options.map((opt) => (
                    <button key={opt.id} className={`pt-option-multi${selected.includes(opt.id) ? " checked" : ""}`} onClick={() => handleMultiToggle(opt.id)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button className="pt-pill" onClick={handleMultiContinue} disabled={selected.length === 0}>Continue</button>
              </>
            ) : (
              <div className="pt-options">
                {question.options.map((opt, i) => (
                  <button key={i} className="pt-option" onClick={() => handleSingle(opt.next)}>{opt.label}</button>
                ))}
              </div>
            )}
            {history.length > 1 && <button className="pt-back" onClick={handleBack}>← Go back</button>}
          </div>
        )}

        {screen === "gate" && (
          <div className="pt-gate-screen fade-in">
            <div className="pt-gate-eyebrow">Almost there</div>
            <h2 className="pt-gate-title">Your result has been identified.</h2>
            <p className="pt-gate-body">Enter your email to unlock your result and receive the free Protocol Stall Guide — a diagnostic framework for the most common Phase 2 fat loss plateau, built on the same system this tool uses.</p>
            <div className="pt-gate-divider" />
            <div className="pt-gate-form-label">Enter your email to unlock</div>
            <form className="pt-gate-form" onSubmit={handleEmailSubmit}>
              <input
                className="pt-gate-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => { setEmailValue(e.target.value); if (submitError) setSubmitError(""); }}
              />
              <button className="pt-pill" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Unlocking..." : "Unlock My Result"}
              </button>
              {submitError && <p className="pt-gate-error">{submitError}</p>}
            </form>
          </div>
        )}

        {screen === "result" && (
          <>
            {singleResult && (
              <div className="pt-result fade-in">
                <div className="pt-result-tag">{singleResult.tag}</div>
                <h2 className="pt-result-title">{singleResult.title}</h2>
                <p className="pt-result-body">{singleResult.body}</p>
                {singleResult.whatItMeans && (
                  <div className="pt-result-what">
                    <div className="pt-result-what-label">What this means for your research</div>
                    <p className="pt-result-what-text">{singleResult.whatItMeans}</p>
                  </div>
                )}
                <div className="pt-divider" />
                <CTABlock resultKey={resultKey} />
                <button className="pt-restart" onClick={handleRestart}>Start over</button>
              </div>
            )}

            {multiResult && (
              <div className="pt-result fade-in">
                <div className="pt-result-tag">{multiResult.tag}</div>
                <h2 className="pt-result-title">{multiResult.title}</h2>
                {multiResult.bottlenecks.map((bn, i) => (
                  <div className="pt-bn-block" key={i}>
                    <div className="pt-bn-block-tag">{bn.tag}</div>
                    <div className="pt-bn-block-title">{bn.title}</div>
                    <p className="pt-bn-block-body">{bn.body}</p>
                  </div>
                ))}
                <div className="pt-result-what">
                  <div className="pt-result-what-label">How these interact</div>
                  <p className="pt-result-what-text">{multiResult.interaction}</p>
                </div>
                <div className="pt-divider" />
                <CTABlock resultKey={resultKey} />
                <button className="pt-restart" onClick={handleRestart}>Start over</button>
              </div>
            )}
          </>
        )}

        <p className="pt-disclaimer">
          For educational and research purposes only. Not medical advice.<br />
          Not for human use guidance. Consult a qualified medical professional<br />
          before beginning any research protocol.
        </p>
      </div>
    </>
  );
}
