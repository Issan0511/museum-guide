"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  src: string;
  downloadName?: string;
  audioRef?: React.RefObject<HTMLAudioElement>;
};

export default function AudioPlayer({ src, downloadName = "audio.mp3", audioRef }: Props) {
  const innerRef = useRef<HTMLAudioElement>(null);
  const ref = audioRef ?? innerRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const toggle = () => {
    if (!ref.current) return;
    if (isPlaying) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (value: number) => {
    if (!ref.current) return;
    ref.current.currentTime = value;
    setCurrentTime(value);
  };

  const cycleRate = () => {
    const rates = [1, 1.25, 1.5, 0.75];
    const index = rates.indexOf(playbackRate);
    const next = rates[(index + 1) % rates.length];
    setPlaybackRate(next);
    if (ref.current) {
      ref.current.playbackRate = next;
    }
  };

  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;

    const handleTimeupdate = () => setCurrentTime(audio.currentTime);
    const handleMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeupdate);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeupdate);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [ref]);

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-3 space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-9 w-9 p-0 border-neutral-300 bg-transparent" onClick={toggle}>
          {isPlaying ? "❚❚" : "▶"}
        </Button>
        <div className="flex-1 text-sm tabular-nums text-neutral-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-9 px-3 border-neutral-300 text-sm bg-transparent"
          onClick={cycleRate}
        >
          {playbackRate}x
        </Button>
        <Button size="sm" variant="outline" className="h-9 w-9 p-0 border-neutral-300 bg-transparent" asChild>
          <a href={src} download={downloadName}>
            ↓
          </a>
        </Button>
      </div>
      <input
        type="range"
        min={0}
        max={Math.floor(duration) || 0}
        value={Math.floor(currentTime) || 0}
        onChange={(event) => seek(Number(event.target.value))}
        className="slider w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
      />
      <audio ref={ref} preload="metadata">
        <source src={src} type="audio/mpeg" />
      </audio>
    </div>
  );
}
