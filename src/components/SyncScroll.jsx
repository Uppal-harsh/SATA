"use client";

import * as React from "react";
import { useRef, useState, useEffect, startTransition } from "react";

export default function SyncScroll({
  words = ["SCIENCE", "TECHNOLOGY", "APPRECIATION", "SYSTEMS", "RESEARCH", "HARDWARE", "INNOVATION", "SATA LABS"],
  font = {
    fontFamily: "Space Grotesk, sans-serif",
    fontWeight: 800,
    fontSize: 48,
    lineHeight: "1.2em",
    letterSpacing: "0.05em",
    textAlign: "left",
  },
  textColor = "#F2F0E8",
  baseVelocity = 5,
  direction = "left",
  gap = 48,
  style,
  className,
}) {
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const scrollerRef = useRef(null);

  const [numCopies, setNumCopies] = useState(3);
  const [unitWidth, setUnitWidth] = useState(0);

  const scrollDirectionChange = true;
  const padding = 16;

  const propsRef = useRef({
    baseVelocity,
    direction,
    scrollDirectionChange,
  });

  useEffect(() => {
    propsRef.current = {
      baseVelocity,
      direction,
      scrollDirectionChange,
    };
  }, [baseVelocity, direction, scrollDirectionChange]);

  const state = useRef({
    x: 0,
    currentDirMultiplier: direction === "right" ? -1 : 1,
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
    lastScrollTime: typeof window !== "undefined" ? Date.now() : 0,
    lastFrameTime: typeof window !== "undefined" ? performance.now() : 0,
  });

  useEffect(() => {
    state.current.currentDirMultiplier = direction === "right" ? -1 : 1;
  }, [direction]);

  const renderBlockContent = (copyIndex) => {
    return (words ?? []).map((word, wordIndex) => {
      const isAmber = wordIndex % 2 === 0;
      return (
        <span
          key={`copy-${copyIndex}-word-${wordIndex}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${gap}px`,
          }}
        >
          <span style={{ color: isAmber ? "var(--accent-amber)" : "var(--accent-cyan)", opacity: 0.9 }}>
            {word}
          </span>
          <span style={{ color: "var(--border-subtle)", fontSize: "0.5em" }}>✦</span>
          {wordIndex < (words ?? []).length - 1 && (
            <span style={{ display: "inline-block", width: `${gap}px` }} />
          )}
        </span>
      );
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    const block = blockRef.current;
    if (!container || !block) return;

    const updateSizes = () => {
      const cw = container.getBoundingClientRect().width || 0;
      const bw = block.getBoundingClientRect().width || 0;

      if (bw > 0) {
        const nextCopies = Math.max(3, Math.ceil(cw / bw) + 2);
        startTransition(() => {
          setUnitWidth(bw);
          setNumCopies(nextCopies);
        });
      }
    };

    updateSizes();

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(updateSizes);
    ro.observe(container);
    ro.observe(block);

    return () => ro.disconnect();
  }, [words, font, gap, padding, style?.width]);

  useEffect(() => {
    if (unitWidth <= 0 || typeof window === "undefined") return;

    let rafId = 0;

    const wrap = (value, min, max) => {
      const range = max - min;
      if (range <= 0) return min;
      return ((((value - min) % range) + range) % range) + min;
    };

    const onScroll = () => {
      if (!propsRef.current.scrollDirectionChange) return;

      const now = Date.now();
      const scrollY = window.scrollY;
      const dy = scrollY - state.current.lastScrollY;

      state.current.lastScrollY = scrollY;
      state.current.lastScrollTime = now;

      if (Math.abs(dy) > 0.5) {
        const initialBaseSign = propsRef.current.direction === "right" ? -1 : 1;
        const scrollSign = dy > 0 ? 1 : -1;
        state.current.currentDirMultiplier = initialBaseSign * scrollSign;
      }
    };

    const tick = (now) => {
      const last = state.current.lastFrameTime || now;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      state.current.lastFrameTime = now;
      const currentProps = propsRef.current;

      if (!currentProps.scrollDirectionChange) {
        state.current.currentDirMultiplier = currentProps.direction === "right" ? -1 : 1;
      }

      const pixelsPerSecond = (unitWidth * currentProps.baseVelocity) / 100;
      const moveBy = state.current.currentDirMultiplier * pixelsPerSecond * dt;

      state.current.x = Number.isFinite(state.current.x + moveBy)
        ? state.current.x + moveBy
        : 0;

      const offset = -wrap(state.current.x, 0, unitWidth);

      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    state.current.lastFrameTime = performance.now();
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, [unitWidth]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        boxSizing: "border-box",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(8, 11, 13, 0.75)",
        backdropFilter: "blur(8px)",
        ...style,
        padding: `${padding}px 0`,
      }}
    >
      <div
        ref={scrollerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          willChange: "transform",
          userSelect: "none",
        }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : null}
            aria-hidden={i !== 0}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              flexShrink: 0,
              gap: `${gap}px`,
              paddingRight: `${gap}px`,
              ...font,
              color: textColor,
            }}
          >
            {renderBlockContent(i)}
          </div>
        ))}
      </div>
    </div>
  );
}
