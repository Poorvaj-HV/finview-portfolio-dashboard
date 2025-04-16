
import { Loader2 } from 'lucide-react';

interface AIStatusIndicatorProps {
  analyzing: boolean;
}

export function AIStatusIndicator({ analyzing }: AIStatusIndicatorProps) {
  if (!analyzing) return null;
  
  return (
    <div className="flex items-center justify-center p-8 animate-pulse">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-eco-primary" />
        <p className="text-sm font-medium text-eco-foreground">
          Analyzing image with AI...
        </p>
      </div>
    </div>
  );
}
