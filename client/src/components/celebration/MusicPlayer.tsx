import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const songList = [
    {
      title: "Our Song",
      url: "/music.mp3"
    }
  ];

  // Auto-play when component mounts or when letter is opened
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Set volume to 50%
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    };

    startMusic();
    
    // Listen for custom event from WelcomeLetter
    window.addEventListener('letterOpened', startMusic);
    
    return () => {
      window.removeEventListener('letterOpened', startMusic);
    };
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
        onCanPlay={(e) => e.currentTarget.play().catch(err => console.log("Autoplay prevented:", err))}
      />
      <Card className="p-3 flex items-center gap-3 bg-pink-100/90 backdrop-blur-sm shadow-lg border-pink-300 hover:bg-pink-100 transition-all duration-300">
        <div className="flex-shrink-0">
          <Music className="h-5 w-5 text-pink-500" />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-pink-700">{songList[currentSong].title}</p>
          <canvas ref={canvasRef} width="100" height="20" className="rounded-md" />
        </div>
        <Button 
          size="icon" 
          variant="outline" 
          onClick={togglePlay}
          className="h-8 w-8 rounded-full bg-pink-500 hover:bg-pink-600 border-pink-400 text-white flex-shrink-0"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </Card>
    </motion.div>
  );
}