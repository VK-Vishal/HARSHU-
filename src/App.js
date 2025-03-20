import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Quotes from "./pages/Quotes";
import Gallery from "./pages/Gallery";
import song from "./assets/final.mp3";
import './App.css';

function App() {
  const [audio] = useState(new Audio(song));
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [playAttempted, setPlayAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleLoadedData = () => {
      console.log('Audio metadata loaded successfully');
      setIsAudioReady(true);
    };

    const handleError = (e) => {
      const error = e.target.error;
      let message = 'Unknown audio error';
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            message = 'Audio loading aborted';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            message = 'Network error while loading audio';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            message = 'Audio decoding error';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message = 'Audio source not supported or file not found';
            break;
          default:
            message = 'Unknown audio error';
            break
        }
      }
      console.error('Audio loading error:', message, error);
      setErrorMessage(message);
    };

    const handleCanPlay = () => {
      console.log('Audio can play');
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audio]);

  useEffect(() => {
    if (isAudioReady && !playAttempted) {
      audio.loop = true;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
            setPlayAttempted(true);
            setErrorMessage('');
          })
          .catch((error) => {
            console.error('Audio playback failed:', error.message);
            setPlayAttempted(true);
            setErrorMessage('Click anywhere to start the birthday song');
          });
      }
    }
  }, [isAudioReady, audio, playAttempted]);

  const handlePageClick = () => {
    if (!audio.paused) return;
    audio.play()
      .then(() => {
        console.log('Audio started after page click');
        setPlayAttempted(true);
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Playback after click failed:', error.message);
        setErrorMessage('Playback failed - check audio file or browser settings');
      });
  };

  return (
    <Router>
      <div onClick={handlePageClick}>
        {errorMessage && (
          <div
            style={{
              position: 'fixed',
              top: '10px',
              left: '10px',
              zIndex: 1000,
              color: 'white',
              background: 'rgba(30, 144, 255, 0.8)',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {errorMessage}
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wish" element={<Quotes />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;