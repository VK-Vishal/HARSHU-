import { Link } from "react-router-dom";
import "../styles/Quotes.css";

const quotes = [
  "A sister is a little bit of childhood that can never be lost. 🌈",
  "Sisters are different flowers from the same garden. 🌸🌼",
  "A sister is both your mirror and your opposite. 🪞❤️",
  "Happiness is having a sister who is also your best friend. 😊👭",
  "Sisters are like stars; you may not always see them, but you know they’re always there. ⭐✨",
  "Having a sister means you always have a backup. 💪💖",
  "Sisters are angels who lift us up when our wings forget how to fly. 👼🕊️",
  "Sisters make the best friends in the world. 🌍💕",
  "No matter where life takes us, we will always be sisters at heart. 💞🌏",
  "A sister’s love is forever and unconditional. 💖🌟",
  "Sisters may drive you crazy, get into your stuff, and irritate you. However, if anyone else dares say so, a sister will defend you to the death. 😜🛡️",
  "Side by side or miles apart, sisters will always be connected by the heart. ❤️🌐",
  // Additional lovable quotes
  "A sister is a gift to the heart, a friend to the spirit. 🎁💖",
  "Sisters share a bond that transcends time and distance; it’s a love that lasts forever. ⏳💕",
  "In the cookie of life, sisters are the chocolate chips that make everything sweeter. 🍪🍫",
  "A sister’s hug lasts long after she lets go. 🤗💞",
  "Sisters are like glue; they hold everything together even when times are tough. 🥰🧩",
  "With a sister by your side, every moment becomes a cherished memory. 📸💗"
];


// Function to generate non-overlapping random positions
const generatePositions = (count) => {
  let positions = [];

  for (let i = 0; i < count; i++) {
    let overlap = true;
    
    while (overlap) {
      let newPos = {
        top: `${Math.random() * 80 + 10}%`,  // Random Y position
        left: `${Math.random() * 80 + 10}%` // Random X position
      };

      overlap = positions.some(pos => 
        Math.abs(parseFloat(pos.top) - parseFloat(newPos.top)) < 10 &&
        Math.abs(parseFloat(pos.left) - parseFloat(newPos.left)) < 10
      );

      if (!overlap) {
        positions.push(newPos);
      }
    }
  }

  return positions;
};

const Quotes = () => {
  const positions = generatePositions(quotes.length);

  return (
    <div className="quotes-container">
      <h1>💖 Bangaraaaa..💞😘</h1>
      {quotes.map((quote, index) => (
        <div key={index} className="quote-box" style={positions[index]}>
          {quote}
        </div>
      ))}
      <Link to="/gallery" className="next-button">See Memories</Link>
    </div>
  );
};

export default Quotes;
