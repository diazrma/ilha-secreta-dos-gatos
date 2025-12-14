import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Image, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import catSleeping from '@/assets/cat-sleeping.png';
import img1 from '@/assets/1.jpeg';
import img2 from '@/assets/2.png';
import img3 from '@/assets/3.png';
import img4 from '@/assets/4.png';

const GalleryTab = () => {
  const images = [img1, img2, img3, img4];

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  return (
    <div className="animate-fade-in text-center">
      {/* Header */}
      <img
        src={catSleeping}
        alt="Gatinho dormindo"
        className="w-32 h-32 mx-auto mb-6"
      />

      <h2 className="text-3xl font-handwritten text-gradient mb-2">
        Galeria de Memórias
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Em breve, este espaço será preenchido com fotos e momentos especiais...
        Aguarde! 💕
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[...images, null, null, null].slice(0, 6).map((src, index) => (
          <Card
            key={index}
            className={`aspect-square overflow-hidden ${
              !src ? 'border-dashed opacity-50' : 'cursor-pointer'
            }`}
          >
            <CardContent className="p-0 h-full flex items-center justify-center">
              {src ? (
                <motion.img
                  src={src}
                  alt={`Memória ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleOpen(src)}
                />
              ) : (
                <Image className="w-8 h-8 text-muted-foreground" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && selectedImage && (
            <DialogContent className="bg-transparent border-none shadow-none max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative"
              >
                {/* Botão fechar */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-10 right-0 text-white hover:opacity-80 transition"
                >
                  <X className="w-7 h-7" />
                </button>

                {/* Imagem ampliada */}
                <img
                  src={selectedImage}
                  alt="Imagem ampliada"
                  className="rounded-2xl max-h-[80vh] mx-auto object-contain"
                />
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
};

export default GalleryTab;
