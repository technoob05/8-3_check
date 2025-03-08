import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface GuideMessage {
  id: number;
  text: string;
  position: { x: number; y: number };
}

export default function GuideCharacter() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentMessage, setCurrentMessage] = useState<GuideMessage | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const messages: GuideMessage[] = [
    { id: 1, text: "Chào em! Em đã sẵn sàng cho một ngày đặc biệt chưa? ✨", position: { x: 50, y: 100 } },
    { id: 2, text: "Hãy cùng khám phá những điều bất ngờ anh đã chuẩn bị nhé! 💝", position: { x: 50, y: 150 } },
    { id: 3, text: "Nhấn vào các bông hoa để tìm thấy những lời nhắn yêu thương 🌸", position: { x: 50, y: 200 } },
  ];

  // Animation cho nhân vật bay lượn
  const floatingAnimation = {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Di chuyển nhân vật theo thời gian
  useEffect(() => {
    const interval = setInterval(() => {
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 100);
      setPosition({ x: newX, y: newY });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        className="fixed z-50"
        animate={{
          x: position.x,
          y: position.y,
          ...floatingAnimation
        }}
        transition={{
          x: { duration: 2, ease: "easeInOut" },
          y: { duration: 2, ease: "easeInOut" }
        }}
      >
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])}
        >
          {/* Nhân vật tiên nữ sử dụng emoji */}
          <span className="text-4xl">🧚‍♀️</span>
          
          {/* Hiệu ứng lấp lánh xung quanh */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {currentMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl"
              style={{ minWidth: "200px" }}
            >
              <p className="text-sm font-handwriting text-primary">{currentMessage.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Intro popup */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl z-50"
          >
            <p className="text-lg font-handwriting text-primary mb-4">
              Xin chào! Mình là tiên nữ sẽ dẫn em đi khám phá những điều tuyệt vời hôm nay! 💕
            </p>
            <Button
              className="w-full font-handwriting"
              onClick={() => setShowIntro(false)}
            >
              Bắt đầu thôi! ✨
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
