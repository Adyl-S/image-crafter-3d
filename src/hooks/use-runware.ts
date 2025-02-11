
import { useState } from "react";
import { RunwareService, type GenerateImageParams } from "@/services/runware";

const runwareService = new RunwareService("YOUR_API_KEY"); // Replace with your API key

export const useRunware = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (params: GenerateImageParams) => {
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
  };
};
