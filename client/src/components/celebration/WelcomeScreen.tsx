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
      <Card className="p-8 max-w-lg text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            Happy Women's Day
          </h1>
          <p className="text-2xl text-muted-foreground">
            Trương Bảo Trân
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
