import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import catSleeping from '@/assets/cat-sleeping.png';

const VideosTab = () => {
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
  ];

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
       Esse gatinho deixou alguns vídeos muito especiais para você.
       Assista novamente quando quiser! 🐱💖
       Em breve chegarão novos vídeos
      </p>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {videos.map((src, i) => (
          <Card key={i} className="border-border border rounded-xl shadow">
            <CardContent className="p-4">
              <video 
                src={src} 
                controls 
                className="w-full rounded-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosTab;
