import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Video, Image, Heart } from 'lucide-react';
import PasswordScreen from '@/components/PasswordScreen';
import WelcomeModal from '@/components/WelcomeModal';
import LettersTab from '@/components/LettersTab';
import VideosTab from '@/components/VideosTab';
import GalleryTab from '@/components/GalleryTab';
import VersesTab from '@/components/VersesTab';
import catWelcome from '@/assets/cat-welcome.png';
import milkinha from '@/assets/milkinha.png';

const STORAGE_KEY = 'ilha-dos-gatos';

interface AppState {
  isAuthenticated: boolean;
  hasSeenWelcome: boolean;
  firstVisitDate: string;
}

const getStoredState = (): AppState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading state:', e);
  }
  return {
    isAuthenticated: false,
    hasSeenWelcome: false,
    firstVisitDate: new Date().toISOString()
  };
};

const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const Index = () => {
  const [state, setState] = useState<AppState>(getStoredState);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handlePasswordSuccess = () => {
    const newState = {
      ...state,
      isAuthenticated: true,
      firstVisitDate: state.firstVisitDate || new Date().toISOString()
    };
    setState(newState);
    
    if (!state.hasSeenWelcome) {
      setShowWelcome(true);
    }
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    setState(prev => ({ ...prev, hasSeenWelcome: true }));
  };

  if (!state.isAuthenticated) {
    return <PasswordScreen onSuccess={handlePasswordSuccess} />;
  }

  const firstVisitDate = new Date(state.firstVisitDate);

  return (
    <div className="min-h-screen gradient-warm">
      <WelcomeModal open={showWelcome} onClose={handleCloseWelcome} />
      
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <img src={catWelcome} alt="Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-handwritten text-gradient">
              Ilha dos Gatos
            </h1>
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse-soft" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="recados" className="w-full">
          <TabsList className="flex w-full justify-between mb-8 bg-card border border-border p-1 rounded-xl">
            <TabsTrigger 
              value="recados" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Recados</span>
            </TabsTrigger>
            <TabsTrigger 
              value="videos"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Vídeos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="galeria"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Galeria</span>
            </TabsTrigger>
            <TabsTrigger 
              value="versiculos"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Versículos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recados" className="mt-0">
            <LettersTab firstVisitDate={firstVisitDate} />
          </TabsContent>

          <TabsContent value="videos" className="mt-0">
            <VideosTab />
          </TabsContent>

          <TabsContent value="galeria" className="mt-0">
            <GalleryTab />
          </TabsContent>
          
          <TabsContent value="versiculos" className="mt-0">
            <VersesTab />
          </TabsContent>

        </Tabs>
      </main>

        {/* Milkinha no canto inferior direito */}
      <img 
        src={milkinha}
        alt="Milkinha"
        className="fixed bottom-4 right-4 w-28 h-28 opacity-90 pointer-events-none select-none drop-shadow-lg"
      />

      {/* Footer */}
      <footer className="py-6 text-center text-muted-foreground text-sm">
        <p>Feito com 💕 para você</p>
        <p className="mt-2">Copyright © Rodrigo Cardoso</p>
      </footer>
    </div>
  );
};

export default Index;
