import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Mail, MailOpen, Heart, ArrowLeft } from 'lucide-react';
import catLetter from '@/assets/cat-letter.png';

interface LettersTabProps {
  firstVisitDate: Date;
}

const letters = [
  {
    id: 1,
    title: "Para começar...",
    content: `Meu amor,

Se você está lendo isso, significa que encontrou o caminho até nossa ilha secreta. Este lugar foi criado especialmente para você, para guardar todos os recados que eu quero te enviar.

Cada carta aqui representa um pedacinho do meu coração. Espero que você sinta todo o carinho que coloquei em cada palavra.

Você é especial demais para mim. Obrigado por existir na minha vida.

Com todo meu amor,
Seu gatinho 🐱💕`
  },
  {
    id: 2,
    title: "Sobre nós dois",
    content: `Amor da minha vida,

Sabe o que mais gosto em nós? A forma como nos entendemos sem precisar de muitas palavras. Os olhares, os sorrisos... tudo faz sentido quando estou com você.

Cada momento ao seu lado é um presente. Desde as risadas bobas até os abraços apertados no final do dia.

Você transforma dias comuns em memórias incríveis.

Te amo infinitamente,
Seu gatinho 🐱💕`
  },
  {
    id: 3,
    title: "O que você representa",
    content: `Minha pessoa favorita,

Você é minha paz em dias caóticos. Meu sorriso quando acordo. Minha certeza de que amor de verdade existe.

Às vezes me pego pensando em como tive sorte de te encontrar. Em milhões de pessoas, você apareceu na minha vida e mudou tudo.

Obrigado por ser você. Por me aceitar como sou. Por me fazer querer ser melhor todos os dias.

Eternamente seu,
Seu gatinho 🐱💕`
  },
  {
    id: 4,
    title: "Nossos sonhos",
    content: `Meu amor,

Sonho com tantas coisas ao seu lado... Viagens, aventuras, tardes preguiçosas, noites estreladas. Tudo fica melhor quando imagino você comigo.

Quero construir uma vida cheia de momentos felizes com você. Uma vida onde cada dia seja uma nova oportunidade de te fazer sorrir.

O futuro me anima porque sei que você estará nele.

Com amor infinito,
Seu gatinho 🐱💕`
  },
  {
    id: 5,
    title: "Para sempre",
    content: `Meu grande amor,

Esta é a última carta desta série, mas não a última das nossas histórias. Ainda temos muito para viver juntos.

Quero que você saiba que, não importa o que aconteça, estarei sempre aqui. Nos dias bons e nos difíceis. Nas vitórias e nas quedas.

Você é minha pessoa. Minha escolha. Meu amor.

Para sempre e mais um dia,
Seu gatinho 🐱💕

P.S.: Te amo mais do que palavras podem expressar. 💕`
  }
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  
  const getDaysAvailable = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - firstVisitDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, 5); // +1 porque o primeiro dia conta
  };

  const daysAvailable = getDaysAvailable();

  const isLetterAvailable = (index: number) => {
    return index < daysAvailable;
  };

  const getDaysUntilUnlock = (index: number) => {
    return index - daysAvailable + 1;
  };

  if (selectedLetter !== null) {
    const letter = letters[selectedLetter];
    return (
      <div className="animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedLetter(null)}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos recados
        </Button>
        
        <Card className="max-w-2xl mx-auto shadow-card border-border overflow-hidden">
          <div className="bg-secondary/30 p-4 border-b border-border">
            <h3 className="text-xl font-handwritten text-primary flex items-center gap-2">
              <Heart className="w-5 h-5 fill-primary" />
              {letter.title}
            </h3>
          </div>
          <CardContent className="p-0">
            <div className="letter-paper p-6 min-h-[400px]">
              <p className="font-handwritten text-xl leading-relaxed text-foreground whitespace-pre-line">
                {letter.content}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <img 
          src={catLetter} 
          alt="Gatinho com carta" 
          className="w-28 h-28 mx-auto mb-4"
        />
        <h2 className="text-3xl font-handwritten text-gradient mb-2">
          Seus Recados Especiais
        </h2>
        <p className="text-muted-foreground">
          {daysAvailable} de 5 cartas disponíveis • Uma nova carta por dia
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {letters.map((letter, index) => {
          const available = isLetterAvailable(index);
          const daysLeft = getDaysUntilUnlock(index);
          
          return (
            <Card 
              key={letter.id}
              className={`transition-all duration-300 border-border
                ${available 
                  ? 'cursor-pointer hover:shadow-card hover:scale-[1.02] hover:border-primary/50' 
                  : 'opacity-60'
                }`}
              onClick={() => available && setSelectedLetter(index)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center
                  ${available 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {available ? (
                    <MailOpen className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${available ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Carta {index + 1}: {letter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {available 
                      ? 'Clique para ler' 
                      : `Disponível em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}`
                    }
                  </p>
                </div>

                {available && (
                  <Mail className="w-5 h-5 text-primary" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LettersTab;
