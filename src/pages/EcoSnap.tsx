
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { Camera, ChevronRight, Image, Info, Leaf, Medal, RefreshCw, Trash2, Trophy, Upload } from "lucide-react";
import { ImageUploader } from "@/components/ecosnap/image-uploader";
import { WebcamCapture } from "@/components/ecosnap/webcam-capture";
import { WasteResults } from "@/components/ecosnap/waste-results";
import { SustainabilityTips } from "@/components/ecosnap/sustainability-tips";
import { UserRewards } from "@/components/ecosnap/user-rewards";
import { CommunityLeaderboard } from "@/components/ecosnap/community-leaderboard";
import { AIStatusIndicator } from "@/components/ecosnap/ai-status-indicator";

// Mock user stats
const userStats = {
  points: 1250,
  level: 12,
  scans: 85,
  rank: 24,
  badgesEarned: 8,
  progress: 68,
};

const EcoSnapApp = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setPredictionResult(null);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPredictionResult(null);
  };

  const classifyWaste = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Mock AI analysis with a delay
    setTimeout(() => {
      // Mock prediction data
      const mockPredictions = [
        { type: 'Plastic', confidence: 0.89, recyclable: true },
        { type: 'Paper', confidence: 0.08, recyclable: true },
        { type: 'Metal', confidence: 0.02, recyclable: true },
        { type: 'Glass', confidence: 0.01, recyclable: true },
      ];
      
      const disposalTips = [
        'Rinse before recycling',
        'Remove any non-plastic components',
        'Check for recycling symbol (1-7)',
        'Place in designated plastics bin'
      ];
      
      setPredictionResult({
        wasteType: 'Plastic',
        predictions: mockPredictions,
        disposalTips,
        environmentalImpact: {
          co2Saved: 0.5,
          waterSaved: 2.3,
          energySaved: 1.8
        }
      });
      
      setIsProcessing(false);
      
      // Show success toast
      toast({
        title: "Classification complete!",
        description: "We've identified your waste as Plastic",
        variant: "default",
      });
      
      // Update user points - in a real app this would be an API call
      // updateUserPoints(10);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-green-50 dark:bg-green-900/30">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-green-600 dark:text-green-500">
                EcoSnap
              </h1>
              <p className="text-muted-foreground">
                AI-powered waste classification for a greener planet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AIStatusIndicator />
            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <Leaf className="h-4 w-4 text-green-600 dark:text-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-500">{userStats.points} EcoPoints</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-12">
            {/* Main section */}
            <div className="md:col-span-4 lg:col-span-7">
              <Card className="overflow-hidden border-green-100 dark:border-green-900/50 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border-b">
                  <CardTitle>Waste Classification</CardTitle>
                  <CardDescription>Upload an image or take a photo of waste to classify it</CardDescription>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Tabs 
                    defaultValue="upload" 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                      </TabsTrigger>
                      <TabsTrigger value="camera" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        <span>Use Camera</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upload" className="m-0">
                      <div className="p-6">
                        <ImageUploader
                          selectedImage={selectedImage}
                          onImageSelect={handleImageSelect}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="camera" className="m-0">
                      <div className="p-6">
                        <WebcamCapture
                          onCapture={handleImageSelect}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="flex-col gap-4 border-t bg-muted/20 p-4">
                  <div className="flex w-full items-center justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      disabled={!selectedImage || isProcessing}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    
                    <Button 
                      onClick={classifyWaste}
                      disabled={!selectedImage || isProcessing}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Classify Waste
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Results section */}
              {predictionResult && (
                <div className="mt-6">
                  <WasteResults result={predictionResult} />
                </div>
              )}
            </div>

            {/* Sidebar section */}
            <div className="md:col-span-3 lg:col-span-5 space-y-6">
              {/* User Profile Card */}
              <Card className="border-green-100 dark:border-green-900/50 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your EcoProfile</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Level {userStats.level}</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Rank #{userStats.rank}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Progress to level {userStats.level + 1}</span>
                        <span>{userStats.progress}%</span>
                      </div>
                      <Progress value={userStats.progress} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-muted/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-500">{userStats.scans}</div>
                        <div className="text-xs text-muted-foreground">Items Scanned</div>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-3">
                        <div className="text-2xl font-bold text-amber-500">{userStats.badgesEarned}</div>
                        <div className="text-xs text-muted-foreground">Badges Earned</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sustainability Tips */}
              <SustainabilityTips />
              
              {/* User Rewards & Badges */}
              <UserRewards />
            </div>
          </div>

          {/* Community Leaderboard */}
          <div className="mt-6">
            <CommunityLeaderboard />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-green-50 dark:bg-green-900/30 py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 EcoSnap - Making waste classification smarter for a greener planet</p>
        </div>
      </footer>
    </div>
  );
};

export default EcoSnapApp;
