"use client"

import type React from "react"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface CharacterCardProps {
  character: {
    name: string
    role: string
    tagline: string
    description: string
    image: string
    color: string
  }
  index: number
  sectionId: string
  isMobile: boolean
}

export function CharacterCard({ character, index, sectionId, isMobile }: CharacterCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const isEven = index % 2 === 0
  const [isHovered, setIsHovered] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isInView, setIsInView] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smoother animations with springs
  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 })

  // Enhanced parallax effects - reduced movement to keep content more visible
  const imageX = useTransform(smoothProgress, [0, 0.5, 1], isEven ? ["-15%", "0%", "15%"] : ["15%", "0%", "-15%"])
  const textX = useTransform(smoothProgress, [0, 0.5, 1], isEven ? ["15%", "0%", "-15%"] : ["-15%", "0%", "15%"])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.9])
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.95])

  // 3D rotation effects - reduced for better readability
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [3, 0, -3])
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], isEven ? [3, 0, -3] : [-3, 0, 3])

  // Check if section is in view to expand description automatically
  useEffect(() => {
    if (!isMounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          // Auto-expand description when in center view
          if (entries[0].intersectionRatio > 0.7) {
            setShowFullBio(true)
          }
        } else {
          setIsInView(false)
        }
      },
      { threshold: [0.1, 0.7] },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isMounted])

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || !cardRef.current || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePosition({ x, y })
  }

  // Reset mouse position when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // Update Bharath's image if this is his card
  const imageSrc = character.name === "BHARATH" ? "/assets/bharath-stills.jpg" : character.image || "/placeholder.svg"

  // Character entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Don't render anything on server
  if (!isMounted) {
    return null
  }

  return (
    <div ref={sectionRef} className="relative min-h-[100vh] flex items-center py-20 overflow-hidden" id={sectionId}>
      {/* Dynamic background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/90"></div>
        <motion.div
          className={cn("absolute inset-0 bg-gradient-radial", character.color)}
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Character-specific background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          style={{ opacity, scale }}
          className={cn(
            "grid grid-cols-1 gap-8 items-center",
            !isMobile && "md:grid-cols-2",
            !isMobile && !isEven && "md:grid-flow-dense",
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Text content */}
          <motion.div
            style={{ x: textX }}
            className={cn(
              "text-center md:text-left",
              !isMobile && !isEven && "md:col-start-2",
              isMobile && "order-2",
              "flex flex-col",
            )}
            variants={itemVariants}
          >
            <motion.div className="mb-6 relative">
              <motion.div
                className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 z-10 hidden md:block"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              <motion.h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-2" variants={itemVariants}>
                {character.role}
              </motion.h3>

              <motion.h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight" variants={itemVariants}>
                <span className="relative inline-block">
                  <span className="relative z-10 text-gradient-red-blue">{character.name}</span>
                  <motion.span
                    className="absolute top-0 left-0 text-blue-500 z-0"
                    animate={{
                      x: [0, -3, 0],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    {character.name}
                  </motion.span>
                  <motion.span
                    className="absolute top-0 left-0 text-red-500 z-0"
                    animate={{
                      x: [0, 3, 0],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    {character.name}
                  </motion.span>
                </span>
              </motion.h2>

              <motion.div
                className="h-px w-24 bg-gradient-to-r from-red-500 to-blue-500 mx-auto md:mx-0 my-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ transformOrigin: isEven ? "left" : "right" }}
              />

              <motion.p className="text-xl md:text-2xl text-gray-300 italic mb-6" variants={itemVariants}>
                "{character.tagline}"
              </motion.p>

              <div className="relative">
                <motion.div
                  ref={descriptionRef}
                  className={cn(
                    "text-base md:text-lg text-gray-400 leading-relaxed transition-all duration-500",
                    "overflow-y-auto max-h-[200px] md:max-h-[250px] pr-2 custom-scrollbar",
                  )}
                  variants={itemVariants}
                >
                  <p>{character.description}</p>
                </motion.div>

                {!showFullBio && character.description.length > 150 && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent"></div>
                    <motion.button
                      className="mt-2 text-blue-400 flex items-center mx-auto md:mx-0 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
                      onClick={() => setShowFullBio(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center md:justify-start mt-auto"
              variants={itemVariants}
            >
              {["Actor", "Goli Soda Rising", "Hotstar"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 bg-black/50 border border-white/20 rounded-full text-sm"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    borderColor: "rgba(59, 130, 246, 0.5)",
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Character image with 3D effects */}
          <motion.div
            ref={cardRef}
            style={{
              x: imageX,
              rotateX,
              rotateY,
            }}
            className={cn(
              "relative mx-auto perspective-1000 preserve-3d",
              !isMobile && !isEven && "md:col-start-1",
              isMobile && "order-1 mb-8",
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            variants={itemVariants}
          >
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96 mx-auto overflow-hidden rounded-lg shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isHovered && !isMobile
                    ? `rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 20}deg)`
                    : "rotateY(0) rotateX(0)",
                transition: "transform 0.2s ease-out",
              }}
              animate={{
                boxShadow: isHovered
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 20px 0px rgba(59, 130, 246, 0.5)"
                  : "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Card background with parallax effect */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform:
                    isHovered && !isMobile
                      ? `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px) scale(1.1)`
                      : "translateX(0) translateY(0) scale(1)",
                  transition: "transform 0.2s ease-out",
                  filter: isHovered ? "grayscale(0%) contrast(110%)" : "grayscale(100%) contrast(125%)",
                }}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-red-500/10 mix-blend-color-dodge z-20"></div>

              {/* Animated border */}
              <div className="absolute inset-0 z-30 overflow-hidden rounded-lg pointer-events-none">
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  animate={{
                    background: [
                      "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%, transparent 100%)",
                      "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%, transparent 100%)",
                    ],
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 z-25 bg-gradient-to-t from-blue-900/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Character name overlay on hover */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 z-40"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xl font-bold text-white">{character.name}</div>
                <div className="text-sm text-gray-300">{character.role}</div>
              </motion.div>

              {/* Interactive elements that respond to mouse position */}
              {isHovered && !isMobile && (
                <motion.div
                  className="absolute inset-0 z-50 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/30 backdrop-blur-sm"
                      style={{
                        width: 10 + Math.random() * 20,
                        height: 10 + Math.random() * 20,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `translateZ(${50 + Math.random() * 50}px)`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.5 + Math.random() * 0.5, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Floating 3D elements */}
            <motion.div
              className="absolute -top-12 -left-12 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 z-40"
              initial={{ opacity: 0, y: 20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
            />

            <motion.div
              className="absolute -bottom-12 left-10 w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-white/10 z-40"
              initial={{ opacity: 0, y: -20, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
            />

            {/* Rotating frame effect */}
            <motion.div
              className="absolute -inset-4 border border-white/10 rounded-lg z-30 hidden md:block"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  isHovered && !isMobile
                    ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
                    : "rotateY(0) rotateX(0)",
              }}
              animate={{
                borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.1)",
                boxShadow: isHovered ? "0 0 20px rgba(59, 130, 246, 0.2)" : "none",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
