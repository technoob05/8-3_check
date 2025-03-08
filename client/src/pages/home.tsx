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
import WelcomeLetter from "@/components/celebration/WelcomeLetter";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);

  useEffect(() => {
    if (letterOpened) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setShowContent(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [letterOpened]);

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

      <AnimatePresence>
        {!letterOpened && (
          <WelcomeLetter onLetterOpen={() => setLetterOpened(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {letterOpened && showWelcome && <WelcomeScreen />}
      </AnimatePresence>

      <AnimatePresence>
        {letterOpened && showContent && (
          <>
            <GuideCharacter />
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
                recipient="Bé Bảo Trân"
                message="Chúc em một ngày 8/3 thật hạnh phúc và tràn ngập niềm vui. Em là điều tuyệt vời nhất đến với cuộc sống của anh. Cảm ơn em vì đã luôn là người phụ nữ tuyệt vời nhất."
              />

              <Gallery
                images={[
                  "/1.jpg",
                  "/2.png",
                  "/3.jpg",
                  "/5.png",
                  "/6.png",
                  "/7.jpg",
                  "/8.jpg",
                ]}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
