import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { WebcamCapture } from "@/components/ecosnap/webcam-capture";
import { ImageUploader } from "@/components/ecosnap/image-uploader";
import { AIStatusIndicator } from "@/components/ecosnap/ai-status-indicator";
import { WasteResults } from "@/components/ecosnap/waste-results";
import { CommunityLeaderboard } from "@/components/ecosnap/community-leaderboard";
import { UserRewards } from "@/components/ecosnap/user-rewards";
import { SustainabilityTips } from "@/components/ecosnap/sustainability-tips";
import { EcoChatAssistant } from "@/components/ecosnap/eco-chat-assistant";
import { AlertTriangle, Camera, Upload, Trophy, Leaf, MessageCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EcoSnapApp = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [wasteType, setWasteType] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setWasteType(null);
    setAnalysisError(null);
    
    // Simulate AI analysis
    setAnalyzing(true);
    setTimeout(() => {
      // Simulate occasional errors (10% chance of error)
      if (Math.random() < 0.1) {
        setAnalysisError("Our AI model couldn't recognize this item. Try a clearer image or a different angle.");
        setAnalyzing(false);
        
        toast({
          title: "Analysis Failed",
          description: "Unable to classify the image. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      const wasteTypes = ["Recyclable", "Compostable", "Hazardous", "Landfill"];
      const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      setWasteType(randomType);
      setAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `This item has been classified as ${randomType}`,
        duration: 3000,
      });
    }, 2500);
  };

  const handleRetry = () => {
    if (selectedImage) {
      setAnalysisError(null);
      handleImageSelect(selectedImage);
    }
  };

  return (
    <div className="min-h-screen bg-eco-background text-eco-foreground flex flex-col">
      {/* Header */}
      <header className="border-b eco-border sticky top-0 z-10 bg-eco-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-eco-primary" />
            <h1 className="text-xl font-bold">EcoSnap</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Image Upload & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload Section */}
            <Card className="eco-border eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-eco-primary" />
                  Waste Identification
                </CardTitle>
                <CardDescription>
                  Upload or take a photo of waste to get disposal guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload" className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="flex items-center">
                      <Camera className="mr-2 h-4 w-4" />
                      Use Camera
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-0">
                    <ImageUploader
                      selectedImage={selectedImage}
                      onImageSelect={handleImageSelect}
                    />
                  </TabsContent>
                  
                  <TabsContent value="camera" className="mt-0">
                    <WebcamCapture onCapture={handleImageSelect} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Results Section */}
            {selectedImage && (
              <Card className="eco-border eco-shadow animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {analysisError ? (
                      <>
                        <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                        Analysis Error
                      </>
                    ) : (
                      <>
                        <Leaf className="mr-2 h-5 w-5 text-eco-primary" />
                        Analysis Results
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {analysisError 
                      ? "We encountered a problem analyzing your image"
                      : "AI-powered waste classification and guidance"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AIStatusIndicator 
                      analyzing={analyzing} 
                      error={analysisError} 
                    />
                    
                    {wasteType && !analyzing && !analysisError && (
                      <WasteResults wasteType={wasteType} />
                    )}
                    
                    {analysisError && !analyzing && (
                      <WasteResults 
                        wasteType="" 
                        error={analysisError}
                        onRetry={handleRetry}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Chat Assistant (Visible on Mobile & Desktop) */}
            <div className="lg:hidden mt-8">
              <Card className="eco-border eco-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-eco-primary" />
                    EcoSnap Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about waste sorting or sustainability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EcoChatAssistant />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Community & Gamification */}
          <div className="space-y-6">
            {/* AI Chat Assistant (Desktop Only) */}
            <div className="hidden lg:block">
              <Card className="eco-border eco-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-eco-primary" />
                    EcoSnap Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about waste sorting or sustainability
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <EcoChatAssistant />
                </CardContent>
              </Card>
            </div>

            {/* User Rewards */}
            <Card className="eco-border eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-eco-primary" />
                  Your Impact
                </CardTitle>
                <CardDescription>
                  Track your environmental contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserRewards />
              </CardContent>
            </Card>

            {/* Community Leaderboard */}
            <Card className="eco-border eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-eco-primary" />
                  Community Leaders
                </CardTitle>
                <CardDescription>
                  Top eco-warriors making a difference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommunityLeaderboard />
              </CardContent>
            </Card>

            {/* Sustainability Tips */}
            <Card className="eco-border eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-eco-primary" />
                  Eco Tips
                </CardTitle>
                <CardDescription>
                  Daily sustainability advice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SustainabilityTips />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t eco-border py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>EcoSnap © 2025 - Helping you make sustainable waste decisions</p>
        </div>
      </footer>
    </div>
  );
};

export default EcoSnapApp;
