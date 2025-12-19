import { useState, useEffect } from 'react';
import axios from 'axios';
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
  }
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [customLetters, setCustomLetters] = useState(letters);
  const [readLetters, setReadLetters] = useState<number[]>([]);

  const handleDownloadTxt = () => {
    if (readLetters.length === 0) return;

    const content = customLetters
      .filter((letter) => readLetters.includes(letter.id))
      .map((letter) => `Título: ${letter.title}\nConteúdo:\n${letter.content}\n\n`)
      .join("");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "recados-lidos.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleLetterRead = (id: number) => {
    if (!readLetters.includes(id)) {
      setReadLetters([...readLetters, id]);
    }
  };

  const handlePrint = (letter: { title: string; content: string }) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>${letter.title}</title></head>
          <body>
            <h1>${letter.title}</h1>
            <p>${letter.content.replace(/\n/g, "<br>")}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShareWhatsApp = (letter: { title: string; content: string }) => {
    const message = `*${letter.title}*\n\n${letter.content}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getDaysAvailable = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - firstVisitDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, 5);
  };

  const daysAvailable = getDaysAvailable();

  // 🔓 Carta 6 sempre disponível
  const isLetterAvailable = (index: number) => {
    const letter = customLetters[index];
    if (letter.id === 6) return true;
    return index < daysAvailable;
  };

  const getDaysUntilUnlock = (index: number) => {
    const letter = customLetters[index];
    if (letter.id === 6) return 0;
    return index - daysAvailable + 1;
  };

  const getHolidayMessage = () => {
    const now = new Date();
    const day = TEST_MODE ? TEST_DAY : now.getDate();
    const month = TEST_MODE ? TEST_MONTH : now.getMonth() + 1;

    if (day === 25 && month === 12)
      return "🎄 Feliz Natal, Aninha!";
    if ((day === 31 && month === 12) || (day === 1 && month === 1))
      return "🎆 Feliz Ano Novo, Aninha!";

    return null;
  };

  const holidayMessage = getHolidayMessage();

  if (selectedLetter !== null) {
    const letter = customLetters[selectedLetter];
    handleLetterRead(letter.id);

    return (
      <div className="animate-fade-in">
        <Button variant="ghost" onClick={() => setSelectedLetter(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="max-w-2xl mx-auto shadow-card border-border overflow-hidden">
          <div className="bg-secondary/30 p-4 border-b border-border">
            <h3 className="text-xl font-handwritten flex items-center gap-2">
              <Heart className="w-5 h-5 fill-primary" />
              {letter.title}
            </h3>
          </div>

          <CardContent className="p-0">
            <div className="letter-paper p-6 min-h-[400px]">
              <p className="font-handwritten text-xl leading-relaxed whitespace-pre-line">
                {letter.content}
              </p>

              {letter.id === 6 && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => window.open("https://milkinha-love-quest.vercel.app/", "_blank")}
                    className="bg-primary text-white px-6 py-2 rounded-full text-lg hover:scale-105 transition"
                  >
                    🎮 Jogar Milkinha Love Quest
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {holidayMessage && (
        <Card className="max-w-2xl mx-auto mb-6 shadow-card border-primary/40 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="font-handwritten text-xl text-primary">{holidayMessage}</p>
          </CardContent>
        </Card>
      )}

      <div className="text-center mb-8">
        <img src={catLetter} className="w-28 h-28 mx-auto mb-4" />
        <h2 className="text-3xl font-handwritten mb-2">Seus Recados</h2>
        <p>{daysAvailable} de 5 cartas disponíveis</p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {customLetters.map((letter, index) => {
          const available = isLetterAvailable(index);
          const daysLeft = getDaysUntilUnlock(index);

          return (
            <Card
              key={letter.id}
              className={`transition-all ${available ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60'}`}
              onClick={() => available && setSelectedLetter(index)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${available ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                  {available ? <MailOpen /> : <Lock />}
                </div>

                <div className="flex-1">
                  <h3>Carta {index + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    {available
                      ? 'Clique para ler'
                      : `Disponível em ${daysLeft} dia(s)`}
                  </p>
                </div>

                {available && (
                  <>
                    <Button variant="ghost" size="sm">
                      <Mail />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handlePrint(letter); }}>
                      <Printer />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleShareWhatsApp(letter); }}>
                      <Share2 />
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <Button
          onClick={handleDownloadTxt}
          disabled={readLetters.length === 0}
          className="w-full"
        >
          Baixar Recados Lidos (.txt)
        </Button>
      </div>
    </div>
  );
};

export default LettersTab;
