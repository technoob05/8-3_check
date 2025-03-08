import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import HandwritingText from "./HandwritingText";

interface WelcomeLetterProps {
  onLetterOpen: () => void;
}

export default function WelcomeLetter({ onLetterOpen }: WelcomeLetterProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(100); // Initialize button size
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [letterClicked, setLetterClicked] = useState(false);

  const handleNoClick = () => {
    setNoCount((prevCount) => prevCount + 1);
    setNoButtonSize(Math.max(60, noButtonSize - 5));

    // Move the No button to a random position that doesn't overlap with the Yes button
    const newX = Math.random() > 0.5 ? Math.random() * 180 : -Math.random() * 180;
    const newY = Math.random() > 0.5 ? Math.random() * 80 : -Math.random() * 80;
    setNoButtonPosition({ x: newX, y: newY });

    // Play different sounds for each No click
    const sounds = ['/no-sound1.mp3', '/no-sound2.mp3', '/no-sound3.mp3'];
    const audio = new Audio(sounds[noCount % sounds.length]);
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Auto-play prevented:', e));

    // Subtle vibration effect
    window.navigator.vibrate && window.navigator.vibrate(100);
  };

  const handleYesClick = () => {
    setYesPressed(true);

    // Play happy sound when Yes is clicked
    const audio = new Audio('/yes-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Auto-play prevented:', e));

    setTimeout(() => {
      setIsLetterOpen(true);
    }, 500);
  };

  const handleLetterClick = () => {
    setLetterClicked(true);
    setTimeout(() => {
      onLetterOpen();
    }, 1000);
  };

  // Get increasingly persuasive "No" texts
  const getNoButtonText = () => {
    const texts = [
      "Không",
      "Thật sự không?",
      "Chắc chưa?",
      "Một lần nữa thôi?",
      "Nghĩ lại đi!",
      "Đừng mà!",
      "Nhấn nhầm rồi phải không?",
      "Thử lại!",
      "Sao lại không chứ?",
      "Tin là buồn lắm đó!"
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-pink-50/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!isLetterOpen ? (
        <Card className="p-8 max-w-md text-center bg-white shadow-xl rounded-xl">
          <motion.h2
            className="text-3xl font-bold mb-6 text-rose-500 font-handwriting"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Bé Bảo Trân có muốn mở thư không?
          </motion.h2>

          <div className="relative flex justify-center gap-6 mt-8">
            {/* No button first */}
            <motion.button
              className="px-6 py-3 bg-gray-200 rounded-full text-gray-700 font-medium shadow-md hover:bg-gray-300 transition-all"
              style={{ 
                width: `${noButtonSize}px`,
              }}
              animate={{ 
                x: noButtonPosition.x,
                y: noButtonPosition.y,
                scale: noCount > 0 ? [1, 0.9, 1] : 1,
              }}
              transition={{ 
                type: "spring",
                damping: 10,
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
              onClick={handleNoClick}
            >
              {getNoButtonText()}
            </motion.button>

            {/* Yes button */}
            <motion.button
              className="px-6 py-3 bg-rose-500 text-white rounded-full font-medium shadow-md hover:bg-rose-600 transition-all"
              animate={yesPressed ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              } : {}}
              whileHover={{ scale: 1.1 }}
              onClick={handleYesClick}
            >
              Có chứ!
            </motion.button>
          </div>
        </Card>
      ) : (
        <motion.div
          className="p-6 max-w-md rounded-lg bg-pink-100 shadow-2xl cursor-pointer overflow-hidden"
          initial={{ scale: 0, rotate: -5 }}
          animate={{ 
            scale: 1, 
            rotate: letterClicked ? [-5, 5, -3, 0] : -5,
            y: letterClicked ? [0, -20, 0] : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 10 
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          onClick={handleLetterClick}
        >
          {!letterClicked ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💌</span>
                </div>
              </div>
              <HandwritingText
                text="Nhấn vào để mở thư..."
                className="text-2xl text-center font-handwriting text-rose-600"
                charDelay={80}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <HandwritingText
                text="Đang mở thư..."
                className="text-2xl text-center font-handwriting text-rose-600"
                charDelay={80}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}