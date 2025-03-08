import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HandwritingTextProps {
  text: string;
  className?: string;
  charDelay?: number;
  onComplete?: () => void;
}

export default function HandwritingText({ 
  text, 
  className = "", 
  charDelay = 100,
  onComplete
}: HandwritingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, charDelay);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, charDelay, onComplete]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{ display: currentIndex < text.length ? 'inline-block' : 'none' }}
      >
        |
      </motion.span>
    </motion.div>
  );
}