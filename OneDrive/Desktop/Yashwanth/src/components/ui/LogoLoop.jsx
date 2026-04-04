import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * @typedef {Object} LogoItem
 * @property {React.ReactNode} [node]
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [href]
 * @property {string} [title]
 * @property {string} [ariaLabel]
 */

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = (value) =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

const cx = (...parts) => parts.filter(Boolean).join(' ');

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      window.addEventListener('resize', callback);
      callback();
      return () => window.removeEventListener('resize', callback);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();
    return () => observers.forEach(observer => observer?.disconnect());
  }, dependencies);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) return;

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        offsetRef.current = ((offsetRef.current + velocityRef.current * deltaTime % seqSize) + seqSize) % seqSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export const LogoLoop = React.memo(({
  logos,
  speed = 40,
  direction = 'left',
  width = '100%',
  logoHeight = 40,
  gap = 60,
  pauseOnHover = true,
  hoverSpeed,
  fadeOut = true,
  fadeOutColor,
  scaleOnHover = true,
  renderItem,
  ariaLabel = 'Technology stack',
  className,
  style
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    return pauseOnHover ? 0 : undefined;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? (direction === 'up' ? 1 : -1)
      : (direction === 'left' ? 1 : -1);
    return magnitude * directionMultiplier;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const sequenceRect = seqRef.current?.getBoundingClientRect();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;

    if (isVertical) {
      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, 4));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos.length, gap, logoHeight, isVertical]);

  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const rootClasses = useMemo(() => cx(
    'relative group w-full overflow-hidden',
    isVertical ? 'h-full flex flex-col' : 'py-4',
    className
  ), [isVertical, className]);

  const renderLogoItem = useCallback((item, key) => {
    const content = item.node ? (
      <span className={cx(
        'inline-flex items-center text-4xl text-gray-400/80 transition-all duration-300',
        scaleOnHover && 'hover:scale-125 hover:text-white'
      )}>
        {item.node}
      </span>
    ) : (
      <img
        className={cx('h-[var(--logo-h)] w-auto block object-contain grayscale opacity-60 transition-all duration-300',
          scaleOnHover && 'hover:scale-110 hover:grayscale-0 hover:opacity-100')}
        src={item.src} alt={item.alt ?? ''}
      />
    );

    return (
      <li key={key} className={cx('flex-none flex items-center justify-center', isVertical ? 'mb-[var(--logo-gap)]' : 'mx-[var(--logo-gap)]')}>
        {content}
      </li>
    );
  }, [isVertical, scaleOnHover]);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, i) => (
    <ul key={i} ref={i === 0 ? seqRef : null} className={cx('flex items-center shrink-0', isVertical && 'flex-col')} role="list" aria-hidden={i > 0}>
      {logos.map((item, idx) => renderLogoItem(item, `${i}-${idx}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem, isVertical]);

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={{ '--logo-gap': `${gap / 2}px`, '--logo-h': `${logoHeight}px`, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {fadeOut && (
        <div className="absolute inset-y-0 left-0 right-0 z-10 pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent" />
        </div>
      )}
      <div ref={trackRef} className={cx('flex will-change-transform', isVertical ? 'flex-col' : 'flex-row w-max')}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
