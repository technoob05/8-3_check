import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="mt-12">
      <motion.h2 
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Khoảnh Khắc Yêu Thương
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100 
            }}
          >
            <Card 
              className="overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedImage(image)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <img 
                  src={image} 
                  alt="Khoảnh khắc đáng nhớ" 
                  className="w-full h-48 object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl mx-auto"
            >
              <motion.img 
                src={selectedImage} 
                alt="Phóng to" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                layoutId={`image-${selectedImage}`}
              />
              <motion.button
                className="absolute top-4 right-4 text-white text-xl bg-black/50 w-10 h-10 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}