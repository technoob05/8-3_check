import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HandwritingTextProps {
  text: string;
  className?: string;
  charDelay?: number;
  onComplete?: () => void;
}

export default function HandwritingText({
  text,
  className = "",
  charDelay = 50,
  onComplete,
}: HandwritingTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (visibleChars < text.length) {
      const timer = setTimeout(() => {
        setVisibleChars(visibleChars + 1);
      }, charDelay);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete && onComplete();
    }
  }, [visibleChars, text, charDelay, isComplete, onComplete]);

  return (
    <span className={`${className} inline-block`}>
      <AnimatePresence>
        {text.split("").map((char, index) => (
          index < visibleChars && (
            <motion.span
              key={index}
              initial={{ 
                opacity: 0, 
                y: 10,
                rotateZ: Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1)
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateZ: 0
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              style={{ 
                display: "inline-block",
                transformOrigin: "bottom center"
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          )
        ))}
      </AnimatePresence>
    </span>
  );
}