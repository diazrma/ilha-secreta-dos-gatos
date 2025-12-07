import { Card, CardContent } from '@/components/ui/card';
import { Image } from 'lucide-react';
import catSleeping from '@/assets/cat-sleeping.png';

const GalleryTab = () => {
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
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-border border-dashed opacity-50 aspect-square">
            <CardContent className="p-0 h-full flex items-center justify-center text-muted-foreground">
              <Image className="w-8 h-8" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
