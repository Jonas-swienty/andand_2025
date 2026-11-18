"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import Image from "next/image";

const FADE_MS = 800;
const INTERVAL_MS = 3000;
const QUALITY = 85;

// How wide a photo is drawn, so the browser downloads a big enough version.
// Each half is 50vw × 100vh (stacked on phones: 100vw × 50vh) and the photo covers it,
// so a wide photo is drawn wider than the half: its height times its aspect ratio.
function sizesFor(aspect = 1) {
  const a = Math.round(aspect * 1000) / 1000;
  return `(max-width: 768px) max(100vw, ${50 * a}vh), max(50vw, ${100 * a}vh)`;
}

// One photo or video, stacked absolutely inside its half of the screen.
function MediaLayer({ item, active, eager, onReady, style }) {
  const videoRef = useRef(null);

  // Only the visible video plays; the preloading one waits on its first frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  // A cached video can be ready before React attaches onCanPlay.
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) onReady();
  }, [onReady]);

  return (
    <div className="media-layer" style={style}>
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizesFor(item.aspect)}
          quality={QUALITY}
          preload={eager}
          placeholder={item.blur ? "blur" : "empty"}
          blurDataURL={item.blur}
          onLoad={onReady}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          aria-label={item.alt}
          muted
          loop
          playsInline
          autoPlay={active}
          preload="auto"
          onCanPlay={onReady}
        />
      )}
    </div>
  );
}

function FadeDone({ after, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, after + 50);
    return () => clearTimeout(t);
  }, [after, onDone]);
  return null;
}

// One half of the split screen. It only moves to the next item once that item has
// fully loaded, so there is never a blank frame. The next item loads in the background
// as soon as the current one is ready.
const Side = forwardRef(function Side({ items, className }, ref) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [loaded, setLoaded] = useState(() => new Set());
  const wantsAdvance = useRef(false);

  const count = items.length;
  const next = count > 1 ? (current + 1) % count : null;
  const nextReady = next !== null && loaded.has(next);

  const markLoaded = useCallback((index) => {
    setLoaded((set) => (set.has(index) ? set : new Set(set).add(index)));
  }, []);
  const readyHandlers = useRef({});
  const onReadyFor = (index) => (readyHandlers.current[index] ??= () => markLoaded(index));

  const advance = useCallback(() => {
    if (!nextReady) return false;
    setPrevious(current);
    setCurrent(next);
    return true;
  }, [nextReady, current, next]);

  useImperativeHandle(ref, () => ({ advance }), [advance]);

  // A click that came in before the next item was ready goes through once it is.
  useEffect(() => {
    if (wantsAdvance.current && nextReady) {
      wantsAdvance.current = false;
      advance();
    }
  }, [nextReady, advance]);

  const handleClick = () => {
    if (!advance()) wantsAdvance.current = true;
  };
  const clearPrevious = useCallback(() => setPrevious(null), []);

  if (!count) return <div className={className} />;

  // Keep at most three layers mounted: the one fading out, the visible one, and the next one.
  const layers = [];
  if (previous !== null && previous !== current) layers.push(previous);
  layers.push(current);
  if (next !== null && loaded.has(current) && !layers.includes(next)) layers.push(next);

  return (
    <div className={className} onClick={handleClick}>
      {layers.map((index) => {
        const isCurrent = index === current;
        const isPrevious = index === previous && !isCurrent;
        return (
          <MediaLayer
            key={index}
            item={items[index]}
            active={isCurrent}
            eager={index === 0}
            onReady={onReadyFor(index)}
            style={{
              zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
              opacity: isCurrent || isPrevious ? 1 : 0,
              transition: isCurrent ? `opacity ${FADE_MS}ms ease-in-out` : "none",
            }}
          />
        );
      })}
      {/* Drop the old layer once the new one has fully faded in. */}
      {previous !== null && <FadeDone key={current} after={FADE_MS} onDone={clearPrevious} />}
    </div>
  );
});

export default function HomeClient({ officeLabel, email, phone, addresses, aboutText, leftMedia, rightMedia }) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Every few seconds one random side moves on. If that side's next item is still
  // loading, the other side goes instead; if neither is ready, nothing changes.
  useEffect(() => {
    const interval = setInterval(() => {
      const [first, second] = Math.random() < 0.5 ? [leftRef, rightRef] : [rightRef, leftRef];
      if (!first.current?.advance()) second.current?.advance();
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="split-screen">
        <Side ref={leftRef} items={leftMedia} className="left-side" />
        <Side ref={rightRef} items={rightMedia} className="right-side" />

        {/* Navigation */}
        <div className="nav-text about-text" onClick={() => setIsAboutOpen(true)}>
          about
        </div>
        <div className="nav-text contact-text">
          <a href={`mailto:${email}`} className="contact-link">
            contact
          </a>
        </div>

        {/* Logo */}
        <div className="logo">&amp;&amp;</div>
      </div>

      {/* About Overlay */}
      <div
        className={`overlay backdrop-blur-[10px] ${isAboutOpen ? "active" : ""}`}
        onClick={(e) => {
          if (e.target.classList.contains("overlay") || e.target.classList.contains("overlay-content")) {
            setIsAboutOpen(false);
          }
        }}
      >
        <div className="overlay-content">
          <div className="column-container" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-header-row">
              <div className="mobile-office-title">Office</div>
              <div className="mobile-close-button">
                <button className="close-link bg-transparent border-none p-0 cursor-pointer" onClick={() => setIsAboutOpen(false)}>
                  (close)
                </button>
              </div>
            </div>
            <div className="column office-column">
              <span className="desktop-office-title">
                Office
                <br />
                <br />
              </span>
              {officeLabel}
              <br />
              {addresses?.map((address, idx) => (
                <span key={idx}>
                  {address.city}: {address.line}
                  <br />
                </span>
              ))}
              email: {email}
              <br />
              phone: {phone}
            </div>
            <div className="column about-column">
              About
              <br />
              <br />
              <span className="caption">{aboutText}</span>
            </div>
            <div className="column close-column">
              <button className="close-link bg-transparent border-none p-0 cursor-pointer" onClick={() => setIsAboutOpen(false)}>
                (close)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
