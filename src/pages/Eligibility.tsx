import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Activity, TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import {
  getConfig,
  calculateEligibility,
  saveSubmission,
  type Submission,
} from "@/lib/eligibility-config";

type Step = "form" | "result";

const Eligibility = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [unlocked, setUnlocked] = useState(false);

  // Form state
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [goal, setGoal] = useState("weight-loss");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Result state
  const [result, setResult] = useState<{
    eligible: boolean;
    score: number;
    bmi: number;
    insights: string[];
    projection: string;
  } | null>(null);

  const config = getConfig();

  const validate = () => {
    const errs: Record<string, string> = {};
    const a = parseInt(age);
    const w = parseFloat(weight);
    const hf = parseInt(heightFt);
    const hi = parseInt(heightIn);
    if (!age || isNaN(a) || a < 1 || a > 120) errs.age = "Enter a valid age (1–120)";
    if (!weight || isNaN(w) || w < 50 || w > 800) errs.weight = "Enter a valid weight (50–800 lbs)";
    if (!heightFt || isNaN(hf) || hf < 3 || hf > 8) errs.heightFt = "Enter valid feet (3–8)";
    if (heightIn === "" || isNaN(hi) || hi < 0 || hi > 11) errs.heightIn = "Enter valid inches (0–11)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const res = calculateEligibility(
      parseInt(age),
      parseFloat(weight),
      parseInt(heightFt),
      parseInt(heightIn),
      goal,
      config
    );
    setResult(res);

    const sub: Submission = {
      id: crypto.randomUUID(),
      age: parseInt(age),
      weight: parseFloat(weight),
      heightFt: parseInt(heightFt),
      heightIn: parseInt(heightIn),
      goal,
      bmi: parseFloat(res.bmi.toFixed(1)),
      score: res.score,
      eligible: res.eligible,
      unlocked: false,
      timestamp: new Date().toISOString(),
    };
    saveSubmission(sub);
    setStep("result");
  };

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide uppercase mb-4">
              Eligibility Check
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Am I Eligible?
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Answer a few quick questions to see if you qualify for GLP-1 support.
            </p>
          </div>

          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-2xl p-6 md:p-8">
              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-foreground">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 35"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-foreground">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g. 210"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-secondary border-border"
                />
                {errors.weight && <p className="text-sm text-destructive">{errors.weight}</p>}
              </div>

              {/* Height */}
              <div className="space-y-2">
                <Label className="text-foreground">Height</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="number"
                      placeholder="Feet"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="bg-secondary border-border"
                    />
                    {errors.heightFt && <p className="text-sm text-destructive">{errors.heightFt}</p>}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Inches"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="bg-secondary border-border"
                    />
                    {errors.heightIn && <p className="text-sm text-destructive">{errors.heightIn}</p>}
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div className="space-y-3">
                <Label className="text-foreground">Goal</Label>
                <RadioGroup value={goal} onValueChange={setGoal} className="grid grid-cols-2 gap-3">
                  <label
                    htmlFor="goal-wl"
                    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                      goal === "weight-loss"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary hover:border-muted-foreground"
                    }`}
                  >
                    <RadioGroupItem value="weight-loss" id="goal-wl" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Weight Loss</div>
                      <div className="text-xs text-muted-foreground">Reduce body weight</div>
                    </div>
                  </label>
                  <label
                    htmlFor="goal-gh"
                    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                      goal === "general-health"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary hover:border-muted-foreground"
                    }`}
                  >
                    <RadioGroupItem value="general-health" id="goal-gh" />
                    <div>
                      <div className="text-sm font-medium text-foreground">General Health</div>
                      <div className="text-xs text-muted-foreground">Improve metabolic health</div>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl">
                Check Eligibility <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === "result" && result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Partial Result */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                  result.eligible
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {result.eligible ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  {result.eligible ? config.partialEligibleMessage : config.notEligibleMessage}
                </div>
                <p className="text-muted-foreground text-sm">{config.supportingText}</p>
              </div>

              {/* Gated Report Section */}
              <div className="relative rounded-2xl border border-border overflow-hidden">
                {/* Content - blurred when locked */}
                <div className={`bg-card p-6 md:p-8 space-y-6 transition-all duration-700 ${
                  !unlocked ? "blur-md select-none pointer-events-none" : ""
                }`}>
                  {/* Eligibility Score */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Activity className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">Eligibility Score</div>
                      <div className="text-3xl font-heading font-bold text-foreground">{result.score}%</div>
                    </div>
                    <div className="ml-auto">
                      <div className="h-3 w-32 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000"
                          style={{ width: unlocked ? `${result.score}%` : "0%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="space-y-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">Readiness Insights</h3>
                    {result.insights.map((insight, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-secondary-foreground">{insight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Projection */}
                  <div className="rounded-xl bg-secondary/50 border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Weight Loss Projection</span>
                    </div>
                    <p className="text-sm text-secondary-foreground">{result.projection}</p>
                  </div>

                  <div className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-sm">BMI: {result.bmi.toFixed(1)}</span>
                  </div>
                </div>

                {/* Lock Overlay */}
                {!unlocked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-sm mx-4 shadow-xl">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                        {config.gatedOverlayText}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Sign in to access your full eligibility report, personalized insights, and weight loss projection.
                      </p>
                      <div className="space-y-3">
                        <Button onClick={handleUnlock} className="w-full h-11 rounded-xl font-semibold">
                          Continue with Google
                        </Button>
                        <Button
                          onClick={handleUnlock}
                          variant="outline"
                          className="w-full h-11 rounded-xl font-semibold"
                        >
                          Sign up with email
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA after unlock */}
              {unlocked && (
                <div className="animate-fade-in-up space-y-4">
                  <Button
                    onClick={() => navigate(config.ctaLink)}
                    className="w-full h-12 text-base font-semibold rounded-xl"
                  >
                    👉 {config.ctaText}
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => { setStep("form"); setResult(null); setUnlocked(false); }}
                    className="w-full text-muted-foreground"
                  >
                    Retake Assessment
                  </Button>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-center text-muted-foreground border-t border-border pt-4">
                ⚠️ {config.disclaimer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
