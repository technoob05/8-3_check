import { motion } from "framer-motion";

export default function HeartAnimation() {
  return (
    <div className="fixed top-4 right-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="text-primary text-4xl"
      >
        ❤️
      </motion.div>
    </div>
  );
}
