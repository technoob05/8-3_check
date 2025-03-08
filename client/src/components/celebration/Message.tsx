import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface MessageProps {
  recipient: string;
  message: string;
}

export default function Message({ recipient, message }: MessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="my-12"
    >
      <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Dear {recipient},
          </h2>
          <p className="text-lg leading-relaxed text-foreground">
            {message}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
