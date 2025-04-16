
import { BarChart, Info, Leaf, Recycle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface WastePrediction {
  type: string;
  confidence: number;
  recyclable: boolean;
}

interface EnvironmentalImpact {
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
}

export interface WasteResult {
  wasteType: string;
  predictions: WastePrediction[];
  disposalTips: string[];
  environmentalImpact: EnvironmentalImpact;
}

export interface WasteResultsProps {
  wasteType: string; // Simple string for basic implementation
}

export function WasteResults({ wasteType }: WasteResultsProps) {
  // Generate mock data based on wasteType
  const mockResult: WasteResult = {
    wasteType: wasteType,
    predictions: [
      { type: wasteType, confidence: 0.85, recyclable: wasteType === "Recyclable" },
      { type: wasteType === "Recyclable" ? "Compostable" : "Recyclable", confidence: 0.12, recyclable: wasteType !== "Recyclable" },
      { type: "Landfill", confidence: 0.03, recyclable: false }
    ],
    disposalTips: wasteType === "Recyclable" 
      ? ["Clean and dry before recycling", "Remove labels if possible", "Check local recycling guidelines"] 
      : wasteType === "Compostable"
      ? ["Place in green bin or compost", "Break down large items", "Mix with carbon materials"]
      : wasteType === "Hazardous"
      ? ["Take to special disposal facility", "Do not mix with regular trash", "Store in original container"]
      : ["Place in general waste bin", "Ensure properly sealed", "Reduce similar waste in future"],
    environmentalImpact: {
      co2Saved: wasteType === "Recyclable" ? 3.5 : wasteType === "Compostable" ? 2.1 : 0.0,
      waterSaved: wasteType === "Recyclable" ? 500 : wasteType === "Compostable" ? 250 : 0,
      energySaved: wasteType === "Recyclable" ? 7.2 : wasteType === "Compostable" ? 3.5 : 0.0
    }
  };
  
  const isPrimaryRecyclable = mockResult.predictions[0].recyclable;
  
  const handleSaveResult = () => {
    toast({
      title: "Result saved!",
      description: "Classification has been added to your history",
    });
  };
  
  const handleShareResult = () => {
    navigator.clipboard.writeText(
      `I just classified ${mockResult.wasteType} waste with EcoSnap and saved ${mockResult.environmentalImpact.co2Saved}kg of CO2!`
    ).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: "Now you can share this result with others",
      });
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-green-100 dark:border-green-900/50 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Classification Results</CardTitle>
              <CardDescription>AI-powered waste analysis</CardDescription>
            </div>
            <Badge className={isPrimaryRecyclable ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"}>
              {isPrimaryRecyclable ? "Recyclable" : "Not Recyclable"}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">{mockResult.wasteType}</h3>
                <p className="text-sm text-muted-foreground">Primary waste classification</p>
              </div>
              <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Recycle className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">Classification Confidence:</p>
              {mockResult.predictions.map((prediction, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>{prediction.type}</span>
                    <span>{Math.round(prediction.confidence * 100)}%</span>
                  </div>
                  <Progress 
                    value={prediction.confidence * 100} 
                    className={`h-2 ${index === 0 ? 'bg-muted' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Disposal Guidelines</h3>
              </div>
              
              <ul className="space-y-2">
                {mockResult.disposalTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="h-5 w-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-800 dark:text-green-200 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">Environmental Impact</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-lg font-semibold text-green-700 dark:text-green-500">
                    {mockResult.environmentalImpact.co2Saved} kg
                  </p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-lg font-semibold text-blue-700 dark:text-blue-500">
                    {mockResult.environmentalImpact.waterSaved} L
                  </p>
                  <p className="text-xs text-muted-foreground">Water Saved</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                  <p className="text-lg font-semibold text-amber-700 dark:text-amber-500">
                    {mockResult.environmentalImpact.energySaved} kWh
                  </p>
                  <p className="text-xs text-muted-foreground">Energy Saved</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t bg-muted/20 flex gap-2 justify-end">
            <Button variant="outline" onClick={handleSaveResult}>
              Save Result
            </Button>
            <Button variant="outline" onClick={handleShareResult}>
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
