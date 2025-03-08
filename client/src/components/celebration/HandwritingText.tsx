import { motion } from 'framer-motion';

interface HandwritingTextProps {
  text: string;
  className?: string;
}

export default function HandwritingText({ text, className = '' }: HandwritingTextProps) {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.p className={`font-handwriting ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HandwritingTextProps {
  text: string;
  className?: string;
  charDelay?: number;
}

export default function HandwritingText({
  text,
  className = "",
  charDelay = 50,
}: HandwritingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, charDelay);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [text, currentIndex, charDelay]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <p>{displayedText}</p>
      {!isComplete && (
        <motion.span
          className="inline-block h-4 w-0.5 bg-primary ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
      )}
    </div>
  );
}
