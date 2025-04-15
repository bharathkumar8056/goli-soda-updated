"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SafeVideoPlayer } from "./safe-video-player"

export function DirectorSection() {
  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-0"></div>

      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-red-blue">The Visionary</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Director Image */}
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src="/assets/Vijay-Milton.jpg"
                alt="Director Vijay Milton"
                fill
                className="object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-bold text-white">Vijay Milton</h3>
                <p className="text-gray-300">Director & Cinematographer</p>
              </div>
            </motion.div>

            {/* Director Bio */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Vijay Milton</h3>
              <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full mb-6"></div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Vijay Milton is an acclaimed Indian filmmaker and cinematographer known for his distinctive visual style
                and storytelling. With a career spanning over two decades, he has established himself as a versatile
                talent in Tamil cinema.
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed">
                After beginning his journey as a cinematographer, Milton made his directorial debut with "Azhagai
                Irukkirai Bayamai Irukkirathu" (2006). However, it was the Goli Soda franchise that truly showcased his
                unique vision and cemented his reputation as a director with a keen eye for authentic narratives.
              </p>

              <p className="text-gray-300 leading-relaxed">
                His approach to filmmaking combines raw realism with visual poetry, creating stories that resonate
                deeply with audiences while pushing cinematic boundaries. The Goli Soda series represents his signature
                blend of gritty storytelling and visual flair.
              </p>
            </motion.div>
          </div>

          {/* Director Interview Video */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Director's Vision</h3>
            <SafeVideoPlayer
              videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
              title="Vijay Milton on Goli Soda Universe"
              className="w-full aspect-video max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden"
              autoplay={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
