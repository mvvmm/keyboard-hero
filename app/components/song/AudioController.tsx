"use client";

import { useEffect } from "react";

export function AudioController() {
  useEffect(() => {
    const syncAudio = async () => {
      const audioElements = Array.from(
        document.querySelectorAll<HTMLAudioElement>("audio"),
      );

      // Set playback rate for all elements
      audioElements.forEach((audio) => (audio.playbackRate = 1));

      try {
        // Trigger audio playback for each item at as close to the same time as possible
        await Promise.all(audioElements.map((audio) => audio.play()));
      } catch (err) {
        console.error("Failed to play audio:", err);
      }
    };

    syncAudio();

    // Re-sync audio on pagehide (e.g., for SPA navigation)
    window.addEventListener("pagehide", syncAudio);

    return () => {
      window.removeEventListener("pagehide", syncAudio);
    };
  }, []);

  return null;
}
