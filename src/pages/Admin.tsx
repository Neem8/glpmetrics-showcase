import { useState, useEffect } from "react";
import { Trash2, Settings, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getConfig,
  saveConfig,
  getSubmissions,
  clearSubmissions,
  DEFAULT_CONFIG,
  type EligibilityConfig,
  type Submission,
} from "@/lib/eligibility-config";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<EligibilityConfig>(getConfig());
  const [submissions, setSubmissions] = useState<Submission[]>(getSubmissions());

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  const updateField = <K extends keyof EligibilityConfig>(key: K, value: EligibilityConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveConfig(config);
    toast({ title: "Settings saved", description: "Eligibility config has been updated." });
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    saveConfig(DEFAULT_CONFIG);
    toast({ title: "Settings reset", description: "Restored default configuration." });
  };

  const handleClearSubmissions = () => {
    clearSubmissions();
    setSubmissions([]);
    toast({ title: "Submissions cleared" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container flex items-center gap-4 h-14">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </a>
          <h1 className="font-heading text-lg font-bold text-foreground">Admin Panel</h1>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">GLP Metrics</span>
        </div>
      </div>

      <div className="container py-8 max-w-4xl">
        <Tabs defaultValue="config" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="config" className="gap-2">
              <Settings className="h-4 w-4" /> Configuration
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2">
              <Users className="h-4 w-4" /> Submissions ({submissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6">
            {/* Thresholds */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-heading text-lg font-semibold text-foreground">Eligibility Thresholds</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Min Age</Label>
                  <Input
                    type="number"
                    value={config.minAge}
                    onChange={(e) => updateField("minAge", parseInt(e.target.value) || 0)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Max Age</Label>
                  <Input
                    type="number"
                    value={config.maxAge}
                    onChange={(e) => updateField("maxAge", parseInt(e.target.value) || 0)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Min BMI</Label>
                  <Input
                    type="number"
                    value={config.minBMI}
                    onChange={(e) => updateField("minBMI", parseFloat(e.target.value) || 0)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Max BMI</Label>
                  <Input
                    type="number"
                    value={config.maxBMI}
                    onChange={(e) => updateField("maxBMI", parseFloat(e.target.value) || 0)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            {/* Messaging */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-heading text-lg font-semibold text-foreground">Messaging</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Eligible Message</Label>
                  <Input
                    value={config.partialEligibleMessage}
                    onChange={(e) => updateField("partialEligibleMessage", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Not Eligible Message</Label>
                  <Input
                    value={config.notEligibleMessage}
                    onChange={(e) => updateField("notEligibleMessage", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Supporting Text</Label>
                  <Input
                    value={config.supportingText}
                    onChange={(e) => updateField("supportingText", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Gated Overlay Text</Label>
                  <Input
                    value={config.gatedOverlayText}
                    onChange={(e) => updateField("gatedOverlayText", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">Disclaimer</Label>
                  <Input
                    value={config.disclaimer}
                    onChange={(e) => updateField("disclaimer", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <h2 className="font-heading text-lg font-semibold text-foreground">CTA Configuration</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">CTA Text</Label>
                  <Input
                    value={config.ctaText}
                    onChange={(e) => updateField("ctaText", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs">CTA Link</Label>
                  <Input
                    value={config.ctaLink}
                    onChange={(e) => updateField("ctaLink", e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={handleSave} className="rounded-xl font-semibold">
                Save Configuration
              </Button>
              <Button onClick={handleReset} variant="outline" className="rounded-xl">
                Reset to Defaults
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{submissions.length} total submissions</p>
              {submissions.length > 0 && (
                <Button onClick={handleClearSubmissions} variant="destructive" size="sm" className="gap-2 rounded-xl">
                  <Trash2 className="h-3 w-3" /> Clear All
                </Button>
              )}
            </div>

            {submissions.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No submissions yet</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Date</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Age</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Weight</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Height</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">BMI</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Goal</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Score</th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-medium">Eligible</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                          <td className="px-4 py-3 text-muted-foreground">
                            {new Date(sub.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-foreground">{sub.age}</td>
                          <td className="px-4 py-3 text-foreground">{sub.weight} lbs</td>
                          <td className="px-4 py-3 text-foreground">{sub.heightFt}'{sub.heightIn}"</td>
                          <td className="px-4 py-3 text-foreground">{sub.bmi}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-secondary-foreground">
                              {sub.goal}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-foreground font-medium">{sub.score}%</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              sub.eligible
                                ? "bg-primary/10 text-primary"
                                : "bg-destructive/10 text-destructive"
                            }`}>
                              {sub.eligible ? "Yes" : "No"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
