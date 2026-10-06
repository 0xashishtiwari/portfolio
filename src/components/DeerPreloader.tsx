
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

interface IntroLoaderProps {
  duration?: number;
  onComplete?: () => void;
}

const DEER_GIF = "/deer-loader.gif";

export default function IntroLoader({
  duration = 1600,
  onComplete,
}: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const complete = progress >= 100;

  const status =
    progress < 25
      ? "Warming up"
      : progress < 55
        ? "Loading assets"
        : progress < 85
          ? "Polishing pixels"
          : complete
            ? "Ready"
            : "Almost there";

  /* Subtle pointer-follow tilt for the card */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(tiltY, [-0.5, 0.5], [5, -5]),
    { stiffness: 200, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(tiltX, [-0.5, 0.5], [-6, 6]),
    { stiffness: 200, damping: 22 }
  );

  const handleTilt = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

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
            bg-background
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
          {/* Flickering background — warm, subtle */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.08]">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={3}
              gridGap={5}
              flickerChance={0.06}
              maxOpacity={0.14}
            />
          </div>

          {/* Main content — warm card */}
          <div
            className="relative z-10 w-full max-w-[620px]"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <motion.div
              className="
                relative
                aspect-[16/10]
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-card
                shadow-[0_20px_70px_-25px_rgba(23,23,23,0.12)] dark:shadow-[0_20px_70px_-25px_rgba(0,0,0,0.6)]
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
              style={
                reduceMotion
                  ? undefined
                  : {
                      rotateX,
                      rotateY,
                      transformPerspective: 900,
                    }
              }
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Deer GIF — slow Ken Burns drift */}
              <motion.img
                src={DEER_GIF}
                alt=""
                className="absolute inset-0 h-full w-full bg-black object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: reduceMotion ? 1 : 1.08 }}
                transition={{
                  duration: duration / 1000 + 0.45,
                  ease: "linear",
                }}
              />

              {/* Sheen sweep on entrance */}
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    delay: 0.25,
                    duration: 0.9,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Corner ticks — staggered in */}
              {[
                "left-3 top-3 border-l border-t",
                "right-3 top-3 border-r border-t",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((position, i) => (
                <motion.span
                  key={position}
                  className={`absolute z-10 h-3 w-3 border-white/40 ${position}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.35 + i * 0.08,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Loading HUD — staggered entrance */}
              <motion.div
                className="absolute bottom-5 left-5 right-5 flex items-end justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    className={`size-1.5 rounded-full transition-colors duration-300 ${
                      complete
                        ? "bg-emerald-500"
                        : "bg-[#B85C3A] dark:bg-[#D2906F]"
                    }`}
                    animate={
                      complete
                        ? { scale: [1, 1.7, 1] }
                        : { opacity: [0.4, 1, 0.4] }
                    }
                    transition={
                      complete
                        ? { duration: 0.5 }
                        : { duration: 0.8, repeat: Infinity }
                    }
                  />

                  <span className="flex h-3 items-center overflow-hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={status}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        {status}
                      </motion.span>
                    </AnimatePresence>
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
                      text-[#F2EFE8]
                      drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]
                    "
                  >
                    {Math.round(progress)
                      .toString()
                      .padStart(3, "0")}
                  </motion.span>

                  <span className="font-mono text-[10px] text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    %
                  </span>
                </div>
              </motion.div>

              {/* Progress track with traveling glow tip */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
                <div
                  className="absolute bottom-0 left-0 h-full bg-[#B85C3A] dark:bg-[#D2906F]"
                  style={{
                    width: `${progress}%`,
                  }}
                />
                {!reduceMotion && (
                  <motion.span
                    className="absolute top-1/2 size-1.5 rounded-full bg-[#B85C3A] dark:bg-[#D2906F]"
                    style={{
                      left: `${progress}%`,
                      x: "-50%",
                      y: "-50%",
                      boxShadow:
                        "0 0 8px 2px rgba(184,92,58,0.55)",
                    }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.25, 1],
                    }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
