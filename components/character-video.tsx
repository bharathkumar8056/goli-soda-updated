"use client"

import { motion } from "framer-motion"
import { SafeVideoPlayer } from "./safe-video-player"

interface CharacterVideoProps {
  character: {
    name: string
    videoSrc?: string
    videoTitle?: string
  }
}

export function CharacterVideo({ character }: CharacterVideoProps) {
  // Use placeholder video source if none provided
  const videoSrc = character.videoSrc || "/videos/placeholder.mp4"
  const videoTitle = character.videoTitle || `${character.name} Highlight Reel`

  return (
    <motion.div
      className="mt-8 md:mt-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <SafeVideoPlayer
        videoSrc={videoSrc}
        title={videoTitle}
        className="w-full aspect-video max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden"
        autoplay={true}
      />

      {/* Video caption */}
      <motion.p
        className="text-center text-gray-400 text-sm mt-3 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Watch {character.name}'s character clip from Goli Soda series
      </motion.p>
    </motion.div>
  )
}
