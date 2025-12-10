import { Card, CardContent } from '@/components/ui/card';
import catSleeping from '@/assets/cat-sleeping.png';
import { Paw } from "lucide-react";

const VideosTab = () => {
  const youtubeVideos = [
    "https://www.youtube.com/embed/XH70G6bKbAY",
    "https://www.youtube.com/embed/JREvTjMvhdo",
    "https://www.youtube.com/embed/RIDhssvCZss",
    "https://www.youtube.com/embed/ISWS3pnvRC4",
    "https://www.youtube.com/embed/XH70G6bKbAY",
  ];

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
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
          Em breve chegarão novos vídeos.
        </p>

        <div className="grid gap-4 max-w-2xl mx-auto pb-20">
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

      {/* BOTÃO FLUTUANTE FORA DO BLOCO PRINCIPAL */}
      <button
        onClick={scrollToBottom}
        className="
          fixed
          bottom-6
          right-6
          bg-pink-500
          text-white
          p-4
          rounded-full
          shadow-lg
          hover:bg-pink-600
          transition
          flex
          items-center
          justify-center
          z-50
        "
      >
        <Paw className="w-6 h-6" />
      </button>
    </>
  );
};

export default VideosTab;
