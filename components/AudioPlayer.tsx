'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'react-feather'

interface AudioPlayerProps {
  title: string
  audioUrl: string
  coverArtUrl?: string
  description?: string
  releasedAt?: string
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ title, audioUrl, coverArtUrl, description, releasedAt }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onDurationChange = () => setDuration(audio.duration)
    const onEnded = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const date = releasedAt
    ? new Date(releasedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  return (
    <div className="border border-text-primary/10 rounded-sm p-md bg-surface/30">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-start gap-md">
        {coverArtUrl && (
          <img
            src={coverArtUrl}
            alt={title}
            className="w-16 h-16 object-cover rounded-sm shrink-0 border border-text-primary/10"
          />
        )}

        <div className="flex-1 min-w-0">
          <p className="font-sans font-medium text-p1 text-text-primary leading-snug mb-xs">
            {title}
          </p>

          {description && (
            <p className="font-serif text-p2 text-text-primary/60 mb-sm leading-snug">
              {description}
            </p>
          )}

          {/* Controls row */}
          <div className="flex items-center gap-sm mt-sm">
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-text-primary hover:bg-accent-mid transition-colors duration-200 shrink-0"
            >
              {playing
                ? <Pause size={13} strokeWidth={2.5} fill="currentColor" />
                : <Play  size={13} strokeWidth={2.5} fill="currentColor" style={{ marginLeft: '1px' }} />
              }
            </button>

            <div
              className="flex-1 h-[3px] bg-text-primary/15 rounded-full cursor-pointer"
              onClick={seek}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-sans text-caption text-text-primary/40 shrink-0 tabular-nums">
              {formatTime(currentTime)}&thinsp;/&thinsp;{formatTime(duration)}
            </span>
          </div>

          {date && (
            <p className="font-sans text-caption text-text-primary/35 mt-xs">{date}</p>
          )}
        </div>
      </div>
    </div>
  )
}
