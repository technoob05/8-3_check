import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';

interface WelcomeLetterProps {
  onLetterOpen: () => void;
}

export default function WelcomeLetter({ onLetterOpen }: WelcomeLetterProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(100); // Initialize button size


  const handleNoClick = () => {
    setNoCount((prevCount) => prevCount + 1);
    setNoButtonSize(Math.max(60, noButtonSize - 5));

    // Âm thanh khác nhau cho mỗi lần nhấn nút "Không"
    const sounds = ['/no-sound1.mp3', '/no-sound2.mp3', '/no-sound3.mp3'];
    const audio = new Audio(sounds[noCount % sounds.length]);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Auto-play prevented:', e));

    // Hiệu ứng rung nhẹ
    window.navigator.vibrate && window.navigator.vibrate(100);
  };

  const handleYesClick = () => {
    setYesPressed(true);

    // Tạo âm thanh khi nhấn nút "Có"
    const audio = new Audio('/yes-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Auto-play prevented:', e));

    // Hiệu ứng rung nhẹ
    window.navigator.vibrate && window.navigator.vibrate(200);

    // Hiệu ứng confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff69b4', '#ff77ff', '#ff007f', '#ff1493']
    });

    // Nhiều confetti hơn sau một chút
    setTimeout(() => {
      confetti({
        particleCount: 200,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff69b4', '#ff77ff', '#ff007f', '#ff1493']
      });

      confetti({
        particleCount: 200,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: ['#ff0000', '#ff69b4', '#ff77ff', '#ff007f', '#ff1493']
      });
    }, 500);

    setTimeout(() => {
      onLetterOpen();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-pink-50 to-white z-[100]">
      <AnimatePresence>
        {!isLetterOpen ? (
          <motion.div
            className="relative cursor-pointer group"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1 }}
            onClick={() => setIsLetterOpen(true)}
          >
            {/* Envelope */}
            <div className="w-80 h-60 bg-pink-100 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-100" />

              {/* Envelope flap */}
              <motion.div
                className="absolute top-0 left-0 w-full h-32 bg-pink-200 origin-bottom"
                initial={{ rotateX: 0 }}
                whileHover={{ rotateX: 30 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-pink-300 to-pink-200" />
              </motion.div>

              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <p className="text-2xl font-handwriting text-primary mb-2">
                    Nhấn để mở thư 💌
                  </p>
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="text-sm text-pink-600/80"
                  >
                    Click vào đây
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>
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
                Bảo Trân có yêu Tin không? 💝
              </h2>
              <div className="flex gap-4 mt-6 relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 0 }}
                  animate={yesPressed ? { y: -10, scale: 1.2 } : { y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Button
                    onClick={handleYesClick}
                    className="w-full font-handwriting text-lg bg-gradient-to-r from-pink-500 to-rose-400 shadow-lg"
                    disabled={yesPressed}
                  >
                    {yesPressed ? "❤️ Đúng vậy! ❤️" : "Có, tất nhiên rồi! ❤️"}
                  </Button>
                </motion.div>

                <motion.div
                  style={{ width: noButtonSize }}
                  animate={{
                    x: noCount % 2 === 0 ? (noCount > 0 ? 150 : 0) : -150,
                    y: noCount > 1 ? Math.sin(noCount) * 50 : 0,
                    scale: 1 - noCount * 0.05,
                    opacity: 1 - noCount * 0.1,
                  }}
                  whileHover={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  <Button
                    onClick={handleNoClick}
                    variant="outline"
                    className="w-full font-handwriting text-lg opacity-70 shadow-sm"
                    disabled={yesPressed}
                  >
                    {noCount === 0
                      ? "Không..."
                      : noCount === 1
                        ? "Thật không vậy? 🥺"
                        : noCount === 2
                          ? "Hãy suy nghĩ lại! 😥"
                          : noCount === 3
                            ? "Thử lần nữa nha... 💔"
                            : "Chắc là có đúng không? 🙏"}
                  </Button>
                </motion.div>
              </div>

              {/* Floating hearts when yes is pressed */}
              {yesPressed && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      initial={{
                        x: Math.random() * 300 - 150,
                        y: 300,
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                      }}
                      animate={{
                        y: -300,
                        opacity: [0, 1, 0],
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: Math.random() * 2 + 1,
                        delay: Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                      }}
                    >
                      {Math.random() > 0.5 ? "❤️" : "💖"}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}