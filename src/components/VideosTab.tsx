import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import catSleeping from '@/assets/cat-sleeping.png';

const VideosTab = () => {
  return (
    <div className="animate-fade-in text-center">
      <img 
        src={catSleeping} 
        alt="Gatinho dormindo" 
        className="w-32 h-32 mx-auto mb-6"
      />
      
      <h2 className="text-3xl font-handwritten text-gradient mb-2">
        Vídeos Especiais
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Milkinha está preparando vídeos muito especiais para você...
        Volte em breve! 🐱
      </p>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border border-dashed opacity-50">
            <CardContent className="p-8 flex items-center justify-center gap-3 text-muted-foreground">
              <Video className="w-6 h-6" />
              <span>Vídeo {i} - Em breve</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosTab;
