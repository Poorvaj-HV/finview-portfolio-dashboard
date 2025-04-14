
import { useState, useRef, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Upload } from 'lucide-react';

interface ImageUploaderProps {
  selectedImage: string | null;
  onImageSelect: (imageUrl: string) => void;
}

export function ImageUploader({ selectedImage, onImageSelect }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    // Check if file is an image
    if (file.type.match('image.*')) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    } else {
      alert('Please select an image file');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative rounded-lg overflow-hidden border border-green-100 dark:border-green-900/50 animate-fade-in">
          <img 
            src={selectedImage} 
            alt="Selected waste" 
            className="w-full h-auto max-h-[400px] object-contain bg-black/5 dark:bg-white/5" 
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerFileInput}
            className="absolute bottom-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
          >
            <Image className="mr-2 h-4 w-4" />
            Change
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer ${
            isDragging ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
            <Upload className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium mb-1">Upload waste image</p>
            <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: JPG, PNG, GIF (max 10MB)
            </p>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
