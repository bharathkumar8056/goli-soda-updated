"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface SafeVideoPlayerProps {
  videoSrc: string
  posterSrc?: string
  title: string
  className?: string
  autoplay?: boolean
}

export function SafeVideoPlayer({
  videoSrc,
  posterSrc,
  title,
  className = "",
  autoplay = false,
}: SafeVideoPlayerProps) {
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100 || 0)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => setError(true)

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("error", handleError)
    }
  }, [mounted])

  // Handle autoplay when in view
  useEffect(() => {
    if (!videoRef.current || !mounted || error) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && autoplay && !isPlaying) {
          videoRef.current?.play().catch(() => {
            // Autoplay might be blocked, do nothing
          })
        } else if (!entries[0].isIntersecting && isPlaying) {
          videoRef.current?.pause()
        }
      },
      { threshold: 0.5 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [autoplay, isPlaying, mounted, error])

  const togglePlay = () => {
    if (!videoRef.current || error) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch((e) => {
        console.error("Error playing video:", e)
        setError(true)
      })
    }
  }

  const toggleMute = () => {
    if (!videoRef.current || error) return

    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Handle progress bar click to seek
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || error || duration === 0) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width

    videoRef.current.currentTime = clickPosition * duration
    setCurrentTime(clickPosition * duration)
  }

  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  if (!mounted) {
    return (
      <div className={`${className} bg-black/50 rounded-xl flex items-center justify-center min-h-[200px]`}>
        <div className="text-white text-lg">Loading video...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className} bg-black/50 rounded-xl flex flex-col items-center justify-center min-h-[200px]`}>
        <div className="text-white text-center p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-4">Video could not be loaded</p>
          <div className="bg-white/10 px-4 py-2 rounded-md">
            <code className="text-xs text-red-300">Error loading: {videoSrc}</code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Video overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-10 pointer-events-none" />

      {/* Title */}
      <motion.div
        className="absolute top-4 left-4 z-20 text-white font-bold text-lg md:text-xl"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.div>

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={posterSrc || "/placeholder.svg?height=720&width=1280"}
        muted
        loop
        playsInline
        onClick={togglePlay}
        onError={() => setError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play/Pause overlay button (larger hit area) */}
      <div className="absolute inset-0 z-15 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
        {isPlaying ? (
          <div className="bg-black/30 rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity">
            <Pause className="h-8 w-8 text-white" />
          </div>
        ) : (
          <div className="bg-black/30 rounded-full p-4">
            <Play className="h-8 w-8 text-white" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 z-20 bg-gradient-to-t from-black/50 to-transparent">
        {/* Progress bar */}
        <div
          className="w-full h-2 bg-white/30 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressBarClick}
        >
          <div className="h-full bg-gradient-to-r from-red-500 to-blue-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Time and controls */}
        <div className="flex items-center justify-between">
          {/* Time display */}
          <div className="text-white text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="flex items-center gap-4">
            {/* Play/Pause button */}
            <button
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
            </button>

            {/* Mute button */}
            <button
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
