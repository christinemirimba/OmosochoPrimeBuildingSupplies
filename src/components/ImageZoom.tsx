import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageZoom = ({ src, alt, className = '' }: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div 
        className={`relative cursor-zoom-in group ${className}`}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
