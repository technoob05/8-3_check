import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/celebration/WelcomeScreen";
import Gallery from "@/components/celebration/Gallery";
import Message from "@/components/celebration/Message";
import ParticleBackground from "@/components/celebration/ParticleBackground";
import HeartAnimation from "@/components/celebration/HeartAnimation";

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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ParticleBackground />

      <AnimatePresence>
        {showWelcome && <WelcomeScreen />}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="container mx-auto px-4 py-8"
          >
            <HeartAnimation />

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