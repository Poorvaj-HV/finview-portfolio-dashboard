
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AIStatusIndicatorProps {
  analyzing: boolean;
  error?: string | null;
}

export function AIStatusIndicator({ analyzing, error }: AIStatusIndicatorProps) {
  if (error) {
    return (
      <Alert variant="destructive" className="animate-fade-in my-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Analysis Failed</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
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
