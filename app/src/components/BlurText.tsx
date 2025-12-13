'use client';

import { useEffect, useRef } from "react";

import "./BlurText.css";

type BlurTextProps<T extends keyof JSX.IntrinsicElements = "div"> = {
  text: string;
  as?: T;
  className?: string;
  delay?: number;
};

export default function BlurText<T extends keyof JSX.IntrinsicElements = "div">({
  text,
  as,
  className,
  delay = 0,
}: BlurTextProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = (as ?? "div") as T;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("blur-text-visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.22 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as any}
      className={`blur-text ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {text}
    </Component>
  );
}
