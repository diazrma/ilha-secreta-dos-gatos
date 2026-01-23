import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { verses } from '@/data/verses';
import { Calendar, Heart } from 'lucide-react';

function VersesTab() {
    const [verseOfTheDay, setVerseOfTheDay] = useState<{ text: string; reference: string } | null>(null);
    const [versesShown, setVersesShown] = useState<number>(0);

    useEffect(() => {
        try {
            const today = new Date().toDateString();
            const savedData = JSON.parse(localStorage.getItem('verseOfTheDay') || '{}');
            const shownCount = parseInt(localStorage.getItem('versesShown') || '0', 10);

            if (savedData?.date === today && savedData?.verse) {
                setVerseOfTheDay(savedData.verse);
            } else {
                const newVerse = verses[Math.floor(Math.random() * verses.length)];
                setVerseOfTheDay(newVerse);
                localStorage.setItem(
                    'verseOfTheDay',
                    JSON.stringify({ date: today, verse: newVerse })
                );
                localStorage.setItem('versesShown', (shownCount + 1).toString());
                setVersesShown(shownCount + 1);
            }
        } catch (error) {
            console.error('Error loading verse of the day:', error);
        }
    }, []);

    useEffect(() => {
        const shownCount = parseInt(localStorage.getItem('versesShown') || '0', 10);
        setVersesShown(shownCount);
    }, []);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-start pt-12 p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
             Um abraço em pensamento
            </h1>

            <Card className="w-full max-w-lg shadow-lg border border-gray-300 rounded-lg bg-gray-50">
                <CardContent className="p-6 flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold mb-6 text-red-600">
                        Versículo do Dia
                    </h2>

                    <div className="text-gray-600 text-sm mb-6 flex flex-col items-center">
                        <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formattedDate}
                        </p>
                    </div>

                    {verseOfTheDay ? (
                        <>
                            <p className="text-gray-900 text-xl font-medium mb-4 leading-relaxed max-w-md">
                                "{verseOfTheDay.text}"
                            </p>
                            <p className="text-gray-600 italic text-lg">
                                — {verseOfTheDay.reference}
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-600 italic">Carregando...</p>
                    )}

                    <div className="mt-6">
                        <p className="text-sm text-gray-500">
                            Versículos exibidos: {versesShown} / {verses.length}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <p className="text-gray-500 text-sm mt-6 flex items-center justify-center">
                Cada dia, uma palavra de Deus na ilha
                <Heart className="w-4 h-4 ml-2 text-red-500" />
            </p>
        </div>
    );
}

export default VersesTab;
