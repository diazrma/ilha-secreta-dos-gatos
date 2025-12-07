import { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import catWelcome from '@/assets/cat-welcome.png';

interface PasswordScreenProps {
  onSuccess: () => void;
}

const CORRECT_PASSWORD = "L58IA";

const PasswordScreen = ({ onSuccess }: PasswordScreenProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (password.length === 5) {
      if (password === CORRECT_PASSWORD) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setPassword('');
        }, 600);
      }
    }
  }, [password, onSuccess]);

  return (
    <div className="min-h-screen gradient-warm flex flex-col items-center justify-center p-6">
      <div className="text-center animate-fade-in">
        <img 
          src={catWelcome} 
          alt="Gatinho fofo dando boas-vindas" 
          className="w-40 h-40 mx-auto mb-6 animate-float"
        />
        
        <h1 className="text-4xl md:text-5xl font-handwritten text-gradient mb-2">
          Ilha dos Gatos
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Um lugar especial só para você 🐱
        </p>

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-card max-w-sm mx-auto">
          <p className="text-foreground font-medium mb-4">
            Digite a senha secreta
          </p>
          
          <div className={`transition-all ${error ? 'animate-shake' : ''}`}>
            <InputOTP 
              maxLength={5} 
              value={password}
              onChange={(value) => setPassword(value)}
              className="justify-center"
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4].map((index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index} 
                    className={`w-12 h-14 text-xl font-bold rounded-xl border-2 transition-all
                      ${error 
                        ? 'border-destructive bg-destructive/10' 
                        : 'border-border bg-background hover:border-primary focus:border-primary'
                      }`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-destructive text-sm mt-3 animate-fade-in">
              Senha incorreta, tente novamente!
            </p>
          )}

          <p className="text-muted-foreground text-xs mt-6">
            Dica: Pergunte para quem te enviou este link 💕
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordScreen;
