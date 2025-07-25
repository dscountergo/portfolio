import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  // Preload images to prevent flickering
  React.useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextPopupImage = () => {
    setPopupIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevPopupImage = () => {
    setPopupIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openPopup = () => {
    setPopupIndex(currentIndex);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="project-image">
        <div className="project-placeholder">
          <span>No images available</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="project-image-gallery"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="gallery-container">
          <div className="gallery-image-wrapper" onClick={openPopup}>
            <img 
              src={images[currentIndex]} 
              alt={`${alt} - Image ${currentIndex + 1}`}
              className="gallery-main-image"
            />
            <div className="gallery-blur-background" style={{
              backgroundImage: `url(${images[currentIndex]})`
            }}></div>
          </div>
          
          {images.length > 1 && (
            <>
              <button 
                className={`gallery-nav-btn gallery-nav-btn-left ${isHovered ? 'visible' : ''}`}
                onClick={prevImage}
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                className={`gallery-nav-btn gallery-nav-btn-right ${isHovered ? 'visible' : ''}`}
                onClick={nextImage}
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className={`gallery-indicators ${isHovered ? 'visible' : ''}`}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`gallery-indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {isPopupOpen && ReactDOM.createPortal(
        <div className="gallery-popup-overlay" onClick={closePopup}>
          <div className="gallery-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-popup-close" onClick={closePopup}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="gallery-popup-image-container">
              <img 
                src={images[popupIndex]} 
                alt={`${alt} - Full size image ${popupIndex + 1}`}
                className="gallery-popup-image"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    className="gallery-popup-nav-btn gallery-popup-nav-btn-left"
                    onClick={prevPopupImage}
                    aria-label="Previous image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <button 
                    className="gallery-popup-nav-btn gallery-popup-nav-btn-right"
                    onClick={nextPopupImage}
                    aria-label="Next image"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <div className="gallery-popup-indicators">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`gallery-popup-indicator ${index === popupIndex ? 'active' : ''}`}
                        onClick={() => setPopupIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ImageGallery; 