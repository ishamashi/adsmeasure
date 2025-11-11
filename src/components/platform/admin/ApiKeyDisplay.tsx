// src/components/platform/admin/ApiKeyDisplay.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Copy, Eye, EyeOff, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyDisplayProps {
  apiKey: string;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function ApiKeyDisplay({ apiKey, onRegenerate, isRegenerating }: ApiKeyDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);

  const maskedKey = `${apiKey.substring(0, 9)}...${apiKey.substring(apiKey.length - 4)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API Key copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-gray-100 border">
      <code className="text-sm text-gray-700 flex-grow">{isVisible ? apiKey : maskedKey}</code>
      <Button variant="ghost" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" onClick={copyToClipboard}>
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="ghost" className=" text-yellow-600" onClick={onRegenerate} disabled={isRegenerating}>
        {isRegenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
      </Button>
    </div>
  );
}
// Jangan lupa tambahkan `Loader2` ke impor `lucide-react` jika belum ada.
