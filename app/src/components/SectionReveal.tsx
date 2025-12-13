'use client';

import { useEffect, useRef } from "react";

import "./SectionReveal.css";

type SectionRevealProps<T extends keyof JSX.IntrinsicElements = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function SectionReveal<T extends keyof JSX.IntrinsicElements = "div">({
  as,
  children,
  className,
  delay = 0,
}: SectionRevealProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = (as ?? "div") as T;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("section-reveal-visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as any}
      className={`section-reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
