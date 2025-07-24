import React from 'react';
import { content } from '../data/content';
import TypewriterText from './TypewriterText';

const profilePicJpg = new URL('../assets/profile_pic.jpg', import.meta.url).href;
const profilePicPng = new URL('../assets/profile_pic.png', import.meta.url).href;

const Hero: React.FC = () => {
  // Check if file exists (attempt to load image)
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImgSrc(profilePicJpg);
    img.onerror = () => {
      // If jpg doesn't exist, try png
      const imgPng = new window.Image();
      imgPng.onload = () => setImgSrc(profilePicPng);
      imgPng.onerror = () => setImgSrc(null);
      imgPng.src = profilePicPng;
    };
    img.src = profilePicJpg;
  }, []);

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <TypewriterText texts={content.hero.typewriterTexts} />
            </h1>
            <p className="hero-description">
              {content.hero.description}
            </p>
          </div>
          <div className="hero-image">
            {imgSrc ? (
              <img src={imgSrc} alt="Profilowe" className="profile-pic" />
            ) : (
              <div className="profile-placeholder">
                <span>AC</span>
              </div>
            )}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 