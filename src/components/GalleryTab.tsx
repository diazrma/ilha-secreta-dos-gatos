import { Card, CardContent } from '@/components/ui/card';
import { Image } from 'lucide-react';
import catSleeping from '@/assets/cat-sleeping.png';

import img1 from '@/assets/1.jpeg';
import img2 from '@/assets/2.png';
import img3 from '@/assets/3.png';

const GalleryTab = () => {
  const images = [img1, img2, img3];

  return (
    <div className="animate-fade-in text-center">
      <img 
        src={catSleeping} 
        alt="Gatinho dormindo" 
        className="w-32 h-32 mx-auto mb-6"
      />
      
      <h2 className="text-3xl font-handwritten text-gradient mb-2">
        Galeria de Memórias
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Em breve, este espaço será preenchido com fotos e momentos especiais...
        Aguarde! 💕
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[...images, null, null, null].slice(0, 6).map((src, index) => (
          <Card
            key={index}
            className={`border-border aspect-square overflow-hidden ${
              !src ? 'border-dashed opacity-50' : ''
            }`}
          >
            <CardContent className="p-0 h-full flex items-center justify-center">
              {src ? (
                <img
                  src={src}
                  alt={`Memória ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="w-8 h-8 text-muted-foreground" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
