// Default config - admin can override via /admin, stored in localStorage
export interface EligibilityConfig {
  minAge: number;
  maxAge: number;
  minBMI: number;
  maxBMI: number;
  eligibleGoals: string[];
  partialEligibleMessage: string;
  notEligibleMessage: string;
  supportingText: string;
  gatedOverlayText: string;
  ctaText: string;
  ctaLink: string;
  disclaimer: string;
}

export const DEFAULT_CONFIG: EligibilityConfig = {
  minAge: 18,
  maxAge: 75,
  minBMI: 27,
  maxBMI: 60,
  eligibleGoals: ["weight-loss", "general-health"],
  partialEligibleMessage: "You may be eligible for GLP-1 support",
  notEligibleMessage: "You may not be fully eligible yet",
  supportingText: "Based on your inputs, we've generated a personalized report.",
  gatedOverlayText: "Unlock your full personalized report",
  ctaText: "View GLP-1 Providers",
  ctaLink: "/glp",
  disclaimer: "This is not medical advice. Consult a licensed healthcare provider.",
};

const STORAGE_KEY = "glpmetrics_eligibility_config";
const SUBMISSIONS_KEY = "glpmetrics_submissions";

export function getConfig(): EligibilityConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveConfig(config: EligibilityConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export interface Submission {
  id: string;
  age: number;
  weight: number;
  heightFt: number;
  heightIn: number;
  goal: string;
  bmi: number;
  score: number;
  eligible: boolean;
  unlocked: boolean;
  timestamp: string;
}

export function getSubmissions(): Submission[] {
  try {
    const stored = localStorage.getItem(SUBMISSIONS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function saveSubmission(sub: Submission): void {
  const all = getSubmissions();
  all.unshift(sub);
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(all.slice(0, 200)));
}

export function clearSubmissions(): void {
  localStorage.removeItem(SUBMISSIONS_KEY);
}

export function calculateBMI(weightLbs: number, heightFt: number, heightIn: number): number {
  const totalInches = heightFt * 12 + heightIn;
  if (totalInches <= 0) return 0;
  return (weightLbs / (totalInches * totalInches)) * 703;
}

export function calculateEligibility(
  age: number,
  weightLbs: number,
  heightFt: number,
  heightIn: number,
  goal: string,
  config: EligibilityConfig
): { eligible: boolean; score: number; bmi: number; insights: string[]; projection: string } {
  const bmi = calculateBMI(weightLbs, heightFt, heightIn);
  let score = 0;

  // Age scoring (max 25)
  if (age >= config.minAge && age <= config.maxAge) {
    score += 25;
    if (age >= 30 && age <= 60) score += 5;
  }

  // BMI scoring (max 40)
  if (bmi >= config.minBMI) {
    score += 30;
    if (bmi >= 30) score += 10;
  } else if (bmi >= 25) {
    score += 15;
  }

  // Goal scoring (max 20)
  if (config.eligibleGoals.includes(goal)) {
    score += 20;
  }

  // Baseline (everyone gets some)
  score += 5;

  score = Math.min(score, 100);

  const eligible = score >= 50;

  const insights: string[] = [];
  if (bmi >= 30) insights.push("Your BMI suggests you could benefit significantly from GLP-1 therapy.");
  else if (bmi >= 27) insights.push("Your BMI is in a range where GLP-1 support may be beneficial.");
  else insights.push("Your BMI is below typical thresholds, but other factors may qualify you.");

  if (age >= 30 && age <= 60) insights.push("Your age range shows strong response rates to GLP-1 treatments.");
  if (goal === "weight-loss") insights.push("Weight loss goals align well with GLP-1 treatment protocols.");
  if (goal === "general-health") insights.push("GLP-1 therapies can support overall metabolic health improvements.");

  const potentialLoss = Math.round(weightLbs * (bmi >= 30 ? 0.15 : 0.10));
  const projection = `Based on your profile, you could potentially lose ${potentialLoss}–${potentialLoss + Math.round(potentialLoss * 0.3)} lbs over 12 months with GLP-1 support.`;

  return { eligible, score, bmi, insights, projection };
}
