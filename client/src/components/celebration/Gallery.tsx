import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Our Memories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card 
              className="overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt="Celebration moment" 
                className="w-full h-48 object-cover"
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
