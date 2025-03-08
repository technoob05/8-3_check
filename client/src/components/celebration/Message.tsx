
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import HandwritingText from "./HandwritingText";

interface MessageProps {
  recipient: string;
  message: string;
}

export default function Message({ recipient, message }: MessageProps) {
  const [showRecipient, setShowRecipient] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    const recipientTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    const messageTimer = setTimeout(() => {
      setShowStory(true);
    }, 6000);

    return () => {
      clearTimeout(recipientTimer);
      clearTimeout(messageTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg border-pink-200 overflow-hidden">
        <div className="space-y-4">
          <AnimatePresence>
            {showRecipient && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <HandwritingText
                  text={`Gửi ${recipient}`}
                  className="text-2xl font-handwriting text-primary"
                  charDelay={80}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4"
              >
                <HandwritingText
                  text={message}
                  className="text-xl font-handwriting text-rose-600 leading-relaxed"
                  charDelay={60}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showStory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 space-y-6"
              >
                <HandwritingText
                  text="Bé là nguồn cảm hứng và niềm hạnh phúc của cuộc đời Tin. Cảm ơn bé đã luôn ở bên Tin và làm cho cuộc sống của anh trở nên tuyệt vời hơn mỗi ngày."
                  className="text-rose-600 font-handwriting text-lg leading-relaxed"
                  charDelay={40}
                />
                <p className="text-2xl mt-6 font-handwriting text-primary">
                  Yêu em,
                </p>
                <p className="text-2xl font-handwriting text-primary">
                  Tin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
