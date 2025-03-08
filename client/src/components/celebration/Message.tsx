import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import HandwritingText from "./HandwritingText";
import Fireworks from "./Fireworks"; // Assuming this component exists

interface MessageProps {
  recipient: string;
  message: string;
}

export default function Message({ recipient, message }: MessageProps) {
  const [showRecipient, setShowRecipient] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [messageComplete, setMessageComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // Sequence the animations
  useEffect(() => {
    const recipientTimer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(recipientTimer);
  }, []);

  useEffect(() => {
    if (showMessage) {
      // Calculate message duration based on length (approx. 60ms per character)
      const messageDuration = message.length * 60 + 1000;

      const messageTimer = setTimeout(() => {
        setMessageComplete(true);
        setShowStory(true);
      }, messageDuration);

      return () => clearTimeout(messageTimer);
    }
  }, [showMessage, message]);

  // Notify parent when message complete
  useEffect(() => {
    // You can dispatch an event or use a callback here if needed
    const messageCompleteEvent = new CustomEvent("messageComplete", {
      detail: { complete: messageComplete },
    });
    if (messageComplete) {
      document.dispatchEvent(messageCompleteEvent);
    }
  }, [messageComplete]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setTimeout(() => {
      setShowStory(true); // Show the story after fireworks
    }, 1000);
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="max-w-3xl mx-auto mb-12"
    >
      <Card className="p-8 bg-white/90 shadow-lg backdrop-blur-sm border-rose-200 rounded-xl">
        <AnimatePresence>
          {showRecipient && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-primary font-handwriting">
                Gửi: {recipient}
              </h2>
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
                onComplete={() => setMessageComplete(true)}
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
                text="Bé là nguồn cảm hứng, là ánh sáng rực rỡ trong cuộc đời Tin. Cảm ơn bé vì đã luôn ở bên, làm cho mỗi ngày của anh trở nên ý nghĩa và ấm áp hơn bao giờ hết."
                className="text-rose-600 font-handwriting text-lg leading-relaxed"
                charDelay={40}
              />
              <p className="text-2xl mt-6 font-handwriting text-primary">
                Yêu bé thật nhiều,
              </p>
              <p className="text-2xl font-handwriting text-primary">Tin 💖</p>
            </motion.div>
          )}
        </AnimatePresence>
        {showFireworks && <Fireworks />}
      </Card>
    </motion.div>
  );
}