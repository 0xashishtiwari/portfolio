
"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

interface IntroLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

const DEER_GIF = "/deer-loader.gif";

export default function IntroLoader({
  duration = 3200,
  onComplete,
}: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;

    const update = (time: number) => {
      const elapsed = time - start;
      const linear = Math.min(elapsed / duration, 1);

      // Accelerating counter
      const accelerated = Math.pow(linear, 0.72) * 100;

      setProgress(accelerated);

      if (linear < 1) {
        frame = requestAnimationFrame(update);
      } else {
        setProgress(100);

        timeout = setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 450);
      }
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#f3f3f1]
            px-6
          "
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Flickering background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.45]">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={3}
              gridGap={5}
              flickerChance={0.08}
              maxOpacity={0.18}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-[620px]">
            <motion.div
              className="
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-black/[0.08]
                bg-black
                shadow-[0_20px_70px_-25px_rgba(0,0,0,0.25)]
              "
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Deer GIF */}
              <img
                src={DEER_GIF}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Loading HUD */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <motion.span
                    className="size-1.5 rounded-full bg-white"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                  />

                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                    Loading
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <motion.span
                    key={Math.round(progress)}
                    initial={{
                      y: 5,
                      opacity: 0.5,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    className="
                      font-mono
                      text-3xl
                      font-medium
                      leading-none
                      tracking-[-0.08em]
                      text-white
                    "
                  >
                    {Math.round(progress)
                      .toString()
                      .padStart(3, "0")}
                  </motion.span>

                  <span className="font-mono text-[10px] text-white/50">
                    %
                  </span>
                </div>
              </div>

              {/* Tiny progress line */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-white/70"
                style={{
                  width: `${progress}%`,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
