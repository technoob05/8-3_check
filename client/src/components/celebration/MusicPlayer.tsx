import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3"
        loop
      />
      <Button
        variant="outline"
        size="icon"
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
        onClick={togglePlay}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}
