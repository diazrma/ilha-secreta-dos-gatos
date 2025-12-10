import { Card, CardContent } from '@/components/ui/card';
import catSleeping from '@/assets/cat-sleeping.png';

const VideosTab = () => {
  const youtubeVideos = [
    "https://www.youtube.com/embed/XH70G6bKbAY",
    "https://www.youtube.com/embed/JREvTjMvhdo",
    "https://www.youtube.com/embed/RIDhssvCZss",
    "https://www.youtube.com/embed/ISWS3pnvRC4",
    "https://www.youtube.com/embed/XH70G6bKbAY", // repetido para completar 5
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
        Em breve chegarão novos vídeos da série da Milkinha.
      </p>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {youtubeVideos.map((url, i) => (
          <Card key={i} className="border-border border rounded-xl shadow">
            <CardContent className="p-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={url}
                  title={`Vídeo ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideosTab;
