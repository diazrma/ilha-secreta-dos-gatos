import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Heart, ArrowLeft, Share2, Printer } from 'lucide-react';
import catLetter from '@/assets/cat-letter.png';

interface LettersTabProps {
  firstVisitDate: Date;
}

const STORAGE_KEY = 'opened_letters';

const TEST_DAY: number | null = null;
const TEST_MONTH: number | null = null;

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
    title: "Akai Ito",
    content: `Aninha,
    
    Algumas coisas não precisam ser entendidas agora.
    Os japoneses chamam isso de Akai Ito.
    Boa semana.
    
    Com carinho,
    Rodrigo 🐱💕`
  },
  {
    id: 8,
    title: "Porto Seguro",
    content: `Aninha,
    Às vezes a vida aperta, os pensamentos ficam pesados e o coração fica meio perdido tentando entender tudo. Mas eu quero que você saiba que não precisa enfrentar nada sozinha. A partir de agora, eu sou o seu porto seguro alguém para te apoiar, acalmar, ouvir e caminhar junto com você, no que vier.
  
    Você pode contar comigo.
  
    Com carinho,
    Rodrigo 🐱💕`
  },
  {
    id: 9,
    title: "Ultimo recado do Ano 2025",
    content: `Aninha,

São cinco anos desde que te conheço.
E foi só em 2025 que a vida nos permitiu, de verdade, nos aproximar.
Mesmo com a distância, mesmo sem pressa, algo entre nós encontrou espaço para crescer.
Ficou claro que é possível, que faz sentido, que pode ser.
Se depender de mim, 2026 será o ano em que a gente segue junto,
atravessando distâncias, sendo apoio um do outro, escolhendo ficar.

Quando a gente começou a falar mais sobre nós, essa música passou a me acompanhar.
Não era só uma canção, era um jeito silencioso de sentir você mais perto,
de guardar o que eu ainda não sabia dizer.
Por isso deixo ela aqui, do jeito que ficou pra mim:
<a href="https://www.youtube.com/watch?v=Dg4YT__EgbM" target="_blank" style="color:#ff4f6d; text-decoration:underline;">
Glass Heart - TENBLANK
</a>

Com carinho,
Rodrigo 🐱💕`
  }
];

const specialDates = [
  {
    day: 25,
    month: 12,
    message: `Feliz Natal, Aninha! 🎄✨

Que essa data especial traga ainda mais alegria, amor e momentos inesquecíveis para você. Obrigado por ser uma luz tão bonita na minha vida.
`,
  },
  {
    day: 1,
    month: 1,
    message: `Feliz Ano Novo, Aninha! 🎆💖

Que este ano seja cheio de realizações, sonhos e momentos felizes para você. Estou animado para ver o que o futuro nos reserva.
`,
  },
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [openedLetters, setOpenedLetters] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setOpenedLetters(JSON.parse(saved));
    }
  }, []);

  const openLetter = (index: number) => {
    const letterId = letters[index].id;

    if (!openedLetters.includes(letterId)) {
      const updated = [...openedLetters, letterId];
      setOpenedLetters(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    setSelectedLetter(index);
  };

  const isLetterOpen = (letterId: number) => {
    if (letterId <= 6) return true;
    return openedLetters.includes(letterId);
  };

  const getSpecialMessage = () => {
    const today = new Date();

    const day = TEST_DAY ?? today.getDate();
    const month = TEST_MONTH ?? (today.getMonth() + 1);

    const specialDate = specialDates.find(
      (date) => date.day === day && date.month === month
    );

    if (specialDate) {
      const isChristmas = specialDate.day === 25 && specialDate.month === 12;
      return { message: specialDate.message, isChristmas };
    }

    return null;
  };

  const shareOnWhatsApp = (title: string, content: string) => {
    const message = `${title}\n\n${content}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const printLetter = (title: string, content: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
          </head>
          <body>
            <h1>${title}</h1>
            <p>${content.replace(/\n/g, '<br>')}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const specialMessageData = getSpecialMessage();

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

          <CardContent className="p-6 min-h-[350px] text-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: letter.content.replace(/\n/g, '<br>')
              }}
            />

            {letter.id === 6 && (
              <div className="mt-4 text-center">
                <a
                  href="https://milkinha-love-quest.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                >
                  Acesse o Jogo da Milkinha
                </a>
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
        <h2 className="text-3xl">Suas Cartas</h2>
      </div>

      {specialMessageData && (
        <div className="text-center mb-8 relative">
          <div
            className={`max-w-xl mx-auto p-6 rounded-lg shadow-card bg-card ${
              specialMessageData.isChristmas ? "relative" : ""
            }`}
          >
            <h2 className="text-3xl mb-4">{specialMessageData.message}</h2>
            <p className="text-lg">Com carinho, Rodrigo 🐱💕</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 max-w-2xl mx-auto">
        {letters.map((letter, index) => {
          const open = isLetterOpen(letter.id);

          return (
            <Card
              key={letter.id}
              className="cursor-pointer transition-all hover:scale-[1.02]"
              onClick={() => openLetter(index)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ color: 'hsl(var(--primary))' }}
                >
                  {open ? <MailOpen /> : <Mail />}
                </div>

                <div>
                  <p
                    className={`text-sm font-medium ${
                      open
                        ? 'text-[hsl(var(--coral))]'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {open ? 'Carta aberta' : 'Carta fechada'}
                  </p>
                  <p className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Heart className="w-4 h-4 fill-primary text-primary" />
                    {letter.title}
                  </p>
                </div>
              </CardContent>

              <div className="p-4 flex gap-4 justify-end">
                <Button
                  onClick={() => shareOnWhatsApp(letter.title, letter.content)}
                  className="flex items-center gap-2 bg-[hsl(var(--coral))] text-white hover:bg-[hsl(var(--coral-light))]"
                >
                  <Share2 className="w-4 h-4" />
                </Button>

                <Button
                  onClick={() => printLetter(letter.title, letter.content)}
                  className="flex items-center gap-2 bg-[hsl(var(--coral))] text-white hover:bg-[hsl(var(--coral-light))]"
                >
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LettersTab;
