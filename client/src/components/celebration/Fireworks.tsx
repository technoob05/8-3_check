import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FireworkProps {
  color: string;
  x: number;
  y: number;
}

function Firework({ color, x, y }: FireworkProps) {
  const particles = Array.from({ length: 12 });
  
  return (
    <motion.div
      className="absolute"
      initial={{ x, y }}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            backgroundColor: color,
            rotate: (i * 360) / particles.length 
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.cos((i * 360) / particles.length) * 50],
            y: [0, Math.sin((i * 360) / particles.length) * 50],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<FireworkProps[]>([]);
  const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493'];

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight / 2);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      setFireworks(prev => [...prev, { x, y, color }]);
      
      // Remove old fireworks
      setTimeout(() => {
        setFireworks(prev => prev.slice(1));
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map((fw, i) => (
        <Firework key={i} {...fw} />
      ))}
    </div>
  );
}
