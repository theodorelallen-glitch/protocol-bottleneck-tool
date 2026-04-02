import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .pt-wrap { background: #2c2e24; color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; min-height: 100vh; padding: 0 0 80px 0; }

  /* HEADER */
  .pt-header { padding: 52px 24px 48px; border-bottom: 1px solid rgba(232,224,208,0.15); margin-bottom: 44px; max-width: 520px; margin-left: auto; margin-right: auto; }
  .pt-eyebrow { font-family: 'Jost', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.6); margin-bottom: 22px; }
  .pt-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(38px, 8vw, 58px); line-height: 1.05; color: #e8e0d0; margin-bottom: 22px; }
  .pt-sell-line { font-size: 15px; line-height: 1.75; color: rgba(232,224,208,0.75); margin-bottom: 12px; }
  .pt-sell-sub { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.55); margin-bottom: 30px; }
  .pt-spec-line { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.4); margin-bottom: 36px; }

  /* PROGRESS */
  .pt-progress-bar { height: 2px; background: rgba(232,224,208,0.12); margin: 0 24px 44px; border-radius: 2px; overflow: hidden; }
  .pt-progress-fill { height: 100%; background: #e8e0d0; border-radius: 2px; transition: width 0.5s ease; }

  /* QUESTION CARD */
  .pt-card { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-step-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 14px; }
  .pt-question { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(22px, 5vw, 30px); line-height: 1.25; color: #e8e0d0; margin-bottom: 12px; }
  .pt-question-note { font-size: 13px; color: rgba(232,224,208,0.5); line-height: 1.65; margin-bottom: 28px; font-style: italic; }
  .pt-multi-hint { font-size: 10px; color: rgba(232,224,208,0.45); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 14px; }

  /* SINGLE SELECT */
  .pt-options { display: flex; flex-direction: column; gap: 10px; }
  .pt-option { background: rgba(232,224,208,0.06); border: 1px solid rgba(232,224,208,0.18); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.55; padding: 16px 20px; text-align: left; cursor: pointer; border-radius: 2px; transition: all 0.2s ease; width: 100%; }
  .pt-option:hover { background: rgba(232,224,208,0.12); border-color: rgba(232,224,208,0.45); }

  /* MULTI SELECT */
  .pt-multi-options { display: flex; flex-direction: column; gap: 10px; }
  .pt-option-multi { background: rgba(232,224,208,0.06); border: 1px solid rgba(232,224,208,0.18); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.55; padding: 15px 20px 15px 50px; text-align: left; cursor: pointer; border-radius: 2px; transition: all 0.2s ease; width: 100%; position: relative; }
  .pt-option-multi::before { content: ''; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border: 1px solid rgba(232,224,208,0.35); border-radius: 2px; transition: all 0.2s; }
  .pt-option-multi.checked { background: rgba(232,224,208,0.12); border-color: rgba(232,224,208,0.6); }
  .pt-option-multi.checked::before { background: #e8e0d0; border-color: #e8e0d0; }
  .pt-option-multi.checked::after { content: '✓'; position: absolute; left: 19px; top: 50%; transform: translateY(-52%); font-size: 10px; color: #2c2e24; font-weight: 700; }
  .pt-option-multi:hover { background: rgba(232,224,208,0.1); border-color: rgba(232,224,208,0.35); }

  /* PILL BUTTONS */
  .pt-pill { display: block; background: #e8e0d0; color: #2c2e24; font-family: 'Jost', sans-serif; font-weight: 400; font-size: 14px; letter-spacing: 0.5px; padding: 17px 32px; text-align: center; cursor: pointer; border: none; border-radius: 50px; width: 100%; margin-top: 22px; transition: opacity 0.2s, transform 0.15s; text-decoration: none; }
  .pt-pill:hover { opacity: 0.88; transform: translateY(-1px); }
  .pt-pill:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
  .pt-pill-outline { display: block; background: transparent; color: rgba(232,224,208,0.75); font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; letter-spacing: 0.5px; padding: 16px 32px; text-align: center; cursor: pointer; border: 1px solid rgba(232,224,208,0.3); border-radius: 50px; width: 100%; margin-top: 12px; transition: all 0.2s; text-decoration: none; }
  .pt-pill-outline:hover { border-color: rgba(232,224,208,0.6); color: #e8e0d0; transform: translateY(-1px); }

  .pt-back { background: none; border: none; color: rgba(232,224,208,0.4); font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 1px; cursor: pointer; padding: 0; margin-top: 24px; display: block; transition: color 0.2s; }
  .pt-back:hover { color: rgba(232,224,208,0.75); }

  /* EMAIL GATE SCREEN */
  .pt-gate-screen { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-gate-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 16px; }
  .pt-gate-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(28px, 6vw, 42px); line-height: 1.1; color: #e8e0d0; margin-bottom: 18px; }
  .pt-gate-body { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.65); margin-bottom: 32px; }
  .pt-gate-divider { height: 1px; background: rgba(232,224,208,0.1); margin: 0 0 32px; }
  .pt-gate-form-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 16px; }
  .pt-skip { display: block; text-align: center; margin-top: 20px; font-size: 12px; letter-spacing: 1px; color: rgba(232,224,208,0.4); cursor: pointer; background: none; border: none; font-family: 'Jost', sans-serif; transition: color 0.2s; text-decoration: underline; text-underline-offset: 3px; width: 100%; }
  .pt-skip:hover { color: rgba(232,224,208,0.7); }

  /* RESULT */
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

  .pt-restart { display: block; text-align: center; margin-top: 40px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.35); cursor: pointer; background: none; border: none; font-family: 'Jost', sans-serif; transition: color 0.2s; }
  .pt-restart:hover { color: rgba(232,224,208,0.6); }

  .pt-disclaimer { text-align: center; font-size: 10px; color: rgba(232,224,208,0.3); letter-spacing: 1px; margin-top: 52px; line-height: 1.8; padding: 0 24px; }

  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

const QUESTIONS = {
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
      { label: "Metabolic or energy output — not GLP-1 based", next: "q_found_sleep" },
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
  r_phase1_early: { tag: "Phase Identification", title: "You are still in the titration window.", body: "The first 4 weeks on a GLP-1 compound are a dose escalation and adjustment phase. Research suggests meaningful results typically appear after the effective dose range is reached and the body has adapted to the intake shift. Evaluating the compound before that window closes produces a misleading read.", whatItMeans: "The most common mistake at this stage is escalating the dose because nothing is visible yet. The data supports patience over escalation during weeks one through six." },
  r_no_intake: { tag: "Dose and Titration", title: "Intake is not yet suppressed — this is a titration variable, not a bottleneck.", body: "If hunger and food intake have not changed after several weeks, the compound is either under-dosed, still titrating, or there is a reconstitution or administration variable worth ruling out. Research on GLP-1 compounds shows intake suppression as the primary mechanism. If that is absent, the downstream fat loss effect has no mechanism to work through.", whatItMeans: "This is not a stacking question. It is a titration question. Adding support compounds on top of an ineffective foundation dose does not resolve the underlying issue." },
  r_caloric_audit: { tag: "Foundation Check", title: "The caloric picture needs to be established before the protocol can be evaluated.", body: "Metabolic rate adapts during extended GLP-1 protocols. What was a real deficit at week 4 may produce a much smaller deficit by week 12 — not because the compound stopped working, but because the body adjusted. Research consistently shows most plateaus at this stage resolve or become diagnosable once intake is tracked precisely for 7 days.", whatItMeans: "Running a 7-day tracked intake period before making any protocol change is the first step the RPB framework recommends at Phase 2. It is the check that most often identifies the actual problem fastest." },
  r_foundation_sleep: { tag: "Foundation Gate — Sleep", title: "Sleep is the first intervention, not a compound addition.", body: "Sleep deprivation suppresses growth hormone pulsatility, elevates cortisol, and disrupts the metabolic signaling that compounds are designed to work within. Adding a compound on top of chronic sleep deprivation produces a fraction of the documented effect because the environment is actively working against it.", whatItMeans: "Before anything else, check whether GLP-1 injection timing or a recent dose escalation is contributing to the sleep disruption. A timing adjustment frequently resolves the problem without any compound addition." },
  r_foundation_stimulant: { tag: "Foundation Gate — Stimulant Load", title: "Daily stimulant use is contaminating the protocol read.", body: "Using stimulants daily to reach baseline energy elevates cortisol and creates ongoing oxidative stress. This sets a physiological ceiling on what any metabolic compound can accomplish. Research suggests this is one of the most underreported variables in protocol failure.", whatItMeans: "The experiment cannot produce a clean result while this input is active. Reducing stimulant frequency alongside sleep correction is the first rational move — not a compound addition." },
  r_foundation_protein: { tag: "Foundation Gate — Protein", title: "Protein intake has dropped with appetite — and lean mass is paying for it.", body: "GLP-1 compounds suppress appetite broadly, which often pulls protein intake down alongside caloric intake. If total protein has dropped below roughly 0.7g per pound of lean body mass, lean mass preservation becomes the primary issue.", whatItMeans: "Correcting protein intake before adding a lean mass support compound produces a cleaner result. Adding it on top of inadequate protein does not solve the upstream problem." },
  r_bn01: { tag: "Bottleneck 01 — Losing Muscle", title: "The limiting variable is lean mass — the body is breaking down muscle alongside fat.", body: "When running a significant caloric deficit, the body breaks down muscle tissue for energy — especially when protein intake is low or training stimulus is not strong enough to send a preservation signal. This is not a failure of the compound. It is the body doing exactly what sustained caloric restriction tells it to do when there is no counteracting anabolic signal.", whatItMeans: "The RPB covers the complete lean mass bottleneck protocol — which GH secretagogue combinations the research supports, what to check on the GLP-1 side first, and the correct sequence for introducing lean mass support." },
  r_bn02_early: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The stall is recent — a GLP-1 audit should run before any protocol change.", body: "A stall under 3 weeks is within normal variation for most protocols. Research suggests running three checks before interpreting it as a bottleneck: precise caloric tracking for 7 days, dose and timing review, and compound-specific stall pattern assessment.", whatItMeans: "The RPB walks through all three checks and the compound-specific stall patterns for semaglutide, tirzepatide, and retatrutide in the Phase 2 section." },
  r_bn02: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Phase 2 fat loss bottleneck — the limiting variable has shifted from intake to output.", body: "After the initial intake suppression phase, fat loss transitions from appetite-driven to output-driven. The compound has done its primary job. The question becomes whether the body's fat mobilization capacity is keeping pace with the caloric environment.", whatItMeans: "The RPB covers the full Phase 2 protocol — which fat mobilization compounds the research supports, what not to add, and how to sequence the response correctly." },
  r_bn02_extended: { tag: "Bottleneck 02 — Extended Stall", title: "An extended stall may involve overlapping bottlenecks.", body: "A plateau lasting more than 6 weeks that has not responded to standard Phase 2 interventions often involves more than one active bottleneck — or a phase read that looked accurate but had a second variable running underneath it.", whatItMeans: "The RPB gives you the framework for identifying where the overlap is. If Phase 2 interventions have already been run correctly and the stall persists, that is specifically what the audit is designed for." },
  r_bn03_dose: { tag: "Bottleneck 03 — Energy (Dose Variable)", title: "Energy dropped after a dose increase — this is a GLP-1 variable, not a compound gap.", body: "When energy drops shortly after a dose escalation, research suggests the dose itself is creating a deficit too aggressive for the body to sustain output. The result looks like an energy bottleneck but is actually a dose or timing issue.", whatItMeans: "Evaluating whether a dose reduction or timing adjustment resolves the energy drop is the rational first move. Adding energy compounds on top of a dose problem does not fix the root cause." },
  r_bn03: { tag: "Bottleneck 03 — Energy (Gradual Decline)", title: "Gradual energy decline points to a systemic output issue, not a single dose event.", body: "Energy that declines gradually over weeks during a sustained deficit signals that the body's output capacity is being compressed by the caloric environment. Research suggests this pattern has three distinct presentations that each map to a different compound response.", whatItMeans: "The RPB covers all three energy bottleneck presentations and the compound logic for each. Getting the presentation right matters more than the compound choice itself." },
  r_bn03_baseline: { tag: "Foundation Gate — Baseline Energy", title: "Low energy from the start is almost always a foundation variable, not a compound gap.", body: "When energy has been low since protocol initiation, research consistently points to foundational inputs rather than a compound bottleneck. Adding an energy compound in this situation amplifies the problem — it does not correct it.", whatItMeans: "Running the full Foundation Gate check in order — sleep, stimulant load, chronic stress, training stimulus — is the first diagnostic step before any compound consideration." },
  r_bn04: { tag: "Bottleneck 04 — Sleep and Recovery", title: "Sleep disruption during a protocol is often a timing issue before it is a bottleneck.", body: "Sleep disruption that begins or worsens after starting or escalating a compound is worth investigating as a timing or dose variable first. GLP-1 injection timing relative to sleep can affect quality directly.", whatItMeans: "If timing adjustments have been evaluated and sleep disruption persists, the RPB covers the full sleep and recovery bottleneck protocol including which compounds the research supports and the sequence for each presentation." },
  r_bn05: { tag: "Bottleneck 05 — GI Issues", title: "GI symptoms have three distinct presentations — which one applies changes the entire approach.", body: "Nausea driven by dose timing, gut motility issues from sustained suppression, and mucosal inflammation from extended restriction all present differently and respond to different interventions. Treating all GI symptoms the same way is one of the more consistent reasons they persist.", whatItMeans: "The RPB covers all three GI presentations, the GLP-1 audit check for each, and the compounds the research supports for each specific pattern." },
  r_bn06: { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood and depleted drive are almost always downstream signals, not the root cause.", body: "Mood and motivation loss during a protocol is rarely a willpower issue. Research suggests it is almost always a downstream signal of elevated cortisol, hormonal suppression from extended restriction, or energy depletion. The compound response depends on which is the upstream driver.", whatItMeans: "For male researchers, hormonal suppression evaluation at week 12 or beyond is worth running before adding mood support compounds. The RPB covers the diagnostic sequence for identifying the correct upstream cause." },
  r_bn07: { tag: "Bottleneck 07 — Dose Escalation", title: "Results stopped when the dose kept going up — the problem is almost never the dose.", body: "Escalating dose in response to a plateau is one of the most common patterns in extended protocols. Research consistently shows it is almost never the correct response. When dose escalation produces diminishing returns, the data suggests the limiting variable is not compound level.", whatItMeans: "The RPB covers the five checks to run before any further dose change and why the plateau almost always resolves when the actual limiting variable is correctly identified." },
  r_bn07_stall: { tag: "Bottleneck 07 — Dose Escalation Pattern", title: "A stall that triggered a dose increase is the most common misread in protocol research.", body: "When a plateau leads to dose escalation and the plateau continues, the research is clear: the dose was not the limiting variable. Most plateaus at this stage are Phase 2 metabolic shifts — escalating the intake-suppression mechanism does not address an output bottleneck.", whatItMeans: "Running the five pre-escalation checks from Bottleneck 07 alongside the Phase 2 assessment is the correct sequence. The RPB walks through both in order." },
  r_phase3: { tag: "Phase 3 — Recovery Bottleneck", title: "The system is under recovery strain — output capacity is the limiting variable, not intake.", body: "When training performance declines alongside a stall, research suggests the protocol has entered Phase 3. The caloric deficit that drove fat loss in Phase 2 has become the ceiling on recovery capacity. Adding more metabolic demand at this stage typically makes both problems worse.", whatItMeans: "Phase 3 requires a different compound logic than Phase 2. The RPB covers both phases and the specific compounds the research supports at each stage." },
  r_phase4: { tag: "Phase 4 — Recovery Ceiling", title: "Significant sleep degradation alongside a stall suggests the recovery ceiling has collapsed.", body: "When sleep has significantly degraded, progress has stalled across multiple metrics, and recovery is consistently poor, research suggests this is a Phase 4 pattern. Recovery capacity is the primary limiting variable — and adding more is most likely to make things worse.", whatItMeans: "The RPB covers the Phase 4 framework and what the research supports for rebuilding recovery capacity before any further protocol additions." },
  r_gh_insulin: { tag: "GH Signaling — Insulin Window", title: "The pulse is being blunted by elevated insulin at injection time.", body: "GH secretagogues require a genuinely fasted state to produce a measurable pulse. When insulin is elevated, GH amplitude drops significantly. On an active GLP-1 protocol, gastric emptying slows — extending the fasted window to 4 to 5 hours post-meal is often the only correction needed.", whatItMeans: "This is an environment variable, not a compound selection problem. The RPB covers the fasted window logic for GH secretagogues including how GLP-1 interaction changes the required window." },
  r_gh_bedtime: { tag: "GH Secretagogue — Timing Error", title: "Bedtime injection is the most common timing mistake for Tesamorelin.", body: "Tesamorelin has a 2 to 3 hour active window — injected at bedtime, the compound signal is already fading by the time the natural GH peak arrives during deep sleep. Daytime injection creates an additive pulse, which is what drives measurable IGF-1 changes. CJC-1295 without DAC is the one exception where bedtime injection is rational.", whatItMeans: "Shifting to a daytime fasted injection is often the only change needed to restore the response. The RPB covers timing logic for every GH secretagogue." },
  r_gh_mixed: { tag: "GH Secretagogue — Consistency", title: "Inconsistent timing is producing inconsistent results — not an inconsistent compound.", body: "GH secretagogues depend on consistent environmental conditions to produce a readable result. Varying the injection window changes the insulin environment, the cortisol context, and the somatostatin brake at injection time.", whatItMeans: "Establishing a fixed daily injection window — fasted, consistent timing — and running it for 4 to 6 weeks before evaluating is the correct diagnostic approach." },
  r_gh_environment: { tag: "GH Signaling — Environment", title: "The signaling environment is suppressing the pulse before the compound can work.", body: "GH secretagogue output mirrors the quality of the environment it enters. Sleep deprivation reduces pulse frequency. Chronic stress elevates cortisol and competes with GH signaling. Research suggests most researchers who describe CJC and Ipamorelin as inconsistent were injecting into a suppressed environment.", whatItMeans: "The Foundation Gate applies here as directly as it does to GLP-1 protocols. The RPB covers the environmental inputs that govern GH pulse quality and what to stabilize before concluding the stack is not working." },
  r_repair_none: { tag: "Tissue Repair — No Response", title: "No repair response at 4 or more weeks warrants a protocol audit before changing compounds.", body: "No response after an adequate run typically points to one of three variables: reconstitution error, insufficient dose consistency, or an environmental factor suppressing the repair signal. Adding a second repair compound before diagnosing the first reliably produces an unreadable result.", whatItMeans: "The RPB Reconstitution Reference is worth auditing first — reconstitution errors are one of the most common and most overlooked sources of null results in peptide research." },
  r_repair_slow: { tag: "Tissue Repair — Slower Than Expected", title: "Repair response is present but slower than expected — the foundation is the variable.", body: "BPC-157 and TB-500 amplify the body's existing repair signaling. Poor sleep and high training load reduce the signal they have to work with. The fastest repair responses come from researchers who have stabilized sleep and moderated training load relative to recovery capacity.", whatItMeans: "The RPB covers the full tissue repair bottleneck framework and how to evaluate whether the compound combination is correctly matched to the repair presentation." },
  r_longevity_general: { tag: "Longevity Stack", title: "General longevity support — the Foundation Gate applies here as much as anywhere.", body: "Compounds like SS-31, MOTS-c, Epithalon, and NAD+ work by amplifying existing biological systems. Research suggests they produce their most meaningful results when foundational inputs are reasonably stable. Adding longevity compounds on top of poor sleep and high cortisol amplifies the stress environment, not the longevity signal.", whatItMeans: "The RPB covers the immune and longevity compound category including when each compound becomes the rational choice versus when foundational inputs need addressing first." },
  r_immune: { tag: "Immune and Recovery", title: "Immune resilience and inflammation — the correct compound depends on which pattern applies.", body: "Thymosin Alpha-1, Glutathione, and KPV each address different aspects of immune function and inflammation. The correct compound depends on whether the issue is immune suppression, systemic inflammation, gut-specific inflammation, or oxidative stress from a prolonged protocol.", whatItMeans: "The RPB covers the immune and longevity category with mechanism breakdowns, when each compound becomes relevant, and how they interact with an active GLP-1 or GH protocol." },
  r_semax: { tag: "Cognitive — Semax", title: "Baseline mental flatness points to BDNF signaling as the likely target.", body: "Semax is researched primarily for its effect on BDNF — the brain protein that drives motivation, cognitive performance, and mood regulation. Research suggests it is most relevant when mental flatness and reduced focus are present as baseline issues rather than downstream effects of cortisol or caloric restriction.", whatItMeans: "The RPB covers Semax, Selank, and DSIP in the cognitive and mood section — including when each one is the rational choice and how they interact with an active fat loss protocol." },
  r_selank: { tag: "Cognitive — Selank", title: "Elevated stress response points to cortisol as the primary variable.", body: "Selank is researched for its ability to reduce stress-driven cortisol and anxiety without sedation or dependency. Research suggests it is the more relevant cognitive compound when the primary symptom is an elevated stress response rather than cognitive flatness.", whatItMeans: "The RPB covers the full cognitive and mood framework including when Selank versus Semax versus DSIP is the defensible choice based on the symptom presentation." },
  r_cog_compound: { tag: "Cognitive — Compound Variable", title: "Cognitive change that followed a new compound is a compound variable, not a baseline issue.", body: "Mental flatness or mood shift that appears after a new compound is introduced or a dose is changed is more likely a compound interaction than a cognitive bottleneck requiring a separate addition. Adding a cognitive compound on top of an unidentified interaction rarely resolves it.", whatItMeans: "The RPB covers compound interaction logic and how to systematically isolate which variable is driving a cognitive or mood change when the timing points to a recent protocol change." },
};

const MULTI_RESULTS = {
  "energy,fatlose": { tag: "Two Active Bottlenecks", title: "Fat loss stalled and energy declining — these two are almost always connected.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The limiting variable has shifted from intake to output.", body: "After the initial intake suppression phase, fat loss transitions from appetite-driven to output-driven. The compound has done its primary job. The question is whether the body's fat mobilization capacity is keeping pace with the caloric environment." }, { tag: "Bottleneck 03 — Energy Decline", title: "Energy compression is reducing output capacity at the same time.", body: "When energy declines alongside a fat loss plateau, research suggests the caloric deficit has become too aggressive for the body to sustain output. The intake-side mechanism is working. The output side is being compressed by it." } ], interaction: "These two bottlenecks are almost always the same problem expressed in two ways. The deficit that created fat loss in Phase 1 has become the ceiling on energy output in Phase 2. Addressing one without the other produces a partial result. The RPB covers the Phase 2 compound logic for fat mobilization alongside the energy pattern identification — the sequence matters significantly." },
  "fatlose,muscle": { tag: "Two Active Bottlenecks", title: "Stalled fat loss while losing muscle — the deficit is working against itself.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization capacity is not keeping pace with the deficit.", body: "The intake suppression mechanism has reached its ceiling. The limiting variable has shifted to output — specifically whether the body can mobilize stored fat efficiently at this phase of the protocol." }, { tag: "Bottleneck 01 — Losing Muscle", title: "The caloric deficit is pulling from lean mass as well as fat.", body: "Without a counteracting anabolic signal, sustained caloric restriction breaks down muscle alongside fat. This is not a compound failure — it is the body doing exactly what restricted intake tells it to do when there is no preservation signal." } ], interaction: "This combination is one of the clearest signals that the protocol needs a support layer, not a dose escalation. The fat loss mechanism is working but the body is using muscle as a secondary fuel source. Adding lean mass support before addressing the fat mobilization bottleneck is the correct sequence — otherwise the fat mobilization compound runs on a system that is still losing muscle." },
  "energy,muscle": { tag: "Two Active Bottlenecks", title: "Low energy and muscle loss together — the deficit is running too deep.", bottlenecks: [ { tag: "Bottleneck 03 — Energy Decline", title: "Output capacity is being compressed by the caloric environment.", body: "Gradual energy decline during a sustained deficit signals that the body's output capacity is being compressed. Research suggests this has three distinct presentations — identifying which one applies changes the compound response significantly." }, { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down alongside fat.", body: "Without an adequate anabolic signal and sufficient protein, the body breaks down muscle for energy alongside fat. This is compounding the energy problem — less lean mass means a lower metabolic floor." } ], interaction: "Low energy and muscle loss in combination almost always signals the deficit is running too aggressively for the recovery system to maintain lean mass. Adding compounds without addressing the underlying deficit-to-recovery ratio tends to accelerate both problems. The RPB covers the correct sequence — lean mass support first, then energy pattern identification." },
  "energy,mood": { tag: "Two Active Bottlenecks", title: "Low energy and flat mood together — cortisol is likely the upstream driver of both.", bottlenecks: [ { tag: "Bottleneck 03 — Energy Decline", title: "Energy output is being compressed by the protocol environment.", body: "Gradual energy decline during a sustained deficit often involves cortisol elevation as one of the primary mechanisms. The body under prolonged restriction increases cortisol to mobilize energy — and that cortisol elevation becomes its own ceiling." }, { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood and depleted drive are almost always downstream cortisol signals.", body: "Mood and motivation loss during a protocol is almost always a downstream signal of elevated cortisol, hormonal suppression, or energy depletion — not a primary cognitive problem." } ], interaction: "When energy and mood decline together during an extended protocol, the research consistently points to cortisol elevation as the upstream variable driving both. Treating them as separate bottlenecks and adding separate compounds typically produces an unreadable result. The RPB covers the cortisol-driven pattern specifically and how to identify whether this is a cortisol ceiling, hormonal suppression, or pure energy depletion pattern." },
  "fatlose,mood": { tag: "Two Active Bottlenecks", title: "Stalled fat loss and flat mood — two signals the system is running at its ceiling.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The limiting variable has shifted from intake to output.", body: "Fat loss has transitioned past the appetite suppression phase. The question is whether fat mobilization capacity is keeping pace — and whether cortisol elevation from the extended deficit is part of what is limiting it." }, { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood is a downstream signal of an upstream variable.", body: "Mood flatness during an extended protocol is almost always a cortisol or hormonal suppression signal. It tends to appear when the protocol has been running long enough for cumulative restriction stress to become significant." } ], interaction: "A fat loss plateau and mood flatness appearing together is a common presentation at weeks 10 to 16 of an extended protocol. Research suggests both are often downstream effects of a cortisol ceiling that has been quietly building. Addressing the fat loss bottleneck without identifying the cortisol component tends to produce a protocol that looks correct on paper but does not respond." },
  "fatlose,sleep": { tag: "Two Active Bottlenecks", title: "Stalled fat loss and disrupted sleep — sleep may be the upstream variable for both.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization has reached a ceiling.", body: "The intake suppression mechanism has done its work. The question is whether the output side is keeping pace — and whether poor sleep quality is suppressing the metabolic output that fat mobilization depends on." }, { tag: "Bottleneck 04 — Sleep and Recovery", title: "Sleep disruption during a protocol is often a GLP-1 timing issue first.", body: "Sleep disruption that begins or worsens after starting or escalating a compound is worth investigating as a timing or dose variable before assuming it is a standalone bottleneck." } ], interaction: "Poor sleep suppresses growth hormone pulsatility, elevates cortisol, and reduces the metabolic output that fat loss at Phase 2 depends on. When these two appear together, fixing sleep is almost always the correct first move — not adding a fat mobilization compound on top of a system that cannot use it." },
  "energy,fatlose,muscle": { tag: "Three Active Bottlenecks", title: "Stalled fat loss, muscle loss, and low energy — the protocol is running beyond its recovery ceiling.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Fat mobilization capacity is not keeping pace with the deficit.", body: "The intake-side mechanism has reached its ceiling. The body needs a fat mobilization signal — but adding one without addressing the other two active bottlenecks runs it on a system that cannot process the output." }, { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down as a secondary fuel source.", body: "Without an adequate anabolic signal, the body breaks down muscle alongside fat during sustained restriction. This is lowering the metabolic floor and compounding the energy problem." }, { tag: "Bottleneck 03 — Energy Decline", title: "Output capacity is being compressed at the same time.", body: "Energy declining across all three of these patterns simultaneously signals the deficit has become more aggressive than the recovery system can manage." } ], interaction: "This three-bottleneck combination is one of the clearest indicators that the protocol has moved past what a general framework can diagnose from the outside. The interactions are compounding: muscle loss lowers the metabolic floor, which deepens energy suppression, which reduces the body's ability to mobilize fat efficiently. Adding compounds in the wrong order in this situation tends to make the picture worse before it gets better. This is the specific pattern the audit is designed to resolve." },
  "energy,fatlose,mood": { tag: "Three Active Bottlenecks", title: "Stalled fat loss, low energy, and flat mood — a cortisol ceiling is likely driving all three.", bottlenecks: [ { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Output capacity is the limiting variable.", body: "Fat loss has transitioned to output-driven. The question is whether cortisol elevation from extended restriction is part of what is suppressing fat mobilization." }, { tag: "Bottleneck 03 — Energy Decline", title: "Energy output is being compressed by the caloric environment.", body: "Gradual energy decline during a sustained deficit often involves cortisol as one of the primary mechanisms. The body under prolonged restriction increases cortisol — and that elevation becomes a ceiling." }, { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood is a downstream cortisol or hormonal suppression signal.", body: "Mood flatness during an extended protocol is almost always downstream of elevated cortisol or hormonal suppression — not a standalone problem." } ], interaction: "When all three appear together, the research consistently points to a cortisol ceiling as the variable driving the entire picture. Treating each bottleneck separately and adding three different compounds tends to produce an unreadable result. Identifying the cortisol component first is the correct diagnostic sequence before any compound decision. This is a pattern the audit is specifically structured to diagnose." },
  "mood,muscle,phase3": { tag: "Phase 3 — Multiple Active Bottlenecks", title: "Training decline, muscle loss, and mood flatness together — Phase 3 with compounding signals.", bottlenecks: [ { tag: "Phase 3 — Recovery Strain", title: "The system is under recovery strain from sustained restriction and training load.", body: "Phase 3 occurs when the caloric deficit that drove fat loss in Phase 2 becomes the ceiling on recovery capacity. Training performance declines because the body cannot recover fast enough between sessions." }, { tag: "Bottleneck 01 — Losing Muscle", title: "Lean mass is being broken down alongside the recovery strain.", body: "In Phase 3, lean mass preservation becomes critical. Without an adequate anabolic signal, the combination of caloric restriction and training load accelerates muscle breakdown." }, { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood at this stage is almost always a downstream cortisol signal.", body: "Phase 3 increases cortisol load from both the deficit and the training stimulus. Mood and drive flatness here is a physiological signal — not a willpower issue." } ], interaction: "This combination in Phase 3 is a systemic problem, not three separate bottlenecks. The recovery strain is creating the conditions for muscle loss, and the cortisol elevation from both the deficit and the training load is producing the mood suppression. Adding compounds without first adjusting the protocol structure typically makes all three worse. The RPB covers Phase 3 compound logic specifically for this presentation." },
};

function getProgress(qid) {
  if (!qid) return 0;
  if (qid.startsWith("r_") || qid.startsWith("MULTI:")) return 100;
  const map = { q_start: 5, q_glp1_duration: 15, q_glp1_early: 20, q_glp1_status: 20, q_glp1_no_start: 25, q_glp1_stall_context: 28, q_glp1_caloric: 32, q_p3_training: 28, q_p4_sleep: 28, q_gh_duration: 15, q_gh_early: 20, q_gh_results: 22, q_gh_environment: 35, q_gh_timing: 35, q_gh_sleep: 42, q_peptide_type: 15, q_peptide_repair: 25, q_peptide_repair_found: 35, q_peptide_longevity: 25, q_peptide_cog: 25, q_peptide_cog_cause: 35, q_found_sleep: 48, q_found_sleep_p3: 48, q_found_stimulant: 58, q_found_stimulant_p3: 58, q_found_protein: 68, q_found_protein_p3: 68, q_bn_main: 78, q_bn_p3: 78, q_fatlose_dose: 86, q_fatlose_duration: 92, q_energy_timing: 88 };
  return map[qid] || 50;
}

function CTABlock() {
  return (
    <div className="pt-cta-block">
      <div className="pt-cta-label">Go deeper</div>
      <p className="pt-cta-text">The Research Protocol Bible covers this in full — the diagnostic criteria, the compound logic, what not to add, and the correct sequence. 36 compounds, 7 bottlenecks, all four phases.</p>
      <a className="pt-pill" href="https://project-theo.com/products/the-research-protocol-bible" target="_blank" rel="noopener noreferrer">View the Research Protocol Bible</a>
      <a className="pt-pill-outline" href="https://project-theo.com/pages/protocol-audit" target="_blank" rel="noopener noreferrer">View Audit Options</a>
    </div>
  );
}

// ── SCREEN STATES ─────────────────────────────────────────────────────────────
// "start" → "questions" → "gate" → "result"

export default function App() {
  const [screen, setScreen] = useState("start");
  const [history, setHistory] = useState(["q_start"]);
  const [selected, setSelected] = useState([]);
  const [pendingResult, setPendingResult] = useState(null);
  const gateRef = useRef(null);

  const current = history[history.length - 1];
  const isMultiResult = current.startsWith("MULTI:");
  const isResult = current.startsWith("r_") || isMultiResult;
  const question = (!isResult && screen === "questions") ? QUESTIONS[current] : null;
  const progress = getProgress(current);

  // Load Klaviyo script once
  useEffect(() => {
    if (document.getElementById("kl-script")) return;
    const s = document.createElement("script");
    s.id = "kl-script";
    s.async = true;
    s.src = "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=TQGTkc";
    document.head.appendChild(s);
  }, []);

  // Re-init Klaviyo form when gate screen mounts
  useEffect(() => {
    if (screen !== "gate") return;
    const timer = setTimeout(() => {
      if (window._klOnsite) window._klOnsite.push(["openForm", "TQGTkc"]);
      if (window.klaviyo) window.klaviyo.push(["identify", {}]);
    }, 300);

    // Listen for submission
    const handler = (e) => {
      if (e.detail && (e.detail.type === "submit" || e.detail.type === "submitSuccess")) {
        setTimeout(() => setScreen("result"), 600);
      }
    };
    document.addEventListener("klaviyoForms", handler);

    // Also watch DOM for success state
    const observer = new MutationObserver(() => {
      const success = document.querySelector(".klaviyo-form-TQGTkc [data-testid='success-component']") ||
                      document.querySelector(".klaviyo-form-TQGTkc .klaviyo-form-success");
      if (success) setTimeout(() => setScreen("result"), 600);
    });
    if (gateRef.current) observer.observe(gateRef.current, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("klaviyoForms", handler);
      observer.disconnect();
    };
  }, [screen]);

  function routeResult(next) {
    setHistory(h => [...h, next]);
    setScreen("gate");
  }

  function handleSingle(next) {
    setSelected([]);
    const isRes = next.startsWith("r_") || next.startsWith("MULTI:");
    if (isRes) {
      routeResult(next);
    } else {
      setHistory(h => [...h, next]);
    }
  }

  function handleMultiToggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function handleMultiContinue() {
    if (selected.length === 0) return;
    const q = QUESTIONS[current];
    const next = q.multiNext(selected);
    setSelected([]);
    const isRes = next.startsWith("r_") || next.startsWith("MULTI:");
    if (isRes) {
      routeResult(next);
    } else {
      setHistory(h => [...h, next]);
    }
  }

  function handleBack() {
    if (history.length > 1) {
      setSelected([]);
      setHistory(h => h.slice(0, -1));
      if (screen === "gate") setScreen("questions");
    }
  }

  function handleRestart() {
    setSelected([]);
    setHistory(["q_start"]);
    setScreen("start");
  }

  // Resolve result data
  const resultKey = history[history.length - 1];
  const isMulti = resultKey.startsWith("MULTI:");
  const multiKey = isMulti ? resultKey.replace("MULTI:", "") : null;
  const singleResult = (!isMulti && resultKey.startsWith("r_")) ? RESULTS[resultKey] : null;
  const multiResult = multiKey ? MULTI_RESULTS[multiKey] : null;

  return (
    <>
      <style>{styles}</style>
      <div className="pt-wrap">

        {/* HEADER — always visible */}
        <div className="pt-header">
          <div className="pt-eyebrow">Free Interactive Diagnostic Tool</div>
          <h1 className="pt-title">Most researchers are treating the wrong bottleneck.</h1>
          <p className="pt-sell-line">The compound is rarely the problem. The phase, the foundation, and the limiting variable usually are.</p>
          <p className="pt-sell-sub">This tool runs the same diagnostic framework used in the Research Protocol Bible and identifies exactly where your protocol is failing — and why.</p>
          <p className="pt-spec-line">4 phases · 7 bottlenecks · 27 possible outcomes · 3 minutes</p>
          {screen === "start" && (
            <button className="pt-pill" onClick={() => setScreen("questions")}>
              Start the Diagnostic
            </button>
          )}
        </div>

        {/* PROGRESS BAR */}
        {screen !== "start" && (
          <div className="pt-progress-bar">
            <div className="pt-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* QUESTIONS */}
        {screen === "questions" && question && (
          <div className="pt-card fade-in" key={current}>
            <div className="pt-step-label">{question.stepLabel}</div>
            <h2 className="pt-question">{question.question}</h2>
            {question.note && <p className="pt-question-note">{question.note}</p>}
            {question.multiSelect ? (
              <>
                <p className="pt-multi-hint">Select all that apply</p>
                <div className="pt-multi-options">
                  {question.options.map(opt => (
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

        {/* EMAIL GATE */}
        {screen === "gate" && (
          <div className="pt-gate-screen fade-in" ref={gateRef}>
            <div className="pt-gate-eyebrow">Almost there</div>
            <h2 className="pt-gate-title">Your bottleneck has been identified.</h2>
            <p className="pt-gate-body">Enter your email to unlock your result and receive the free Protocol Stall Guide — a diagnostic framework for the most common Phase 2 fat loss plateau, built on the same system this tool uses.</p>
            <div className="pt-gate-divider" />
            <div className="pt-gate-form-label">Enter your email to unlock</div>
            <div className="klaviyo-form-TQGTkc"></div>
            <button className="pt-skip" onClick={() => setScreen("result")}>
              Skip — show my result without the guide
            </button>
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && (
          <>
            {singleResult && (
              <div className="pt-result fade-in">
                <div className="pt-result-tag">{singleResult.tag}</div>
                <h2 className="pt-result-title">{singleResult.title}</h2>
                <p className="pt-result-body">{singleResult.body}</p>
                {singleResult.whatItMeans && (
                  <div className="pt-result-what">
                    <div className="pt-result-what-label">What this means for your protocol</div>
                    <p className="pt-result-what-text">{singleResult.whatItMeans}</p>
                  </div>
                )}
                <div className="pt-divider" />
                <CTABlock />
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
                <CTABlock />
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
