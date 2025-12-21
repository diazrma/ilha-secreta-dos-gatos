import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Mail, MailOpen, Heart, ArrowLeft, Printer, Share2 } from 'lucide-react';
import catLetter from '@/assets/cat-letter.png';

interface LettersTabProps {
  firstVisitDate: Date;
}

const TEST_MODE = false;
const TEST_DAY = 31;
const TEST_MONTH = 12;

const letters = [
  {
    id: 1,
    title: "Para começar...",
    content: `Aninha,

Se você está lendo isso, é porque de alguma forma nossas conversas criaram algo especial.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 2,
    title: "Sobre nós dois",
    content: `Aninha,

Mesmo à distância, sinto uma conexão leve e gostosa entre nós.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 3,
    title: "O que você representa",
    content: `Aninha,

Você virou uma parte bonita dos meus dias.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 4,
    title: "Nossos sonhos",
    content: `Aninha,

Às vezes imagino o dia em que a distância será só lembrança.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 5,
    title: "Para o que está por vir",
    content: `Aninha,

A ideia de um "nós" me deixa feliz.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 6,
    title: "Jogo da Milka",
    content: `Aninha,

Criei um jogo da Milkinha usando IA 🤍

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 7,
    title: "Sobre objetivos",
    content: `Aninha,

Sempre acreditei em objetivos e constância.

Com carinho,
Rodrigo 🐱💕`
  }
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [readLetters, setReadLetters] = useState<number[]>([]);

  const getDaysAvailable = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - firstVisitDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, letters.length);
  };

  const daysAvailable = getDaysAvailable();

  const canOpenLetter = (index: number) => {
    // carta 6 sempre abre
    if (letters[index].id === 6) return true;

    // cartas 1–5 seguem dias
    if (index < 5) return index < daysAvailable;

    // carta 7+ sempre pode abrir
    return true;
  };

  const handleLetterRead = (id: number) => {
    if (!readLetters.includes(id)) {
      setReadLetters(prev => [...prev, id]);
    }
  };

  if (selectedLetter !== null) {
    const letter = letters[selectedLetter];
    handleLetterRead(letter.id);

    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedLetter(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="max-w-2xl mx-auto">
          <div className="p-4 border-b">
            <h3 className="flex items-center gap-2 text-xl">
              <Heart className="w-5 h-5 fill-primary" />
              {letter.title}
            </h3>
          </div>

          <CardContent className="p-6 min-h-[400px]">
            <p className="whitespace-pre-line text-lg">{letter.content}</p>

            {letter.id === 6 && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() =>
                    window.open('https://milkinha-love-quest.vercel.app/', '_blank')
                  }
                >
                  🎮 Jogar Milkinha Love Quest
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <img src={catLetter} className="w-28 h-28 mx-auto mb-4" />
        <h2 className="text-3xl mb-2">Seus Recados</h2>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {letters.map((letter, index) => {
          const canOpen = canOpenLetter(index);
          const isRead = readLetters.includes(letter.id);

          return (
            <Card
              key={letter.id}
              className="cursor-pointer transition-all hover:scale-[1.02]"
              onClick={() => canOpen && setSelectedLetter(index)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {isRead ? <MailOpen /> : <Lock />}
                </div>

                <div className="flex-1">
                  <h3>Carta {index + 1}</h3>
                  <p className="text-sm">
                    {isRead ? 'Já lida' : 'Clique para abrir'}
                  </p>
                </div>

                {isRead && (
                  <>
                    <Button variant="ghost" size="sm">
                      <Mail />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Printer />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 />
                    </Button>
                  </>
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
