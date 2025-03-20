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

// Videos still use public folder paths
const videos = Array.from({ length: 7 }, (_, i) => `/videos/v${i + 1}.mp4`);

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideos, setShowVideos] = useState(false);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 1 === images.length) {
          setShowVideos(true);
          clearInterval(interval);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 3500); // Adjusted to ~1.74 seconds per image

    return () => clearInterval(interval);
  }, []);

  const handleImageError = (e) => {
    console.error(`Failed to load image at index: ${currentIndex}`);
    setImageError(`Image ${currentIndex + 1} failed to load`);
  };

  return (
    <div className="gallery-container">
      <h1>❤️📸Ur Nayiii💓💞</h1>
      <div className="floating-hearts"></div>

      {/* Debugging Info */}
      {imageError && (
        <div style={{ color: "red", position: "absolute", top: "10px", left: "10px" }}>
          {imageError} - Check console for details
        </div>
      )}

      {!showVideos ? (
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Memory ${currentIndex + 1}`}
          className="gallery-image beat-effect"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1 }} // Reduced to match faster interval
          onError={handleImageError}
          onLoad={() => setImageError(null)}
        />
      ) : (
        <div className="video-gallery">
          {videos.map((video, index) => (
            <motion.video
              key={index}
              controls
              className="gallery-video beat-effect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              onError={(e) => console.error(`Failed to load video: ${video}`)}
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          ))}
        </div>
      )}
      <Link to="/" className="next-button">Back❤️</Link>
    </div>
  );
};

export default Gallery;