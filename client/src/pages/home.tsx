import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/celebration/WelcomeScreen";
import Gallery from "@/components/celebration/Gallery";
import Message from "@/components/celebration/Message";
import ParticleBackground from "@/components/celebration/ParticleBackground";
import HeartAnimation from "@/components/celebration/HeartAnimation";
import MusicPlayer from "@/components/celebration/MusicPlayer";
import Fireworks from "@/components/celebration/Fireworks";
import HandwritingText from "@/components/celebration/HandwritingText";
import GuideCharacter from "@/components/celebration/GuideCharacter";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotateX: 90,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: -90,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden perspective-1000">
      <ParticleBackground />
      <Fireworks />
      <GuideCharacter />

      <AnimatePresence>
        {showWelcome && <WelcomeScreen />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="container mx-auto px-4 py-8"
          >
            <HeartAnimation />
            <MusicPlayer />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-8"
            >
              <HandwritingText
                text="Gửi đến người con gái anh yêu"
                className="text-2xl text-primary font-semibold mb-4"
              />
            </motion.div>

            <Message 
              recipient="Trương Bảo Trân"
              message="Chúc em một ngày 8/3 thật hạnh phúc và tràn ngập niềm vui. Em là điều tuyệt vời nhất đến với cuộc sống của anh. Cảm ơn em vì đã luôn là người phụ nữ tuyệt vời nhất."
            />

            <Gallery 
              images={[
                "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3",
                "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3",
                "https://images.unsplash.com/photo-1517867065801-e20f409696b0?ixlib=rb-4.0.3"
              ]} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}