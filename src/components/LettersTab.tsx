import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Heart, ArrowLeft } from 'lucide-react';
import catLetter from '@/assets/cat-letter.png';

interface LettersTabProps {
  firstVisitDate: Date;
}

const letters = [
  {
    id: 1,
    title: 'Para começar...',
    content: 'Conteúdo da carta 1'
  },
  {
    id: 2,
    title: 'Sobre nós dois',
    content: 'Conteúdo da carta 2'
  },
  {
    id: 3,
    title: 'O que você representa',
    content: 'Conteúdo da carta 3'
  },
  {
    id: 4,
    title: 'Nossos sonhos',
    content: 'Conteúdo da carta 4'
  },
  {
    id: 5,
    title: 'Para o que está por vir',
    content: 'Conteúdo da carta 5'
  },
  {
    id: 6,
    title: 'Jogo da Milka',
    content: 'Conteúdo da carta 6'
  },
  {
    id: 7,
    title: 'Sobre objetivos',
    content: 'Conteúdo da carta 7'
  },
  {
    id: 8,
    title: 'Mais adiante...',
    content: 'Conteúdo da carta 8'
  }
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [readLetters, setReadLetters] = useState<number[]>([]);

  const openLetter = (index: number) => {
    const letterId = letters[index].id;

    if (!readLetters.includes(letterId)) {
      setReadLetters(prev => [...prev, letterId]);
    }

    setSelectedLetter(index);
  };

  if (selectedLetter !== null) {
    const letter = letters[selectedLetter];

    return (
      <div>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setSelectedLetter(null)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="max-w-2xl mx-auto">
          <div className="p-4 border-b">
            <h3 className="flex items-center gap-2 text-xl">
              <Heart className="w-5 h-5 fill-primary text-primary" />
              {letter.title}
            </h3>
          </div>

          <CardContent className="p-6 min-h-[350px] whitespace-pre-line text-lg">
            {letter.content}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <img src={catLetter} className="w-28 h-28 mx-auto mb-4" />
        <h2 className="text-3xl">Suas Cartas</h2>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {letters.map((letter, index) => {
          const alwaysOpen = letter.id <= 6;
          const wasRead = readLetters.includes(letter.id);
          const isOpen = alwaysOpen || wasRead;

          return (
            <Card
              key={letter.id}
              className="cursor-pointer transition-all hover:scale-[1.02]"
              onClick={() => openLetter(index)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center text-primary">
                  {isOpen ? <MailOpen /> : <Mail />}
                </div>

                <div>
                  <h3>Carta {index + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isOpen ? 'Carta aberta' : 'Carta fechada'}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LettersTab;
