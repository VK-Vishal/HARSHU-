import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Gallery.css";

// Dynamically import all images from src/photos
function importAll(r) {
  return r.keys().map((key) => r(key));
}

const imagesContext = require.context("../photos", false, /\.(jpg)$/);
const images = importAll(imagesContext);

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500); // Adjusted to ~3.5 seconds per image

    return () => clearInterval(interval);
  }, []);

  const handleImageError = () => {
    console.error(`Failed to load image at index: ${currentIndex}`);
    setImageError(`Image ${currentIndex + 1} failed to load`);
  };

  return (
    <div className="gallery-container">
      <h1>❤️📸Ur Nayiii💖💞</h1>
      <div className="floating-hearts"></div>

      {/* Debugging Info */}
      {imageError && (
        <div style={{ color: "red", position: "absolute", top: "10px", left: "10px" }}>
          {imageError} - Check console for details
        </div>
      )}

      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Memory ${currentIndex + 1}`}
        className="gallery-image beat-effect"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 1 }}
        onError={handleImageError}
        onLoad={() => setImageError(null)}
      />

      <Link to="/" className="next-button">Back❤️</Link>
    </div>
  );
};

export default Gallery;