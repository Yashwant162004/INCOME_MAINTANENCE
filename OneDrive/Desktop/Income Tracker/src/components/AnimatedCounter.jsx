import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

const AnimatedCounter = ({ value, prefix = '', suffix = '', decimals = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(latest)
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
