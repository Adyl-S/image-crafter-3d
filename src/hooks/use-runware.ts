
import { useState } from "react";
import { RunwareService, type GenerateImageParams } from "@/services/runware";

export const useRunware = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const runwareService = new RunwareService(apiKey);

  const generateImage = async (params: GenerateImageParams) => {
    if (!apiKey) {
      throw new Error("Please enter your Runware API key");
    }
    setIsLoading(true);
    try {
      const result = await runwareService.generateImage(params);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    isLoading,
    setApiKey,
    apiKey,
  };
};
