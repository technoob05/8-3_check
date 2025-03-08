import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface WelcomeLetterProps {
  onLetterOpen: () => void;
}

export default function WelcomeLetter({ onLetterOpen }: WelcomeLetterProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const noButtonSize = Math.max(50, 100 - noCount * 10); // Button gets smaller
  const yesButtonSize = 100 + noCount * 20; // Button gets bigger

  const handleNoClick = () => {
    setNoCount(count => count + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setTimeout(() => {
      onLetterOpen();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 z-[100]">
      <AnimatePresence>
        {!isLetterOpen ? (
          <motion.div
            className="relative cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1 }}
            onClick={() => setIsLetterOpen(true)}
          >
            {/* Envelope */}
            <div className="w-64 h-48 bg-pink-100 rounded-lg shadow-xl transform hover:scale-105 transition-transform">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-handwriting text-primary">Nhấn để mở thư 💌</p>
              </div>
              {/* Envelope flap animation */}
              <motion.div
                className="absolute top-0 left-0 w-full h-24 bg-pink-200 origin-bottom"
                initial={{ rotateX: 0 }}
                whileHover={{ rotateX: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-handwriting text-primary mb-8">
                Em có yêu anh không? 💝
              </h2>
              <div className="flex flex-col gap-4 items-center">
                <motion.div
                  style={{ width: yesButtonSize }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleYesClick}
                    className="w-full font-handwriting text-lg bg-primary hover:bg-primary/90"
                    disabled={yesPressed}
                  >
                    Có, em yêu anh! 💖
                  </Button>
                </motion.div>

                <motion.div
                  style={{ width: noButtonSize }}
                  animate={{ 
                    x: noCount % 2 === 0 ? 100 : -100,
                    scale: 1 - noCount * 0.1
                  }}
                  whileHover={{ scale: 0.9 }}
                >
                  <Button
                    onClick={handleNoClick}
                    variant="outline"
                    className="w-full font-handwriting text-lg opacity-50"
                    disabled={yesPressed}
                  >
                    {noCount === 0 ? 'Không...' : 'Thật không vậy? 🥺'}
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {yesPressed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 flex items-center justify-center bg-pink-500/20 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="text-4xl"
                >
                  ❤️
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}