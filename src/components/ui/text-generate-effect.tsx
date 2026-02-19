"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();

  // Split by spaces BUT keep line breaks
  const lines = words.split("\n");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.06),
      }
    );
  }, [scope]);

  return (
    <div className={cn(className)}>
      <motion.div ref={scope}>
        {lines.map((line, lineIndex) => {
          const wordsArray = line
            .split(/(\*\*.*?\*\*)|\s+/)
            .filter(Boolean);

          return (
            <div key={lineIndex}>
              {wordsArray.map((word, idx) => {
                const isBold =
                  word.startsWith("**") && word.endsWith("**");

                const cleanWord = isBold
                  ? word.replace(/\*\*/g, "")
                  : word;

                return (
                  <motion.span
                    key={idx}
                    className={cn(
                      "opacity-0 inline-block mr-2 dark:text-white text-black",
                      isBold ? "font-semibold" : "font-light"
                    )}
                    style={{
                      filter: filter ? "blur(10px)" : "none",
                    }}
                  >
                    {cleanWord}
                  </motion.span>
                );
              })}
              <br />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
