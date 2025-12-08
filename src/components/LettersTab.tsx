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
    content: `Aninha posso te chamar assim ?

Se você está lendo isso, é porque de alguma forma nossas conversas, nossos gatinhos e nossas risadas pelo WhatsApp criaram algo especial.

Mesmo sem estarmos no mesmo lugar, senti vontade de guardar aqui alguns pedacinhos dos meus pensamentos para você. Como se essa página fosse uma extensão do que a gente já compartilha em mensagens, áudios e fotos fofas de gato.

Cada carta aqui é um carinho em forma de palavras. Um recado para você, de mim, do jeitinho que sei fazer.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 2,
    title: "Sobre nós dois",
    content: `Aninha,

É engraçado pensar que tudo começou com gatos... e agora aqui estamos, conversando quase todos os dias, rindo, flertando e descobrindo coisas um sobre o outro.

Mesmo à distância, sinto que existe uma conexão leve, gostosa, diferente. Você tem um jeito que acalma, diverte e ao mesmo tempo desperta minha curiosidade.

Adoro nossos papos aleatórios, nossos planos meio doidos e até as brincadeiras sobre casamento.

Quem diria que Belém e Brusque poderiam se aproximar desse jeito?

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 3,
    title: "O que você representa",
    content: `Aninha,

Você representa uma parte bonita dos meus dias. Uma notificação que me faz sorrir. Uma conversa que eu espero. Um brilho diferente na rotina.

Mesmo sem ter te conhecido pessoalmente ainda, você já é especial pra mim. Pela forma como fala, pela maneira que cuida dos seus gatinhos, pelo seu jeitinho doce e sincero.

Você me faz sonhar com possibilidades, encontros, abraços futuros e histórias que ainda vamos viver.

Obrigado por existir e por ter cruzado meu caminho... nem que tenha sido através de uma tela.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 4,
    title: "Nossos sonhos",
    content: `Aninha,

Às vezes imagino como seria quando finalmente nos encontrarmos. Como vai ser ouvir sua voz sem fone, ver seu sorriso de pertinho, rir das nossas próprias piadas cara a cara.

Sonho com o dia em que a distância vai ser só uma lembrança engraçada de como tudo começou: com gatos, mensagens e um flerte despretensioso.

Talvez a gente viaje, talvez tome um café juntos, talvez simplesmente fique em silêncio confortável olhando nossos celulares cheios de fotos de gatos.

Mas uma coisa eu sei: quero viver esses momentos com você.

Com carinho,
Rodrigo 🐱💕`
  },
  {
    id: 5,
    title: "Para o que está por vir",
    content: `Aninha,

Esta é a última carta por enquanto, mas a nossa história está só começando.

Não sei exatamente onde ela vai nos levar, mas a ideia de um "nós" me deixa feliz, curioso e esperançoso.

Quero que você saiba que gosto de você de verdade. Do seu jeito, da sua companhia virtual que já virou parte importante dos meus dias.

E se um dia a gente realmente cumprir a promessa brincando sobre casamento… vai ser uma história linda pra contar: tudo começou com gatos.

Com carinho e um sorriso bobo no rosto,
Rodrigo 🐱💕

P.S.: Ainda vou te mandar muitas fotos de gatos, então isso aqui é só o começo 🐾`
  }
];

const LettersTab = ({ firstVisitDate }: LettersTabProps) => {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);

  const getDaysAvailable = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - firstVisitDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, 5);
  };

  const daysAvailable = getDaysAvailable();

  const isLetterAvailable = (index: number) => {
    return index < daysAvailable;
  };

  const getDaysUntilUnlock = (index: number) => {
    return index - daysAvailable + 1;
  };

  // ✅ MENSAGEM DE NATAL / ANO NOVO
  const getHolidayMessage = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Janeiro = 1

    if (day === 25 && month === 12) {
      return "🎄 Feliz Natal, Aninha. Que seu dia seja leve, cheio de carinho, amor e cercado de boas energias!";
    }
    
    if ((day === 31 && month === 12) || (day === 1 && month === 1)) {
      return "🎆 Feliz Ano Novo, Aninha. Que esse novo ano nos aproxime ainda mais.";
    }

    return null;
  };

  const holidayMessage = getHolidayMessage();

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

      {/* ✅ MENSAGEM ESPECIAL PARA DATAS COMEMORATIVAS */}
      {holidayMessage && (
        <Card className="max-w-2xl mx-auto mb-6 shadow-card border-primary/40 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="font-handwritten text-xl text-primary">
              {holidayMessage}
            </p>
          </CardContent>
        </Card>
      )}

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
