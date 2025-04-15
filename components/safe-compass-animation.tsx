// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { ErrorBoundary } from "./error-boundary"
// import { isWebGLSupported } from "@/lib/client-utils"

// // Create a simple fallback component instead of dynamically importing the problematic component
// function CompassFallback() {
//   return (
//     <div className="min-h-screen py-20 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
//       <div className="container relative z-10">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <motion.h2
//             className="text-4xl md:text-6xl font-bold mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-gradient-red-blue">Coming Soon</span>
//           </motion.h2>
//           <motion.p
//             className="text-xl text-gray-300 max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             The next chapter in the Goli Soda universe
//           </motion.p>
//         </motion.div>

//         {/* Stylized GS3 Logo */}
//         <motion.div
//           className="w-64 h-64 mx-auto relative"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         >
//           <div className="absolute inset-0 rounded-full bg-blue-600/30 animate-pulse"></div>
//           <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
//             <div className="text-center">
//               <h3 className="text-5xl font-bold text-red-600">
//                 GS<span className="text-6xl">3</span>
//               </h3>
//               <p className="text-sm text-gray-800 mt-2">GODS & SOLDIERS</p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="text-center mt-12">
//           <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">
//             <span className="text-gradient-blue-red">Goli Soda 3</span>
//           </h3>
//           <p className="text-lg text-gray-300 max-w-lg mx-auto">
//             The journey continues. Stay tuned for more adventures.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export function SafeCompassAnimation() {
//   const [supported, setSupported] = useState(true)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//     setSupported(isWebGLSupported())
//   }, [])

//   if (!mounted) {
//     return (
//       <div className="min-h-screen py-20 flex items-center justify-center bg-black">
//         <div className="text-white text-lg">Loading...</div>
//       </div>
//     )
//   }

//   // Always use the fallback to avoid Three.js errors
//   return (
//     <ErrorBoundary>
//       <CompassFallback />
//     </ErrorBoundary>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ErrorBoundary } from "./error-boundary"
import { isWebGLSupported } from "@/lib/client-utils"
import Image from "next/image"

// Create a simple fallback component instead of dynamically importing the problematic component
function CompassFallback() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient-red-blue">Coming Soon</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The next chapter in the Goli Soda universe
          </motion.p>
        </motion.div>

        {/* GS3 Logo with Clockwise Animation */}
        <motion.div
          className="w-full max-w-2xl mx-auto relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <motion.div
            className="relative aspect-square"
            animate={{ rotate: 360 }}
            transition={{
              duration: 60,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Image
              src="/images/gs3-reference.png"
              alt="Goli Soda 3 - Gods & Soldiers"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Final message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-2xl md:text-4xl font-bold mb-4 text-white">
            <span className="text-gradient-blue-red">Goli Soda 3</span>
          </h3>
          <p className="text-lg text-gray-300 max-w-lg mx-auto mb-6">
            GODS & SOLDIERS - The journey continues. Stay tuned for more adventures.
          </p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a
              href="#section-1"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Explore the Franchise
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function SafeCompassAnimation() {
  const [supported, setSupported] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSupported(isWebGLSupported())
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  // Always use the fallback to avoid Three.js errors
  return (
    <ErrorBoundary>
      <CompassFallback />
    </ErrorBoundary>
  )
}
