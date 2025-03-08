import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Gallery() {
  // Make sure to use the correct paths to images
  const images = [
    '/1.png',
    '/2.jpg',
    '/3.jpg',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full my-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Khoảnh Khắc Yêu Thương</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <img 
              src={src} 
              alt={`Khoảnh khắc đáng nhớ ${index + 1}`} 
              className="w-full h-64 object-cover hover:opacity-90 transition-opacity" 
            />
          </motion.div>
        ))}
      </div>

      {/* Alternative carousel view for mobile */}
      <div className="md:hidden mt-8">
        <Carousel className="w-full max-w-md mx-auto">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img 
                    src={src} 
                    alt={`Khoảnh khắc đáng nhớ ${index + 1}`} 
                    className="w-full h-64 object-cover rounded-lg shadow-md" 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      </div>
    </motion.div>
  );
}