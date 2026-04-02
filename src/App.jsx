import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .pt-wrap { background: #2c2e24; color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; min-height: 100vh; padding: 0 0 80px 0; }
  .pt-header { padding: 48px 24px 40px; text-align: center; border-bottom: 1px solid rgba(232,224,208,0.12); margin-bottom: 40px; }
  .pt-label { font-family: 'Jost', sans-serif; font-weight: 400; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.45); margin-bottom: 16px; }
  .pt-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(32px, 7vw, 52px); line-height: 1.1; color: #e8e0d0; margin-bottom: 16px; }
  .pt-subtitle { font-size: 14px; line-height: 1.7; color: rgba(232,224,208,0.6); max-width: 400px; margin: 0 auto; }
  .pt-progress-bar { height: 2px; background: rgba(232,224,208,0.1); margin: 0 24px 40px; border-radius: 2px; overflow: hidden; }
  .pt-progress-fill { height: 100%; background: #e8e0d0; border-radius: 2px; transition: width 0.5s ease; }
  .pt-card { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-step-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.35); margin-bottom: 12px; }
  .pt-question { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: clamp(22px, 5vw, 30px); line-height: 1.25; color: #e8e0d0; margin-bottom: 10px; }
  .pt-question-note { font-size: 13px; color: rgba(232,224,208,0.45); line-height: 1.6; margin-bottom: 32px; font-style: italic; }
  .pt-options { display: flex; flex-direction: column; gap: 10px; }
  .pt-option { background: rgba(232,224,208,0.05); border: 1px solid rgba(232,224,208,0.15); color: #e8e0d0; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.5; padding: 16px 20px; text-align: left; cursor: pointer; border-radius: 2px; transition: all 0.2s ease; width: 100%; }
  .pt-option:hover { background: rgba(232,224,208,0.1); border-color: rgba(232,224,208,0.35); }
  .pt-back { background: none; border: none; color: rgba(232,224,208,0.35); font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 1px; cursor: pointer; padding: 0; margin-top: 28px; display: block; transition: color 0.2s; }
  .pt-back:hover { color: rgba(232,224,208,0.7); }
  .pt-divider { height: 1px; background: rgba(232,224,208,0.08); margin: 32px 0; }
  .pt-result { max-width: 520px; margin: 0 auto; padding: 0 24px; }
  .pt-result-tag { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.35); margin-bottom: 12px; }
  .pt-result-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(26px, 5.5vw, 40px); line-height: 1.15; color: #e8e0d0; margin-bottom: 20px; }
  .pt-result-body { font-size: 14px; line-height: 1.8; color: rgba(232,224,208,0.7); margin-bottom: 16px; }
  .pt-result-what { border-left: 2px solid rgba(232,224,208,0.2); padding-left: 16px; margin: 28px 0; }
  .pt-result-what-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.35); margin-bottom: 8px; }
  .pt-result-what-text { font-size: 14px; line-height: 1.75; color: rgba(232,224,208,0.6); font-style: italic; }
  .pt-cta-block { background: rgba(232,224,208,0.05); border: 1px solid rgba(232,224,208,0.12); padding: 24px; margin-top: 36px; }
  .pt-cta-label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(232,224,208,0.35); margin-bottom: 10px; }
  .pt-cta-text { font-size: 14px; line-height: 1.7; color: rgba(232,224,208,0.6); margin-bottom: 20px; }
  .pt-cta-btn { display: block; background: #e8e0d0; color: #2c2e24; font-family: 'Jost', sans-serif; font-weight: 400; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; padding: 14px 28px; text-decoration: none; cursor: pointer; border: none; width: 100%; text-align: center; transition: opacity 0.2s; }
  .pt-cta-btn:hover { opacity: 0.85; }
  .pt-cta-secondary { display: block; text-align: center; margin-top: 14px; font-size: 12px; color: rgba(232,224,208,0.35); letter-spacing: 1px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; background: none; border: none; width: 100%; font-family: 'Jost', sans-serif; transition: color 0.2s; }
  .pt-cta-secondary:hover { color: rgba(232,224,208,0.6); }
  .pt-restart { display: block; text-align: center; margin-top: 40px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: rgba(232,224,208,0.25); cursor: pointer; background: none; border: none; font-family: 'Jost', sans-serif; transition: color 0.2s; }
  .pt-restart:hover { color: rgba(232,224,208,0.5); }
  .pt-disclaimer { text-align: center; font-size: 10px; color: rgba(232,224,208,0.2); letter-spacing: 1px; margin-top: 48px; line-height: 1.7; padding: 0 24px; }
  .fade-in { animation: fadeIn 0.35s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
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

  // GLP-1 PATH
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
    note: "A GLP-1 compound that is not suppressing intake is either under-dosed, still titrating, or there is a reconstitution or administration variable worth ruling out.",
    options: [
      { label: "Yes, hunger is down but the scale is not moving", next: "q_glp1_caloric" },
      { label: "No — appetite feels completely unchanged", next: "r_no_intake" },
    ],
  },
  q_glp1_stall_context: {
    stepLabel: "Step 1 — Phase Identification",
    question: "When results stalled, what else was happening?",
    note: "Phase 2 and Phase 3 often overlap. The distinction matters before anything is added.",
    options: [
      { label: "Energy started declining too", next: "q_glp1_caloric" },
      { label: "Training performance dropped noticeably", next: "q_p3_training" },
      { label: "Sleep degraded — poor quality or waking", next: "q_p4_sleep" },
      { label: "Nothing else changed — just results stopped", next: "q_glp1_caloric" },
    ],
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
    note: "Less output at the same or lower load is a meaningful signal the system is under recovery strain.",
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
      { label: "Significantly — poor quality most nights", next: "r_phase4" },
      { label: "Somewhat — worse than before the protocol", next: "q_found_sleep" },
      { label: "About the same as before", next: "q_found_sleep" },
    ],
  },

  // GH PATH
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
    note: "GH secretagogues require a fasted state to produce a clean pulse. Elevated insulin blunts GH amplitude. On a GLP-1 protocol, gastric emptying slows — a standard 2 to 3 hour window may not be enough.",
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
    note: "GH pulses are partly governed by slow-wave sleep depth. Fragmented or shallow sleep reduces pulse frequency regardless of compound.",
    options: [
      { label: "Good — consistent and restorative most nights", next: "q_found_sleep" },
      { label: "Inconsistent — some nights poor", next: "r_gh_environment" },
      { label: "Consistently poor — shallow, fragmented, not restorative", next: "r_gh_environment" },
    ],
  },

  // PEPTIDE-ONLY PATH
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
    note: "Repair compounds amplify the body's existing repair signaling. Poor sleep and excessive training load reduce the signal they have to work with.",
    options: [
      { label: "Yes — both are reasonably managed", next: "r_repair_slow" },
      { label: "No — sleep is poor or training load is high relative to recovery", next: "r_foundation_sleep" },
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

  // SHARED FOUNDATION GATE
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
    note: "With training or recovery declining, sleep is the first variable to rule out before looking at compound response.",
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

  // BOTTLENECK ROUTING
  q_bn_main: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "What is the primary symptom driving your concern right now?",
    note: "Select the most prominent one. If multiple apply, choose the one that appeared first or is most disruptive.",
    options: [
      { label: "Fat loss or body composition has stalled or slowed", next: "q_fatlose_dose" },
      { label: "Losing weight but also losing visible muscle", next: "r_bn01" },
      { label: "Energy is low — not functional without stimulants", next: "q_energy_timing" },
      { label: "Sleep is disturbed — waking, shallow, not restorative", next: "r_bn04" },
      { label: "GI symptoms — nausea, bloating, discomfort", next: "r_bn05" },
      { label: "Mood flat, motivation gone, drive depleted", next: "r_bn06" },
      { label: "Dose escalated and nothing is working anymore", next: "r_bn07" },
    ],
  },
  q_bn_p3: {
    stepLabel: "Step 3 — Bottleneck Identification",
    question: "Alongside the training decline, what else is most prominent?",
    note: null,
    options: [
      { label: "General fatigue even on rest days — not recovering", next: "r_phase3" },
      { label: "Muscle is visibly decreasing", next: "r_bn01" },
      { label: "Mood and drive significantly affected", next: "r_bn06" },
      { label: "Primarily just the training performance decline", next: "r_phase3" },
    ],
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
  r_phase1_early: { tag: "Phase Identification", title: "You are still in the titration window.", body: "The first 4 weeks on a GLP-1 compound are a dose escalation and adjustment phase. Research suggests that meaningful results typically appear after the effective dose range is reached and the body has adapted to the intake shift. Evaluating the compound before that window closes tends to produce a misleading read.", whatItMeans: "The most common mistake at this stage is escalating the dose because nothing is visible yet. The data suggests patience is a more defensible response than escalation during weeks one through six.", ctaType: "rpb" },
  r_no_intake: { tag: "Dose and Titration", title: "Intake is not yet suppressed — this is a titration variable, not a bottleneck.", body: "If hunger and food intake have not changed after several weeks, the compound is either under-dosed, still titrating, or there is a reconstitution or administration variable worth ruling out. Research on GLP-1 compounds shows intake suppression as the primary mechanism. If that is absent, the downstream fat loss effect has no mechanism to work through.", whatItMeans: "This is not a stacking question. It is a titration question. Adding support compounds on top of an ineffective foundation dose does not resolve the underlying issue.", ctaType: "rpb" },
  r_caloric_audit: { tag: "Foundation Check", title: "The caloric picture needs to be established before the protocol can be evaluated.", body: "Metabolic rate adapts during extended GLP-1 protocols. What was a real deficit at week 4 may produce a much smaller deficit by week 12 — not because the compound stopped working, but because the body adjusted. Research consistently shows that most plateaus at this stage resolve or become diagnosable once intake is tracked precisely for 7 days.", whatItMeans: "Running a 7-day tracked intake period before making any protocol change is the first step the RPB framework recommends at Phase 2. It is the check that most often identifies the actual problem faster than anything else.", ctaType: "rpb" },
  r_foundation_sleep: { tag: "Foundation Gate — Sleep", title: "Sleep is the first intervention, not a compound addition.", body: "Sleep deprivation suppresses growth hormone pulsatility, elevates cortisol, and disrupts the metabolic signaling that compounds are designed to work within. Adding a compound on top of chronic sleep deprivation produces a fraction of the documented effect because the environment is actively working against it. Research suggests this is one of the most consistent variables explaining why protocols stall.", whatItMeans: "Before anything else, check whether GLP-1 injection timing or a recent dose escalation is contributing to the sleep disruption. A timing adjustment frequently resolves the problem without any compound addition.", ctaType: "rpb" },
  r_foundation_stimulant: { tag: "Foundation Gate — Stimulant Load", title: "Daily stimulant use is contaminating the protocol read.", body: "Using stimulants daily to reach baseline energy elevates cortisol and creates ongoing oxidative stress. This sets a physiological ceiling on what any metabolic compound can accomplish. Research suggests this is one of the most underreported variables in protocol failure — the researcher escalates compounds while the stimulant load keeps suppressing the conditions those compounds need to work.", whatItMeans: "The experiment cannot produce a clean result while this input is active. Reducing stimulant frequency alongside sleep correction is the first rational move — not a compound addition.", ctaType: "rpb" },
  r_foundation_protein: { tag: "Foundation Gate — Protein", title: "Protein intake has dropped with appetite — and lean mass is paying for it.", body: "GLP-1 compounds suppress appetite broadly, which often pulls protein intake down alongside caloric intake. If total protein has dropped below roughly 0.7g per pound of lean body mass, lean mass preservation becomes the primary issue. Research suggests this is the single most common foundation variable that goes unaddressed in extended protocols.", whatItMeans: "Correcting protein intake before adding a lean mass support compound produces a cleaner result. Adding it on top of inadequate protein does not solve the upstream problem.", ctaType: "rpb" },
  r_bn01: { tag: "Bottleneck 01 — Losing Muscle", title: "The limiting variable is lean mass — the body is breaking down muscle alongside fat.", body: "When running a significant caloric deficit, the body breaks down muscle tissue for energy — especially when protein intake is low or the training stimulus is not strong enough to send a preservation signal. This is not a failure of the compound. It is the body doing exactly what sustained caloric restriction tells it to do when there is no counteracting anabolic signal.", whatItMeans: "The RPB covers the complete lean mass bottleneck protocol — which GH secretagogue combinations the research supports, what to check on the GLP-1 side before adding anything, and the correct sequence for introducing lean mass support.", ctaType: "rpb" },
  r_bn02_early: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "The stall is recent — a GLP-1 audit should run before any protocol change.", body: "A stall under 3 weeks is within normal variation for most protocols. Research suggests that before interpreting a short plateau as a bottleneck, it is worth running three checks: precise caloric tracking for 7 days, dose and timing review, and compound-specific stall pattern assessment. Most short stalls resolve with one of these variables.", whatItMeans: "The RPB walks through all three checks and the compound-specific stall patterns for semaglutide, tirzepatide, and retatrutide in the Phase 2 section.", ctaType: "rpb" },
  r_bn02: { tag: "Bottleneck 02 — Fat Loss Stalled", title: "Phase 2 fat loss bottleneck — the limiting variable has shifted from intake to output.", body: "After the initial intake suppression phase, fat loss transitions from appetite-driven to output-driven. The compound has done its primary job. The question becomes whether the body's fat mobilization capacity is keeping pace with the caloric environment. Research suggests this is the most common plateau presentation in extended GLP-1 protocols.", whatItMeans: "The RPB covers the full Phase 2 protocol — which fat mobilization compounds the research supports at this stage, what not to add, and how to sequence the response correctly.", ctaType: "rpb" },
  r_bn02_extended: { tag: "Bottleneck 02 — Extended Stall", title: "An extended stall may involve overlapping bottlenecks.", body: "A plateau lasting more than 6 weeks that has not responded to standard Phase 2 interventions often involves more than one active bottleneck — or a phase read that looked accurate but had a second variable running underneath it. Research suggests this is the pattern most likely to require a personalized read rather than a general framework response.", whatItMeans: "The RPB gives you the framework for identifying where the overlap is. If Phase 2 interventions have already been run correctly and the stall persists, that is specifically what the audit is designed for.", ctaType: "both" },
  r_bn03_dose: { tag: "Bottleneck 03 — Energy (Dose Variable)", title: "Energy dropped after a dose increase — this is a GLP-1 variable, not a compound gap.", body: "When energy drops shortly after a dose escalation, research suggests the dose itself is creating a deficit too aggressive for the body to sustain output. Higher doses suppress appetite more aggressively, which often pulls energy intake down faster than metabolic rate adapts. The result looks like an energy bottleneck but is actually a dose or timing issue.", whatItMeans: "Evaluating whether a dose reduction or timing adjustment resolves the energy drop before adding any support compound is the rational first move. Adding energy compounds on top of a dose problem does not fix the root cause.", ctaType: "rpb" },
  r_bn03: { tag: "Bottleneck 03 — Energy (Gradual Decline)", title: "Gradual energy decline points to a systemic output issue, not a single dose event.", body: "Energy that declines gradually over weeks during a sustained deficit typically signals that the body's output capacity is being compressed by the caloric environment. Research suggests this pattern has three distinct presentations that each map to a different compound response. Identifying which one applies before choosing anything significantly changes the rational approach.", whatItMeans: "The RPB covers all three energy bottleneck presentations and the compound logic for each. Getting the presentation right matters more than the compound choice itself.", ctaType: "rpb" },
  r_bn03_baseline: { tag: "Foundation Gate — Baseline Energy", title: "Low energy from the start is almost always a foundation variable, not a compound gap.", body: "When energy has been low since protocol initiation, research consistently points to foundational inputs rather than a compound bottleneck. The most common variables are sleep quality, stimulant load, and whether the protocol started on top of an already-compromised baseline. Adding an energy compound in this situation amplifies the problem — it does not correct it.", whatItMeans: "Running the full Foundation Gate check in order — sleep, stimulant load, chronic stress, training stimulus — is the first diagnostic step before any compound consideration.", ctaType: "rpb" },
  r_bn04: { tag: "Bottleneck 04 — Sleep and Recovery", title: "Sleep disruption during a protocol is often a timing issue before it is a bottleneck.", body: "Sleep disruption that begins or worsens after starting or escalating a compound is worth investigating as a timing or dose variable first. GLP-1 injection timing relative to sleep can affect quality directly. Research suggests checking injection timing and recent dose changes before assuming a compound addition is the appropriate response.", whatItMeans: "If timing adjustments have been evaluated and sleep disruption persists, the RPB covers the full sleep and recovery bottleneck protocol including which compounds the research supports and the sequence for each presentation.", ctaType: "rpb" },
  r_bn05: { tag: "Bottleneck 05 — GI Issues", title: "GI symptoms have three distinct presentations — which one applies changes the entire approach.", body: "GI symptoms during peptide protocols are common but not uniform. Nausea driven by dose timing, gut motility issues from sustained suppression, and mucosal inflammation from extended restriction all present differently and respond to different interventions. Treating all GI symptoms the same way is one of the more consistent reasons they persist.", whatItMeans: "The RPB covers all three GI presentations, the GLP-1 audit check that applies to each, and the compounds the research supports for each specific pattern.", ctaType: "rpb" },
  r_bn06: { tag: "Bottleneck 06 — Mood and Motivation", title: "Flat mood and depleted drive are almost always downstream signals, not the root cause.", body: "Mood and motivation loss during a protocol is rarely a willpower issue. Research suggests it is almost always a downstream signal of elevated cortisol, hormonal suppression from extended restriction, or energy depletion. The compound response depends on which is the upstream driver — and adding the wrong one makes it worse.", whatItMeans: "For male researchers, hormonal suppression evaluation at week 12 or beyond is worth running before adding mood support compounds. The RPB covers the diagnostic sequence for identifying the correct upstream cause.", ctaType: "rpb" },
  r_bn07: { tag: "Bottleneck 07 — Dose Escalation", title: "Results stopped when the dose kept going up — the problem is almost never the dose.", body: "Escalating dose in response to a plateau is one of the most common patterns in extended protocols. Research consistently shows it is almost never the correct response. When dose escalation produces diminishing returns, the data suggests the limiting variable is not compound level. It is something the higher dose cannot address.", whatItMeans: "The RPB covers the five checks to run before any further dose change, what each check is looking for, and why the plateau almost always resolves when the actual limiting variable is correctly identified.", ctaType: "both" },
  r_bn07_stall: { tag: "Bottleneck 07 — Dose Escalation Pattern", title: "A stall that triggered a dose increase is the most common misread in protocol research.", body: "When a plateau leads to dose escalation and the plateau continues, the research is clear: the dose was not the limiting variable. Most plateaus at this stage are Phase 2 metabolic shifts — the compound has suppressed intake effectively, but the output side has not kept pace. Escalating the intake-suppression mechanism does not address an output bottleneck.", whatItMeans: "Running the five pre-escalation checks from Bottleneck 07 alongside the Phase 2 assessment is the correct sequence. The RPB walks through both in order.", ctaType: "both" },
  r_phase3: { tag: "Phase 3 — Recovery Bottleneck", title: "The system is under recovery strain — output capacity is the limiting variable, not intake.", body: "When training performance declines alongside a stall, research suggests the protocol has entered Phase 3 — the body is under load from sustained restriction and training combined. The caloric deficit that drove fat loss in Phase 2 has become the ceiling on recovery capacity. Adding more metabolic demand at this stage typically makes both problems worse.", whatItMeans: "Phase 3 requires a different compound logic than Phase 2. The RPB covers both phases in detail and the specific compounds the research supports at each stage — including when the correct answer is a protocol adjustment rather than a compound addition.", ctaType: "rpb" },
  r_phase4: { tag: "Phase 4 — Recovery Ceiling", title: "Significant sleep degradation alongside a stall suggests the recovery ceiling has collapsed.", body: "When sleep has significantly degraded, progress has stalled across multiple metrics, and recovery is consistently poor, research suggests this is a Phase 4 pattern — recovery capacity is the primary limiting variable. This is a different problem than a Phase 2 fat loss plateau and responds to a completely different protocol logic.", whatItMeans: "Phase 4 is the phase where adding more is most likely to make things worse. The RPB covers the Phase 4 framework and what the research supports for rebuilding recovery capacity before any further additions.", ctaType: "both" },
  r_gh_insulin: { tag: "GH Signaling — Insulin Window", title: "The pulse is being blunted by elevated insulin at injection time.", body: "GH secretagogues require a genuinely fasted state to produce a measurable pulse. When insulin is elevated, GH amplitude drops significantly — the signal rises but it is weak. On an active GLP-1 protocol, gastric emptying slows, so a standard 2 to 3 hour window may not be enough. Research suggests extending to 4 to 5 hours post-meal is often the correction that restores a clean pulse without any compound change.", whatItMeans: "This is an environment variable, not a compound selection problem. The RPB covers the fasted window logic for GH secretagogues including how GLP-1 interaction changes the required window.", ctaType: "rpb" },
  r_gh_bedtime: { tag: "GH Secretagogue — Timing Error", title: "Bedtime injection is the most common timing mistake for Tesamorelin.", body: "Most researchers inject at bedtime because sleep is when GH is released. The logic is backwards for Tesamorelin. Its 2 to 3 hour active window means the compound signal is already fading by the time the natural GH peak arrives during deep sleep. Daytime injection creates an additive pulse — which is what drives measurable IGF-1 changes. CJC-1295 without DAC is the one exception where bedtime injection is rational.", whatItMeans: "Shifting to a daytime fasted injection is often the only change needed to restore the response. The RPB covers timing logic for every GH secretagogue in the protocol.", ctaType: "rpb" },
  r_gh_mixed: { tag: "GH Secretagogue — Consistency", title: "Inconsistent timing is producing inconsistent results — not an inconsistent compound.", body: "GH secretagogues depend on consistent environmental conditions to produce a readable result. Varying the injection window changes the insulin environment, the cortisol context, and the somatostatin brake at injection time. Research suggests that inconsistent results from a GH stack are most commonly a consistency variable, not a compound selection problem.", whatItMeans: "Establishing a fixed daily injection window — fasted, consistent timing — and running it for 4 to 6 weeks before evaluating is the correct diagnostic approach.", ctaType: "rpb" },
  r_gh_environment: { tag: "GH Signaling — Environment", title: "The signaling environment is suppressing the pulse before the compound can work.", body: "GH secretagogue output mirrors the quality of the environment it enters. Sleep deprivation reduces pulse frequency. Chronic stress elevates cortisol and competes with GH signaling. Fragmented sleep means the natural deep-sleep GH peak is compromised before any compound interaction. Research suggests most researchers who describe CJC and Ipamorelin as inconsistent were injecting into a suppressed environment — not running a failing compound.", whatItMeans: "The Foundation Gate applies here as directly as it does to GLP-1 protocols. The RPB covers the environmental inputs that govern GH pulse quality and what to stabilize before concluding the stack is not working.", ctaType: "rpb" },
  r_repair_none: { tag: "Tissue Repair — No Response", title: "No repair response at 4 or more weeks warrants a protocol audit before changing compounds.", body: "BPC-157 and TB-500 are among the most consistently documented repair compounds in the research space. No response after an adequate run typically points to one of three variables: reconstitution error, insufficient dose consistency, or an environmental factor suppressing the repair signal. Adding a second repair compound before diagnosing the first reliably produces an unreadable result.", whatItMeans: "The RPB Reconstitution Reference is worth auditing first — reconstitution errors are one of the most common and most overlooked sources of null results in peptide research.", ctaType: "rpb" },
  r_repair_slow: { tag: "Tissue Repair — Slower Than Expected", title: "Repair response is present but slower than expected — the foundation is the variable.", body: "BPC-157 and TB-500 amplify the body's existing repair signaling. Poor sleep and high training load reduce the signal they have to work with. Research suggests the fastest repair responses come from researchers who have stabilized sleep and moderated training load relative to recovery capacity — not from those who have added the most compounds.", whatItMeans: "The RPB covers the full tissue repair bottleneck framework and how to evaluate whether the compound combination is correctly matched to the repair presentation.", ctaType: "rpb" },
  r_longevity_general: { tag: "Longevity Stack", title: "General longevity support — the Foundation Gate applies here as much as anywhere.", body: "Compounds like SS-31, MOTS-c, Epithalon, and NAD+ work by amplifying existing biological systems. Research suggests they produce their most meaningful results when foundational inputs — sleep, stimulant load, chronic stress, training stimulus — are reasonably stable. Adding longevity compounds on top of poor sleep and high cortisol amplifies the stress environment, not the longevity signal.", whatItMeans: "The RPB covers the immune and longevity compound category including when each compound becomes the rational choice versus when foundational inputs need addressing first.", ctaType: "rpb" },
  r_immune: { tag: "Immune and Recovery", title: "Immune resilience and inflammation — the correct compound depends on which pattern applies.", body: "Thymosin Alpha-1, Glutathione, and KPV each address different aspects of immune function and inflammation. The correct compound depends on whether the issue is immune suppression, systemic inflammation, gut-specific inflammation, or oxidative stress from a prolonged protocol. Research suggests combining them without identifying the primary driver tends to produce an unreadable result.", whatItMeans: "The RPB covers the immune and longevity category with mechanism breakdowns, when each compound becomes relevant, and how they interact with an active GLP-1 or GH protocol.", ctaType: "rpb" },
  r_semax: { tag: "Cognitive — Semax", title: "Baseline mental flatness points to BDNF signaling as the likely target.", body: "Semax is researched primarily for its effect on BDNF — the brain protein that drives motivation, cognitive performance, and mood regulation. Research suggests it is most relevant when mental flatness and reduced focus are present as baseline issues rather than as downstream effects of cortisol or caloric restriction. The distinction matters because the compound response for protocol-driven mood suppression is different from baseline cognitive support.", whatItMeans: "The RPB covers Semax, Selank, and DSIP in the cognitive and mood section — including when each one is the rational choice and how they interact with an active fat loss protocol.", ctaType: "rpb" },
  r_selank: { tag: "Cognitive — Selank", title: "Elevated stress response points to cortisol as the primary variable.", body: "Selank is researched for its ability to reduce stress-driven cortisol and anxiety without sedation or dependency. Research suggests it is the more relevant cognitive compound when the primary symptom is an elevated stress response rather than cognitive flatness. The distinction between cortisol-driven anxiety and BDNF-driven flatness changes which compound is appropriate.", whatItMeans: "The RPB covers the full cognitive and mood framework including when Selank versus Semax versus DSIP is the defensible choice based on the symptom presentation.", ctaType: "rpb" },
  r_cog_compound: { tag: "Cognitive — Compound Variable", title: "Cognitive change that followed a new compound is a compound variable, not a baseline issue.", body: "Mental flatness or mood shift that appears after a new compound is introduced or a dose is changed is more likely a compound interaction than a cognitive bottleneck requiring a separate addition. Research suggests adding a cognitive compound on top of an unidentified compound interaction rarely resolves it and typically makes the picture harder to read.", whatItMeans: "The RPB covers compound interaction logic and how to systematically isolate which variable is driving a cognitive or mood change when the timing points to a recent protocol change.", ctaType: "rpb" },
};

function getProgress(qid) {
  if (!qid) return 0;
  if (qid.startsWith("r_")) return 100;
  const map = { q_start: 5, q_glp1_duration: 15, q_glp1_early: 20, q_glp1_status: 20, q_glp1_no_start: 25, q_glp1_stall_context: 28, q_glp1_caloric: 32, q_p3_training: 28, q_p4_sleep: 28, q_gh_duration: 15, q_gh_early: 20, q_gh_results: 22, q_gh_environment: 35, q_gh_timing: 35, q_gh_sleep: 42, q_peptide_type: 15, q_peptide_repair: 25, q_peptide_repair_found: 35, q_peptide_longevity: 25, q_peptide_cog: 25, q_peptide_cog_cause: 35, q_found_sleep: 48, q_found_sleep_p3: 48, q_found_stimulant: 58, q_found_stimulant_p3: 58, q_found_protein: 68, q_found_protein_p3: 68, q_bn_main: 78, q_bn_p3: 78, q_fatlose_dose: 86, q_fatlose_duration: 92, q_energy_timing: 88 };
  return map[qid] || 50;
}

export default function App() {
  const [history, setHistory] = useState(["q_start"]);
  const current = history[history.length - 1];
  const isResult = current.startsWith("r_");
  const result = isResult ? RESULTS[current] : null;
  const question = isResult ? null : QUESTIONS[current];
  const progress = getProgress(current);

  return (
    <>
      <style>{styles}</style>
      <div className="pt-wrap">
        <div className="pt-header">
          <div className="pt-label">Project Theo — Free Diagnostic Tool</div>
          <h1 className="pt-title">Protocol Bottleneck<br />Identifier</h1>
          <p className="pt-subtitle">Answer honestly. The framework identifies where your protocol is actually failing — not just what is most visible.</p>
        </div>
        <div className="pt-progress-bar">
          <div className="pt-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        {!isResult && question && (
          <div className="pt-card fade-in" key={current}>
            <div className="pt-step-label">{question.stepLabel}</div>
            <h2 className="pt-question">{question.question}</h2>
            {question.note && <p className="pt-question-note">{question.note}</p>}
            <div className="pt-options">
              {question.options.map((opt, i) => (
                <button key={i} className="pt-option" onClick={() => setHistory([...history, opt.next])}>{opt.label}</button>
              ))}
            </div>
            {history.length > 1 && (
              <button className="pt-back" onClick={() => setHistory(history.slice(0, -1))}>← Go back</button>
            )}
          </div>
        )}
        {isResult && result && (
          <div className="pt-result fade-in" key={current}>
            <div className="pt-result-tag">{result.tag}</div>
            <h2 className="pt-result-title">{result.title}</h2>
            <p className="pt-result-body">{result.body}</p>
            {result.whatItMeans && (
              <div className="pt-result-what">
                <div className="pt-result-what-label">What this means for your protocol</div>
                <p className="pt-result-what-text">{result.whatItMeans}</p>
              </div>
            )}
            <div className="pt-divider" />
            <div className="pt-cta-block">
              <div className="pt-cta-label">Go deeper</div>
              <p className="pt-cta-text">The Research Protocol Bible covers this in full — the diagnostic criteria, the compound logic, what not to add, and the correct sequence. 36 compounds, 7 bottlenecks, all four phases.</p>
              <a className="pt-cta-btn" href="https://project-theo.com/products/the-research-protocol-bible" target="_blank" rel="noopener noreferrer">View the Research Protocol Bible</a>
              {result.ctaType === "both" && (
                <a className="pt-cta-secondary" href="https://project-theo.com/pages/protocol-audit" target="_blank" rel="noopener noreferrer">Or explore the Protocol Audit for a personalized read</a>
              )}
            </div>
            <button className="pt-restart" onClick={() => setHistory(["q_start"])}>Start over</button>
          </div>
        )}
        <p className="pt-disclaimer">For educational and research purposes only. Not medical advice.<br />Not for human use guidance. Consult a qualified medical professional<br />before beginning any research protocol.</p>
      </div>
    </>
  );
}