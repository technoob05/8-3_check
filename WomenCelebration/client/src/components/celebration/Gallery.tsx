import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery() {
  const [activeStory, setActiveStory] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Story data with images and captions
  const stories = [
    {
      image: "/1.jpg",
      caption: "Lần đầu tiên chụp hình một cặp với Bé nè",
      date: "Kỷ niệm đầu tiên",
    },
    {
      image: "/2.png",
      caption: "Lần đầu tiên đi date với nhau nè",
      date: "Ngày đáng nhớ",
    },
    {
      image: "/3.jpg",
      caption: "Lần đầu tiên đi sinh nhật của Bé nè",
      date: "Sinh nhật đặc biệt",
    },
    {
      image: "/5.png",
      caption: "Hai ta Đi chơi Tết cùng nhau",
      date: "Tết đoàn viên",
    },
    {
      image: "/6.png",
      caption: "Sinh nhật của Bé gần đây nhất nè ",
      date: "Tuổi mới, hạnh phúc mới",
    },
    {
      image: "/7.jpg",
      caption: "Sinh nhật của Tin gần nhất lun hehe",
      date: "Hạnh phúc bên nhau",
    },
    {
      image: "/8.jpg",
      caption: "Chúc mừng ngày 8/3 Bé yêu của Tin",
      date: "Từ Tin Tin với tất cả yêu thương ",
    },
  ];

  // Auto advance story every 5 seconds
  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        setActiveStory((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
      }, 6000);
    }

    return () => clearInterval(timer);
  }, [autoplay, stories.length]);

  // Story navigation
  const goToNextStory = () => {
    setActiveStory((prev) => (prev < stories.length - 1 ? prev + 1 : 0));
  };

  const goToPrevStory = () => {
    setActiveStory((prev) => (prev > 0 ? prev - 1 : stories.length - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full my-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Câu Chuyện Yêu Thương
      </h2>

      {/* Story view for both desktop and mobile */}
      <div className="w-full max-w-3xl mx-auto px-4 relative">
        <div className="story-progress-bar flex w-full mb-2">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 mx-1 rounded-full ${index <= activeStory ? "bg-pink-500" : "bg-gray-300"}`}
              onClick={() => setActiveStory(index)}
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden shadow-2xl aspect-[3/4] mx-auto"
            style={{ maxHeight: "70vh" }}
          >
            <img
              src={stories[activeStory].image}
              alt={stories[activeStory].caption}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="text-sm font-medium text-pink-300 mb-1">
                {stories[activeStory].date}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {stories[activeStory].caption}
              </h3>
            </div>

            {/* Story navigation controls */}
            <button
              onClick={goToPrevStory}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-colors"
            >
              ←
            </button>
            <button
              onClick={goToNextStory}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-colors"
            >
              →
            </button>

            {/* Autoplay toggle */}
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`absolute top-3 right-3 p-2 rounded-full ${autoplay ? "bg-pink-500" : "bg-gray-400"} text-white text-xs`}
            >
              {autoplay ? "∞" : "❙❙"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
