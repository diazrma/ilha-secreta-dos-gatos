import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import catWelcome from '@/assets/cat-welcome.png';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ open, onClose }: WelcomeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <img 
            src={catWelcome} 
            alt="Gatinho fofo" 
            className="w-24 h-24 mx-auto mb-4 animate-float"
          />
          <DialogTitle className="text-2xl font-handwritten text-gradient">
            Bem-vinda à Ilha dos Gatos! 🐱
          </DialogTitle>
          <DialogDescription className="text-foreground/80 text-base mt-4 space-y-3">
            <p>
              Este é um lugar especial criado só para você, meu amor!
            </p>
            <p className="text-left bg-secondary/30 p-4 rounded-xl">
              <strong className="text-primary">Como funciona:</strong>
              <br /><br />
              📜 <strong>Recados:</strong> Você tem 5 cartas especiais. Uma nova carta é liberada a cada dia!
              <br /><br />
              🎬 <strong>Vídeos:</strong> Em breve teremos vídeos especiais aqui.
              <br /><br />
              📷 <strong>Galeria:</strong> Fotos e momentos especiais virão em breve.
            </p>
            <p className="text-primary font-medium">
              Sua primeira carta já está disponível! 💌
            </p>
          </DialogDescription>
        </DialogHeader>
        <Button 
          onClick={onClose}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Começar a explorar 🐾
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
