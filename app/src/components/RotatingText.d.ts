import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

type SplitStrategy = "characters" | "words" | "lines" | string;

export type RotatingTextProps = HTMLAttributes<HTMLSpanElement> & {
  texts: string[];
  rotationInterval?: number;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  splitBy?: SplitStrategy;
};

declare const RotatingText: ForwardRefExoticComponent<RotatingTextProps & RefAttributes<HTMLSpanElement>>;
export default RotatingText;
