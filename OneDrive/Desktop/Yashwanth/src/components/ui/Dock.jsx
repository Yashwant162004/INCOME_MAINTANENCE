import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

/**
 * @typedef {Object} DockItemData
 * @property {React.ReactNode} icon
 * @property {React.ReactNode} label
 * @property {() => void} onClick
 * @property {string} [className]
 */

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      left: 0,
      width: baseItemSize
    };
    return val - rect.left - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border-white/10 border shadow-xl cursor-pointer transition-colors hover:bg-white/10 ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-12 left-1/2 w-fit whitespace-nowrap rounded-md border border-white/10 bg-[#0B0F19]/90 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white shadow-2xl`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`flex items-center justify-center text-gray-300 transition-colors group-hover:text-white ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 15 },
  magnification = 80,
  distance = 150,
  panelHeight = 68,
  dockHeight = 100,
  baseItemSize = 45
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, panelHeight + 10]);
  const height = useSpring(heightRow, spring);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <motion.div style={{ height, scrollbarWidth: 'none' }} className="flex items-center pointer-events-auto">
        <motion.div
          onMouseMove={({ clientX }) => {
            isHovered.set(1);
            mouseX.set(clientX);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseX.set(Infinity);
          }}
          className={`${className} flex items-end w-fit gap-3 rounded-[24px] border-white/10 border bg-white/5 backdrop-blur-2xl pb-3 px-3 shadow-2xl`}
          style={{ height: panelHeight }}
          role="toolbar"
          aria-label="Application dock"
        >
          {items.map((item, index) => (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
