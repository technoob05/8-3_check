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
              message="On this special Women's Day, I want to celebrate you and everything you mean to me. Your presence in my life makes every day brighter and more meaningful."
            />

            <Gallery 
              images={[
                "https://images.unsplash.com/photo-1598609344624-2454d4dbf40c",
                "https://images.unsplash.com/photo-1594267329747-06924aa14b93",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176",
                "https://images.unsplash.com/photo-1517867065801-e20f409696b0"
              ]} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
