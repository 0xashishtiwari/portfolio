"use client";

import { useCallback, useEffect, useState } from "react";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx =
      (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function tick(kind: "tap" | "confirm" | "toggle" | "hover" = "tap", volume = 0.05) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = kind === "hover" ? 520 : 420;
  osc.type = kind === "confirm" || kind === "hover" ? "sine" : "triangle";
  osc.frequency.value =
    kind === "hover" ? 1320 : kind === "toggle" ? 980 : kind === "confirm" ? 1180 : 880;
  const dur = kind === "confirm" ? 0.09 : kind === "hover" ? 0.048 : 0.065;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.11);
}

export function useSound() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem("portfolio:sound");
      if (v === "off") setEnabled(false);
      if (v === "on") setEnabled(true);
    } catch {}
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio:sound", next ? "on" : "off");
      } catch {}
      return next;
    });
  }, []);

  const play = useCallback(
    (kind: "tap" | "confirm" | "toggle" | "hover" = "tap") => {
      if (!enabled) return;
      // volume kept very low — hover even softer
      const vol = kind === "hover" ? 0.028 : kind === "confirm" ? 0.04 : kind === "toggle" ? 0.035 : 0.045;
      tick(kind, vol);
    },
    [enabled]
  );

  return { enabled, toggle, play, setEnabled };
}
