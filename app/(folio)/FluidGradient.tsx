"use client";
import { useEffect, useRef } from "react";
import styles from "./FluidGradient.module.css";

export default function FluidGradient() {
  return (
    <div className={styles.gradientBg}>
      <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        <title>Goo</title>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 10  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.gradients}>
        <div className={styles.circle} />
        {/* <InteractiveBubble /> */}
      </div>
    </div>
  );
}

function InteractiveBubble() {
  const interBubbleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 18;
      curY += (tgY - curY) / 20;

      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }

      requestAnimationFrame(() => {
        move();
      });
    }

    function handleMouseMove(event: MouseEvent) {
      tgX = event.clientX;
      tgY = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);

    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return <div ref={interBubbleRef} className={styles.interactive} />;
}
