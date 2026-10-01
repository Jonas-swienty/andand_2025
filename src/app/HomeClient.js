"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const defaultLeftMedia = [
  { type: "image", src: "/images/left-1.jpg", alt: "&& spatial design project" },
  { type: "image", src: "/images/left-2.jpg", alt: "&& design studio portfolio" },
  { type: "video", src: "/images/left-3.mp4", alt: "&& design studio project video" },
  { type: "image", src: "/images/left-4.jpg", alt: "&& architecture practice" },
  { type: "image", src: "/images/left-5.jpg", alt: "&& spatial design" },
  { type: "image", src: "/images/left-6.jpg", alt: "&& spatial design studio" },
];

const defaultRightMedia = [
  { type: "image", src: "/images/right-1.jpg", alt: "&& interior design project" },
  { type: "image", src: "/images/right-2.jpg", alt: "&& design practice portfolio" },
  { type: "image", src: "/images/right-3.jpg", alt: "&& architecture and interiors" },
  { type: "video", src: "/images/right-4.mp4", alt: "&& spatial design video" },
  { type: "image", src: "/images/right-5.jpg", alt: "&& design studio work" },
  { type: "image", src: "/images/right-6.png", alt: "&& interior design and curation" },
];

function normalizeMedia(sanityMedia) {
  if (!sanityMedia?.length) return null;
  return sanityMedia.map((item) => ({
    type: item._type === "file" ? "video" : "image",
    src: item.url,
    alt: item.alt || "&& spatial design",
  }));
}

export default function HomeClient({
  officeLabel,
  email,
  phone,
  addresses,
  aboutText,
  leftMedia: leftMediaProp,
  rightMedia: rightMediaProp,
}) {
  const leftMedia = normalizeMedia(leftMediaProp) || defaultLeftMedia;
  const rightMedia = normalizeMedia(rightMediaProp) || defaultRightMedia;
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Auto advance logic inspired by the legacy script.js
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly choose to advance left or right
      const advanceLeft = Math.random() < 0.5;
      if (advanceLeft) {
        setLeftIndex((prev) => (prev + 1) % leftMedia.length);
      } else {
        setRightIndex((prev) => (prev + 1) % rightMedia.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLeftClick = () => setLeftIndex((prev) => (prev + 1) % leftMedia.length);
  const handleRightClick = () => setRightIndex((prev) => (prev + 1) % rightMedia.length);

  return (
    <>
      <div className="split-screen">
        {/* Left Side */}
        <div className="left-side" onClick={handleLeftClick}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`left-${leftIndex}`}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {leftMedia[leftIndex].type === "image" ? (
                <img
                  src={leftMedia[leftIndex].src}
                  alt={leftMedia[leftIndex].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
                  fetchPriority={leftIndex === 0 ? "high" : undefined}
                />
              ) : (
                <video
                  src={leftMedia[leftIndex].src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="right-side" onClick={handleRightClick}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`right-${rightIndex}`}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {rightMedia[rightIndex].type === "image" ? (
                <img
                  src={rightMedia[rightIndex].src}
                  alt={rightMedia[rightIndex].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
                  fetchPriority={rightIndex === 0 ? "high" : undefined}
                />
              ) : (
                <video
                  src={rightMedia[rightIndex].src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div
          className="nav-text about-text"
          onClick={() => setIsAboutOpen(true)}
        >
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
        className={`overlay ${isAboutOpen ? "active" : ""}`}
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
