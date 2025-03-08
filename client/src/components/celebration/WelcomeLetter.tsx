
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';

interface WelcomeLetterProps {
  onLetterOpen: () => void;
}

export default function WelcomeLetter({ onLetterOpen }: WelcomeLetterProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(100); // Initialize button size
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const handleNoClick = () => {
    setNoCount((prevCount) => prevCount + 1);
    setNoButtonSize(Math.max(60, noButtonSize - 5));
    
    // Cập nhật vị trí ngẫu nhiên và đảm bảo không đè lên nút Yes
    // Lấy vị trí xa hơn khỏi trung tâm
    const newX = Math.random() > 0.5 ? Math.random() * 180 : -Math.random() * 180;
    const newY = Math.random() > 0.5 ? Math.random() * 80 : -Math.random() * 80;
    setNoButtonPosition({ x: newX, y: newY });

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
    
    // Phát âm thanh chúc mừng khi nhấn "Có"
    const audio = new Audio('/yes-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Auto-play prevented:', e));
    
    // Hiệu ứng confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setTimeout(() => {
      setIsLetterOpen(true);
      setTimeout(() => {
        onLetterOpen();
      }, 1000);
    }, 1500);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Thật không vậy? 🥺",
      "Suy nghĩ lại đi... 😢",
      "Chắc chưa? 😭",
      "Em không thích anh sao? 💔",
      "Em không cảm thấy vậy sao? 😔",
      "Em không yêu anh à? 😞",
      "Chắc chưa? 🥺",
      "Đừng lừa dối trái tim em 💔",
      "Thật không vậy? 😭",
      "Trái tim em đau quá 💔",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50 z-50"
    >
      {isLetterOpen ? (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLetterOpen}
            className="cursor-pointer relative max-w-md mx-auto"
          >
            <div className="relative">
              {/* Letter envelope */}
              <motion.div
                className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl shadow-xl p-10 border-2 border-pink-200 relative z-0"
                initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Heart decoration */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ❤️
                </motion.div>

                {/* Envelope flap */}
                <motion.div
                  className="absolute left-0 right-0 h-16 top-0 rounded-t-xl z-10"
                  initial={{ rotateX: 0 }}
                  whileHover={{ rotateX: 40 }}
                  style={{ transformOrigin: "top", perspective: "1000px" }}
                >
                  <div className="h-full w-full bg-gradient-to-b from-pink-100 to-pink-200" />
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
              </motion.div>
            </div>
          </motion.div>
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
            <div className="flex gap-4 mt-6 relative justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 0 }}
                animate={yesPressed ? { y: -10, scale: 1.2 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="z-20"
              >
                <button
                  onClick={handleYesClick}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
                >
                  Có 💖
                </button>
              </motion.div>

              <motion.div
                style={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                className="z-10 absolute"
                whileHover={{
                  scale: 0.9,
                }}
                onHoverStart={() => {
                  setHoverCount(hoverCount + 1);
                  if (hoverCount > 2) {
                    // Move button if user tries to hover too many times
                    const newX = Math.random() > 0.5 ? Math.random() * 200 : -Math.random() * 200;
                    const newY = Math.random() > 0.5 ? Math.random() * 100 : -Math.random() * 100;
                    setNoButtonPosition({ x: newX, y: newY });
                  }
                }}
              >
                <button
                  onClick={handleNoClick}
                  style={{
                    fontSize: `${Math.max(12, 16 - noCount)}px`,
                    opacity: Math.max(0.5, 1 - noCount * 0.1),
                  }}
                  className="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-medium shadow-md hover:bg-gray-300 transition-all duration-200 whitespace-nowrap"
                >
                  {getNoButtonText()}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
