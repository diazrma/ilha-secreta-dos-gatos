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
    title: "Para começar...",
    content: `Aninha,

Se você está lendo isso, é porque de alguma forma nossas conversas, nossos gatinhos e nossas risadas pelo WhatsApp criaram algo especial.

Mesmo sem estarmos no mesmo lugar, senti vontade de guardar aqui alguns pedacinhos dos meus pensamentos para você.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 2,
    title: "Sobre nós dois",
    content: `Aninha,

Mesmo à distância, sinto que existe uma conexão leve e gostosa entre nós. Você tem um jeito único que acalma e encanta.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 3,
    title: "O que você representa",
    content: `Aninha,

Você virou uma parte bonita dos meus dias. Obrigado por existir e ter cruzado meu caminho.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 4,
    title: "Nossos sonhos",
    content: `Aninha,

Às vezes imagino o dia em que a distância será apenas uma lembrança do começo da nossa história.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 5,
    title: "Para o que está por vir",
    content: `Aninha,

Não sei onde tudo isso vai nos levar, mas a ideia de um "nós" me deixa feliz e esperançoso.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 6,
    title: "Jogo da Milka",
    content: `Aninha,

Eu precisava compartilhar isso com você: eu criei um jogo da Milkinha usando inteligência artificial 🤍

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 7,
    title: "Sobre objetivos",
    content: `Aninha,

Sempre acreditei em objetivos e sempre mantive constância. Nem tudo acontece no tempo que a gente imagina, mas acredito que o mais importante é não desistir.

Hoje sou grato pelo que construí: tenho minha casa e meu trabalho, e a maior conquista que tive foi o respeito das pessoas.

Acredito fielmente na gente, mesmo com nossas diferenças. Todos temos defeitos, ninguém é perfeito e o mais importante é aprender a respeitar os limites. 🤍

Espero que isso nunca atrapalhe a gente e que a gente sempre consiga atingir nossos objetivos, independente do tempo que leve.

Quero ser teu porto seguro, quem vai proteger.

Te desejo uma boa semana.

Com carinho,
Rodrigo 🐱💕`
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
