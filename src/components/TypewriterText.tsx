import React from 'react';

interface TypewriterTextProps {
  texts: string[];
  initialDelay?: number; // ms
  typingSpeed?: number; // ms
  pauseBetween?: number; // ms
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  initialDelay = 1700,
  typingSpeed = 40,
  pauseBetween = 1800,
  className = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [showCursor, setShowCursor] = React.useState(true);

  const [measuredHeight, setMeasuredHeight] = React.useState<number | undefined>(undefined);
  const isInitialDone = React.useRef(false);
  const isAnimating = React.useRef(false);
  const intervalRef = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);

  // Function to start animation
  const startTypewriter = React.useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setShowCursor(true);
    setIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((prev) => {
        if (prev < texts[currentTextIndex].length) {
          return prev + 1;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setShowCursor(true); // Cursor blinks even after typing text
          isInitialDone.current = true;
          isAnimating.current = false;
          // After animation ends, wait and move to next text
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = window.setTimeout(() => {
            setCurrentTextIndex((prevIdx) => (prevIdx + 1) % texts.length);
          }, pauseBetween);
          return prev;
        }
      });
    }, typingSpeed);
  }, [texts, currentTextIndex, typingSpeed, pauseBetween]);

  // Animation on text change
  React.useEffect(() => {
    setIndex(0);
    setShowCursor(true);
    isAnimating.current = false;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Initial delay only for the first text
    const delay = setTimeout(() => {
      startTypewriter();
    }, currentTextIndex === 0 ? initialDelay : 300);
    return () => {
      clearTimeout(delay);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowCursor(true);
    };
  }, [texts, currentTextIndex, startTypewriter, initialDelay]);

  // Measure text height before animation
  React.useEffect(() => {
    if (measureRef.current) {
      setMeasuredHeight(measureRef.current.offsetHeight);
    }
  }, [currentTextIndex, texts]);

  return (
    <span
      className={`navbar-logo-typewriter ${className}`}
      style={{
        display: 'block',
        minHeight: measuredHeight ? measuredHeight + 'px' : undefined,
        maxHeight: measuredHeight ? measuredHeight + 'px' : undefined,
        transition: 'min-height 0.2s, max-height 0.2s',
        overflow: 'hidden',
      }}
    >
      {/* Hidden span for height measurement */}
      <span
        ref={measureRef}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
          whiteSpace: 'pre-line',
          width: '100%',
        }}
      >
        {texts[currentTextIndex]}
      </span>
      {/* Animated text */}
      {index > 0 ? texts[currentTextIndex].slice(0, index) : ''}
      <span
        className={'typewriter-cursor'}
        style={{
          visibility: showCursor ? 'visible' : 'hidden',
          marginLeft: 0,
        }}
      />
    </span>
  );
};

export default TypewriterText; 