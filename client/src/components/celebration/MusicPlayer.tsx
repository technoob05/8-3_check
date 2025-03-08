import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const songList = [
  {
    title: "Our Song",
    url: "/music.mp3"
  }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
  const [currentSong, setCurrentSong] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Auto-play prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !audioContext) {
      const context = new AudioContext();
      const analyserNode = context.createAnalyser();
      setAudioContext(context);
      setAnalyser(analyserNode);

      if (audioRef.current) {
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(analyserNode);
        analyserNode.connect(context.destination);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && analyser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const animate = () => {
        if (!isPlaying) return;

        requestAnimationFrame(animate);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArray.length) * 2.5;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = dataArray[i] / 2;

          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, '#FF69B4');
          gradient.addColorStop(1, '#FFB6C1');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      };

      animate();
    }
  }, [isPlaying, analyser]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
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
        src={songList[currentSong].url}
        loop
      />

      <div className="relative">
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

        {isPlaying && (
          <canvas
            ref={canvasRef}
            width="200"
            height="60"
            className="absolute -top-16 right-0 opacity-70"
          />
        )}
      </div>
    </motion.div>
  );
}