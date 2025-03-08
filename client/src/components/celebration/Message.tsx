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
      <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur transform hover:scale-105 transition-transform duration-300">
        <CardContent className="p-6">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-4 relative font-handwriting">
              Gửi {recipient} yêu quý,
              <motion.span
                className="absolute -top-1 -right-4 text-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                💝
              </motion.span>
            </h2>
          </motion.div>
          <motion.p
            className="text-lg leading-relaxed text-foreground font-handwriting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Nhân ngày Quốc tế Phụ nữ, Tin muốn gửi đến bé những lời chúc tốt đẹp
            nhất.</p>
          <HandwritingText
            text="Bé là nguồn cảm hứng và niềm hạnh phúc của cuộc đời Tin. Cảm
            ơn bé đã luôn ở bên Tin và làm cho cuộc sống của anh trở nên tuyệt
            vời hơn mỗi ngày."
            className="text-rose-600 font-handwriting text-lg mt-4 leading-relaxed"
            charDelay={40}
          />
          <p className="text-2xl mt-6 font-handwriting text-primary">Mãi Yêu Bé ❤️
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
