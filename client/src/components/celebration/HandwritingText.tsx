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
