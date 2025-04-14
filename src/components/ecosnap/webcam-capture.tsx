
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw } from 'lucide-react';

interface WebcamCaptureProps {
  onCapture: (imageUrl: string) => void;
}

export function WebcamCapture({ onCapture }: WebcamCaptureProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (isCapturing) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isCapturing]);
  
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Unable to access camera. Please ensure you have granted camera permissions.');
      setIsCapturing(false);
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageUrl);
        onCapture(imageUrl);
        setIsCapturing(false);
      }
    }
  };
  
  const resetCamera = () => {
    setCapturedImage(null);
    setIsCapturing(true);
  };
  
  const toggleCamera = () => {
    setIsCapturing(prev => !prev);
  };
  
  return (
    <div className="w-full">
      {capturedImage ? (
        <div className="relative rounded-lg overflow-hidden border border-green-100 dark:border-green-900/50 animate-fade-in">
          <img 
            src={capturedImage} 
            alt="Captured waste" 
            className="w-full h-auto max-h-[400px] object-contain bg-black/5 dark:bg-white/5" 
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetCamera}
            className="absolute bottom-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-black/5 dark:bg-white/5 relative min-h-[300px] flex items-center justify-center">
            {isCapturing ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-8">
                <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Camera is turned off</p>
              </div>
            )}
            
            {cameraError && (
              <div className="absolute inset-0 bg-background/95 flex items-center justify-center p-6 animate-fade-in">
                <div className="text-center text-destructive">
                  <p className="font-medium mb-2">Camera Error</p>
                  <p className="text-sm">{cameraError}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={toggleCamera}
              className="flex-1 mr-2"
            >
              {isCapturing ? 'Turn Off Camera' : 'Turn On Camera'}
            </Button>
            
            <Button
              onClick={captureImage}
              disabled={!isCapturing}
              className="flex-1 ml-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Camera className="mr-2 h-4 w-4" />
              Capture Image
            </Button>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
