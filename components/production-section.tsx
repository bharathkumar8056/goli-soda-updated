"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function ProductionSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-0"></div>

      <div className="container relative z-10 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-blue-red">Presented By</span>
          </motion.h2>

          <motion.div
            className="relative h-[200px] md:h-[250px] mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Image
              src="/assets/rough-note.jpg"
              alt="Rough Note Productions"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.p
            className="text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Rough Note Productions is a dynamic production house committed to creating authentic and compelling cinema.
            Founded with a vision to support innovative storytelling, the company has been instrumental in bringing the
            Goli Soda universe to audiences worldwide.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {["Innovative", "Authentic", "Bold", "Visionary"].map((tag, i) => (
              <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
