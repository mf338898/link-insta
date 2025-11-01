"use client";

import Image from "next/image";
import TextType from "@/components/TextType";

type Props = {
  title: string;
  href: string;
  thumb: string;
};

export default function ReelPreviewCard({ title, href, thumb }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-[rgba(236,72,153,0.22)] bg-white/90 px-3 py-2 shadow-[0_10px_24px_rgba(236,72,153,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(236,72,153,0.2)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200/70"
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-xl">
        <Image src={thumb} alt={title} fill sizes="48px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <span className="relative block overflow-hidden text-xs font-semibold text-[color:var(--alv-navy)] leading-snug">
        {/* Invisible fallback keeps card size fixed while text animates */}
        <span aria-hidden className="invisible line-clamp-2">
          {title}
        </span>
        <TextType
          as="span"
          text={[title, title]}
          typingSpeed={100}
          pauseDuration={1000}
          deletingSpeed={50}
          cursorBlinkDuration={0.5}
          cursorCharacter="_"
          loop
          textColors={["var(--alv-navy)"]}
          className="absolute inset-0 w-full text-[color:var(--alv-navy)] leading-snug"
          cursorClassName="text-[color:var(--alv-navy)]"
        />
      </span>
      <svg
        className="ml-auto h-4 w-4 text-[rgba(236,72,153,0.7)] transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 7H17V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  );
}
