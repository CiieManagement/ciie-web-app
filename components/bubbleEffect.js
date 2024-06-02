// BubbleEffect.js

import React from 'react';
import { useSpring, animated } from 'react-spring';

const BubbleEffect = () => {
 const [styles, set] = useSpring(() => ({
    x: 0,
    y: 0,
 }));

 const handleMouseMove = (e) => {
    set({ x: e.clientX, y: e.clientY });
 };

 return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }} onMouseMove={handleMouseMove}>
      <animated.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(255, 0, 0, 0.5)',
          transform: styles.x.interpolate((x,y) => translate("{x}px, ${styles.y}px")),
        }}
      />
    </div>
 );
};

export default BubbleEffect;
