import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>🎊 Surprise! Kusa .... 🎂🎶🥳✨</h1>
      <h2>Happy birthday maaa 🎊🎊... live long hundred years 💖</h2>
      <p>🌟 A queen was born today, and the world became brighter! 👑</p>
      <p>May your heart be as light as a balloon, your laughter as sweet as cake, and your dreams as endless as the stars! 🎈🌠</p>
      <p>✨ You are a masterpiece, painted with love and kindness. 🎨💖</p>
      <p>💌 Every moment with you is a page in the book of beautiful memories. 📖❤️</p>
      <p>Click below and let the celebration begin! 🎶🥳</p>
      
      <Link to="/quotes" className="next-button">See Quotes</Link>
    </div>
  );
};

export default Home;
