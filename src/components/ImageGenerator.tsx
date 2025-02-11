
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRunware } from "@/hooks/use-runware";
import { Loader2 } from "lucide-react";
import { Model3DViewer } from "./Model3DViewer";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const { generateImage, isLoading, setApiKey, apiKey } = useRunware();
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [is3DMode, setIs3DMode] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      const result = await generateImage({
        positivePrompt: prompt,
        model: is3DMode ? "runware:101@1" : "runware:100@1", // Use 3D model when in 3D mode
      });
      setGeneratedImageUrl(result.imageURL);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">AI Generator</h1>
        <p className="text-center text-muted-foreground">
          Generate {is3DMode ? "3D models" : "images"} from text prompts
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="3d-mode"
              checked={is3DMode}
              onCheckedChange={setIs3DMode}
            />
            <Label htmlFor="3d-mode">Enable 3D Mode</Label>
          </div>
          <div className="flex gap-4">
            <Input
              placeholder={`Enter your prompt for ${is3DMode ? "3D model" : "image"}...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim() || !apiKey.trim()}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>

        {generatedImageUrl && (
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <img
                src={generatedImageUrl}
                alt="Generated"
                className="object-cover w-full h-full transition-opacity duration-300"
              />
            </div>
            <Model3DViewer imageUrl={generatedImageUrl} />
          </div>
        )}
      </Card>
    </div>
  );
};
