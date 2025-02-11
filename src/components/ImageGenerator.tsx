
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRunware } from "@/hooks/use-runware";
import { Loader2 } from "lucide-react";
import { Model3DViewer } from "./Model3DViewer";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const { generateImage, isLoading } = useRunware();
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      const result = await generateImage({
        positivePrompt: prompt,
      });
      setGeneratedImageUrl(result.imageURL);
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">Image Generator</h1>
        <p className="text-center text-muted-foreground">
          Enter a text prompt to generate an image
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
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
