
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

// Mock sustainability tips
const tips = [
  {
    id: 1,
    title: "Reduce Plastic Waste",
    content: "Use reusable bottles, bags, and containers to minimize single-use plastic waste. Plastic takes hundreds of years to decompose.",
    category: "Plastics"
  },
  {
    id: 2,
    title: "Compost Organic Waste",
    content: "Food scraps, yard waste, and paper can be composted to create nutrient-rich soil for your garden instead of sending to landfill.",
    category: "Organic"
  },
  {
    id: 3,
    title: "Proper E-Waste Disposal",
    content: "Electronics contain harmful materials. Always recycle them at designated e-waste collection points or through manufacturer programs.",
    category: "Electronic"
  },
  {
    id: 4,
    title: "Recycle Glass Completely",
    content: "Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity. Rinse before recycling.",
    category: "Glass"
  },
  {
    id: 5,
    title: "Separate Paper Properly",
    content: "Keep paper dry and clean for recycling. Remove plastic windows from envelopes and separate glossy paper from regular paper.",
    category: "Paper"
  }
];

export function SustainabilityTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const nextTip = () => {
    setCurrentTipIndex(prev => (prev + 1) % tips.length);
  };
  
  const prevTip = () => {
    setCurrentTipIndex(prev => (prev - 1 + tips.length) % tips.length);
  };
  
  const currentTip = tips[currentTipIndex];
  
  return (
    <Card className="border-green-100 dark:border-green-900/50 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Eco-Tips
            </CardTitle>
            <CardDescription>Sustainability advice</CardDescription>
          </div>
          <Badge category={currentTip.category} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="min-h-[120px]">
          <h4 className="font-medium mb-2">{currentTip.title}</h4>
          <p className="text-sm text-muted-foreground">{currentTip.content}</p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-muted-foreground">Tip {currentTipIndex + 1} of {tips.length}</p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={prevTip} className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTip} className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Badge({ category }: { category: string }) {
  let color;
  
  switch (category) {
    case 'Plastics':
      color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      break;
    case 'Organic':
      color = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      break;
    case 'Electronic':
      color = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      break;
    case 'Glass':
      color = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200';
      break;
    case 'Paper':
      color = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      break;
    default:
      color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
      {category}
    </span>
  );
}
