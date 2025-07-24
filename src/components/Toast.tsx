import React, { useEffect, useRef, useState } from 'react';

const TOAST_DURATION = 4500; // czas trwania komunikatu w ms

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 600;

const Toast: React.FC<ToastProps> = ({ message, visible, onClose, duration = TOAST_DURATION }) => {
  const [anim, setAnim] = useState(false);
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(isMobile());
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setAnim(false); // reset
      if (barRef.current) {
        barRef.current.style.transition = 'none';
        barRef.current.style.width = '100%';
      }
      setTimeout(() => {
        setAnim(true);
        if (barRef.current) {
          barRef.current.style.transition = `width ${duration}ms linear`;
          barRef.current.style.width = '0%';
        }
      }, 20);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setAnim(false);
      setShow(false);
      if (barRef.current) {
        barRef.current.style.transition = 'none';
        barRef.current.style.width = '100%';
      }
    }
  }, [visible, duration, onClose]);

  if (!visible && !show) return null;

  const containerStyle = mobile
    ? {
        position: 'fixed' as const,
        bottom: 10,
        left: 0,
        right: 0,
        width: '100vw',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none' as const,
        alignItems: 'flex-end',
        minWidth: 0,
        maxWidth: '100vw',
        padding: 0,
      }
    : {
        position: 'fixed' as const,
        bottom: 24,
        right: 24,
        width: 'auto',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
        pointerEvents: 'none' as const,
        alignItems: 'flex-end',
        minWidth: 0,
        maxWidth: '100vw',
      };

  const toastStyle = mobile
    ? {
        background: 'rgba(40,40,40,0.97)',
        color: '#fff',
        borderRadius: 3,
        padding: '0.22rem 0.5rem 0.38rem 0.5rem',
        margin: '0.04rem',
        fontSize: '0.85rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.13)',
        border: '1px solid #ff8c42',
        pointerEvents: 'auto' as const,
        fontWeight: 500,
        letterSpacing: 0.03,
        textAlign: 'center' as const,
        maxWidth: '98vw',
        minWidth: 0,
        width: '98vw',
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '0.05em',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.32s cubic-bezier(.4,1.3,.6,1), transform 0.38s cubic-bezier(.4,1.3,.6,1)',
        wordBreak: 'break-word' as const,
      }
    : {
        background: 'rgba(40,40,40,0.97)',
        color: '#fff',
        borderRadius: 4,
        padding: '0.32rem 0.7rem 0.55rem 0.7rem',
        margin: '0.08rem',
        fontSize: '0.92rem',
        boxShadow: '0 1px 6px rgba(0,0,0,0.13)',
        border: '1px solid #ff8c42',
        pointerEvents: 'auto' as const,
        fontWeight: 500,
        letterSpacing: 0.05,
        textAlign: 'center' as const,
        maxWidth: '420px',
        minWidth: 120,
        width: 'fit-content',
        position: 'relative' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5em',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.32s cubic-bezier(.4,1.3,.6,1), transform 0.38s cubic-bezier(.4,1.3,.6,1)',
      };

  const closeBtnStyle = mobile
    ? {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: 30,
        fontWeight: 700,
        marginLeft: 5,
        marginRight: '0.2em',
        cursor: 'pointer',
        lineHeight: 1,
        padding: 0,
        transition: 'color 0.2s',
        borderRadius: 2,
        outline: 'none',
        boxShadow: 'none',
        alignSelf: 'stretch',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }
    : {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: 25,
        fontWeight: 700,
        marginLeft: 5,
        marginRight: 1,
        cursor: 'pointer',
        lineHeight: 1,
        padding: 0,
        transition: 'color 0.2s',
        borderRadius: 3,
        outline: 'none',
        boxShadow: 'none',
        alignSelf: 'flex-start',
      };

  const barBgStyle = mobile
    ? {
        position: 'absolute' as const,
        left: 0,
        bottom: 0,
        height: 2,
        width: '100%',
        background: 'rgba(255,255,255,0.08)',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        overflow: 'hidden',
      }
    : {
        position: 'absolute' as const,
        left: 0,
        bottom: 0,
        height: 2,
        width: '100%',
        background: 'rgba(255,255,255,0.08)',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        overflow: 'hidden',
      };

  return (
    <div style={containerStyle}>
      <div style={toastStyle}>
        <span style={{ flex: 1, fontWeight: 600 }}>{message}</span>
        <button
          onClick={() => { setShow(false); setTimeout(onClose, 150); }}
          aria-label="Close message"
          style={closeBtnStyle}
          onMouseOver={e => (e.currentTarget.style.color = '#ff8c42')}
          onMouseOut={e => (e.currentTarget.style.color = '#fff')}
        >
          ×
        </button>
        <div style={barBgStyle}>
          <div
            ref={barRef}
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #ff8c42, #ff6b35)',
              transition: anim ? `width ${duration}ms linear` : 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast; 