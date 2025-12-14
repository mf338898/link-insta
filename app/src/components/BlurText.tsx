'use client';

import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  Ref,
} from "react";
import { useEffect, useRef } from "react";

import "./BlurText.css";

type BlurTextProps<T extends ElementType = "div"> = {
  text: string;
  as?: T;
  className?: string;
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function BlurText<T extends ElementType = "div">({
  text,
  as,
  className,
  delay = 0,
  ...props
}: BlurTextProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = (as ?? "div") as ElementType;

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
      { threshold: 0.16 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as Ref<any>}
      className={`blur-text ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {text}
    </Component>
  );
}
