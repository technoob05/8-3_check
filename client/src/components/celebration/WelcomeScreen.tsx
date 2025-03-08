import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-background/95 z-50"
    >
      <Card className="p-8 max-w-lg text-center bg-white/80 backdrop-blur-sm shadow-xl">
        <motion.div
          initial={{ scale: 0.8, rotateX: 90 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          className="transform-gpu"
        >
          <motion.h1 
            className="text-4xl font-bold text-primary mb-4"
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Chúc Mừng Ngày 8/3
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-2xl text-muted-foreground mb-2">
              Gửi đến
            </p>
            <p className="text-3xl font-semibold text-primary">
              Trương Bảo Trân
            </p>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
}