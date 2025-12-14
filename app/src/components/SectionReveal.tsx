'use client';

import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  Ref,
} from "react";
import { useEffect, useRef } from "react";

import "./SectionReveal.css";

type SectionRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function SectionReveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  ...props
}: SectionRevealProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = (as ?? "div") as ElementType;

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
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as Ref<any>}
      className={`section-reveal ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
