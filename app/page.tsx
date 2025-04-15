"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { CharacterCard } from "@/components/character-card"
import { ParticleBackground } from "@/components/particle-background"
import { DirectorSection } from "@/components/director-section"
import { ProductionSection } from "@/components/production-section"
import { SafeHandAnimation } from "@/components/safe-hand-animation"
import { SafeCompassAnimation } from "@/components/safe-compass-animation"
import { SafeVideoPlayer } from "@/components/safe-video-player"
import { InitialAnimation } from "@/components/initial-animation"

// Remove these dynamic imports
// const GoliSoda3DText = dynamic(() => import("@/components/3d-goli-soda-text").then((mod) => mod.GoliSoda3DText), {
//   ssr: false,
// })

// const EnhancedBottleAnimation = dynamic(
//   () => import("@/components/enhanced-bottle-animation").then((mod) => mod.EnhancedBottleAnimation),
//   { ssr: false },
// )

// const ScrollDotAnimation = dynamic(
//   () => import("@/components/scroll-dot-animation").then((mod) => mod.ScrollDotAnimation),
//   {
//     ssr: false,
//     loading: () => null,
//   },
// )

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showScrollCue, setShowScrollCue] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Opacity for scroll cue
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Hide scroll cue after user has scrolled
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollCue(false)
      } else {
        setShowScrollCue(true)
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section")
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const characters = [
    {
      name: "RAJ THARUN",
      role: "BALA",
      tagline: "Boy-next-door charm meets raw intensity",
      description:
        "Raj Tharun is a popular Telugu actor known for his work in Telugu cinema. He made his debut in 2014 with the film Uyyala Jampala, which was a commercial success. In addition to his success in Telugu, Raj Tharun is making his Tamil debut with our film, marking an exciting new chapter in his career. He will be seen in the role of Bala, bringing his signature charm and versatility to Tamil audiences for the first time.",
      image: "assets/raj-tharun.jpg",
      color: "from-blue-600/30 to-transparent",
    },
    {
      name: "ANISH",
      role: "PAAL DABBA / YUVRAJ",
      tagline: "From viral hits to explosive action",
      description:
        "Anish aka Paal Dabba is an emerging Indian singer and performer with a large and dedicated fanbase. He gained recognition with his 2022 debut single '3SHA' while part of Bfab Dance Crew. His track '170CM' (2023) was featured in Apple's Work is Worth It campaign, earning critical acclaim. In 2024, he sang 'Galatta' (Aavesham), which amassed 30M+ streams, and his viral hit 'Kathu Mela' with OfRo charted in Spotify India's Top 100. With a rapidly growing following, Anish is now set to make his acting debut in our upcoming film.",
      image: "assets/paal-dabba.jpg",
      color: "from-red-600/30 to-transparent",
    },
    {
      name: "KISHORE DS",
      role: "INBARAJ",
      tagline: "Intensity personified",
      description:
        "Kishore DS is an Indian actor best known for his role in the critically acclaimed Tamil film Goli Soda (2014). His performance in the film was widely praised for its intensity and authenticity. Kishore started his career as a child artist and gained recognition for his natural acting style. He continues to be a promising talent in the Tamil film industry.",
      image: "assets/kishore.jpg",
      color: "from-purple-600/30 to-transparent",
    },
    {
      name: "BHARATH SEENI",
      role: "MAARAN",
      tagline: "The legacy continues",
      description:
        "Bharath Seeni is an Indian actor known for his work in Tamil cinema. He gained recognition for his role as Maaran in Goli Soda 2 (2018) and reprised this character in the 2024 web series Goli Soda Rising, a sequel to the original film. His filmography also includes Kadugu (2017). With his impactful screen presence and versatile acting, Bharath continues to be a promising talent in the industry.",
      image: "assets/Bharath-Seeni.jpg",
      color: "from-green-600/30 to-transparent",
    },
    {
      name: "JEFFREY",
      role: "BIGG BOSS JEFFREY",
      tagline: "From reality TV to raw reality",
      description:
        "Bigg Boss Jeffrey is a Tamil gana singer and rapper known for his raw and relatable music. He gained widespread recognition as a contestant on Bigg Boss Tamil Season 8 in 2024. His participation in the show further boosted his popularity in the media industry. Jeffrey is now set to make his acting debut in our upcoming film, marking an exciting new phase in his career.",
      image: "assets/Jeffrey.jpg",
      color: "from-yellow-600/30 to-transparent",
    },
    {
      name: "PRASANNA",
      role: "PANDI",
      tagline: "Digital sensation to screen powerhouse",
      description:
        "Prasanna Balachandran is an Indian actor and scriptwriter, best known for his work with the popular Tamil YouTube channel Nakkalites, which he co-founded in 2017. He has played significant roles in various web series and short films, including portraying a Tamil teacher in the 2021 series Return to School. Prasanna made his Tamil film debut with Seththumaan and has contributed to projects like Ammuchi, Boomika Back to School, and Suzhal: The Vortex.",
      image: "/assets/prasanna.jpg",
      color: "from-orange-600/30 to-transparent",
    },
    {
      name: "SUNIL",
      role: "POONGA",
      tagline: "180 films, countless memories",
      description:
        "Sunil is a versatile Indian actor known for his work in Telugu cinema, with over 180 films to his credit. Starting as a comedian, he won three Nandi Awards and two Filmfare Awards South before transitioning to lead and character roles. He delivered acclaimed performances in films like Maryada Ramanna, Poola Rangadu, Pushpa: The Rise, and Jailer. With his adaptability and strong screen presence, Sunil remains a valuable asset to any film project.",
      image: "/assets/sunil.jpg",
      color: "from-pink-600/30 to-transparent",
    },
    {
      name: "AARI",
      role: "IRIS",
      tagline: "From Bigg Boss winner to big screen",
      description:
        "Aari Arujunan is an Indian actor known for his work in Tamil cinema. He made his lead debut in Rettaisuzhi (2010), produced by director Shankar, and gained recognition for his performance as Murugan in Nedunchaalai (2014). He also starred in the supernatural thriller Maya. In 2021, Aari won Bigg Boss Tamil Season 4, further increasing his popularity. His dedication to diverse roles and strong screen presence make him a valuable addition to any film project.",
      image: "/assets/aari.jpg",
      color: "from-cyan-600/30 to-transparent",
    },
    {
      name: "BHARATH",
      role: "KALVETTU",
      tagline: "Emotional depth meets raw intensity",
      description:
        "Bharath is a versatile Tamil actor known for his natural performances and emotional depth. Debuting in 'Boys' (2003), he quickly gained recognition for his ability to tackle both lighthearted and intense roles. With films like 'Veyil' (2006) and 'Kadhal' (2003), he showcased his wide range. His strong screen presence and ability to connect emotionally with audiences make him an excellent choice for varied roles, from romantic dramas to action films.",
      image: "/assets/bharath-stills.jpg",
      color: "from-indigo-600/30 to-transparent",
    },
  ]

  // Also update the charactersWithVideos array to use sample videos
  const charactersWithVideos = characters.map((character, index) => ({
    ...character,
    videoSrc: `https://storage.googleapis.com/gtv-videos-bucket/sample/${
      index % 2 === 0 ? "ForBiggerEscapes.mp4" : "ForBiggerJoyrides.mp4"
    }`,
    videoTitle: `${character.name} - Character Spotlight`,
  }))

  // Calculate total number of sections for navigation dots
  const totalSections = 4 + charactersWithVideos.length + 2 // +2 for director and production sections

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Opening dot animation */}
      {isClient && <InitialAnimation />}

      {/* Loading overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1, 0.9, 1.1, 1],
                opacity: [0, 1, 1, 1, 1],
              }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{
                duration: 1.5,
                times: [0, 0.2, 0.4, 0.6, 1],
                ease: "easeInOut",
              }}
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-blue-500 animate-spin blur-md opacity-50"></div>
                <div className="absolute inset-2 rounded-full bg-black"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    GS
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {[...Array(totalSections)].map((_, index) => (
            <Link
              key={index}
              href={`#section-${index}`}
              className={cn(
                "w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 relative group",
                activeSection === index ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50",
              )}
              aria-label={`Navigate to section ${index + 1}`}
            >
              <motion.span
                className="absolute -left-24 top-0 opacity-0 text-xs whitespace-nowrap bg-black/80 px-2 py-1 rounded hidden md:block"
                animate={{ opacity: activeSection === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {index === 0
                  ? "Intro"
                  : index === 1
                    ? "Goli Soda 1"
                    : index === 2
                      ? "Goli Soda 2"
                      : index === 3
                        ? "Goli Soda 1.5"
                        : index === 4
                          ? "Legacy Continues"
                          : index < 5 + charactersWithVideos.length
                            ? charactersWithVideos[index - 5].name
                            : index === 5 + charactersWithVideos.length
                              ? "Director"
                              : index === 6 + charactersWithVideos.length
                                ? "Production"
                                : "Finale"}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>

      {/* Particle background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <ParticleBackground />
      </div>

      {/* Intro Section */}
      <section id="section-0" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70 z-0"></div>
        <Image
          src="images/gs3-reference2.png"
          alt="Moody background"
          fill
          className="object-cover opacity-20 z-0"
          priority
        />

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              <span className="text-gradient-red-blue">GOLI SODA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">The Explosive Saga</p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <AnimatePresence>
          {showScrollCue && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
              style={{ opacity: scrollCueOpacity }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="flex flex-col items-center"
              >
                <span className="text-xs text-white/70 uppercase tracking-widest mb-2">Scroll to Explore</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="h-6 w-6 text-white/70" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Video Section 1 - Goli Soda 1 */}
      <section id="section-1" className="relative min-h-screen flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 z-0"></div>

        <div className="container relative z-10 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
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
              <span className="text-gradient-red-blue">Goli Soda (2014)</span>
            </motion.h2>

            <SafeVideoPlayer
              videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              title="Goli Soda - Official Trailer"
              className="w-full aspect-video max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden"
              autoplay={true}
            />

            <motion.p
              className="mt-8 text-lg text-gray-300 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Released on January 24, 2014, this film featuring a cast of newcomers became a significant success,
              launching the Goli Soda franchise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video Section 2 - Goli Soda 2 */}
      <section id="section-2" className="relative min-h-screen flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-0"></div>

        <div className="container relative z-10 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
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
              <span className="text-gradient-blue-red">Goli Soda 2 (2018)</span>
            </motion.h2>

            <SafeVideoPlayer
              videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              title="Goli Soda 2 - Official Trailer"
              className="w-full aspect-video max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden"
              autoplay={true}
            />

            <motion.p
              className="mt-8 text-lg text-gray-300 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Following the success of the first film, Goli Soda 2 was released on June 14, 2018, and also garnered
              widespread acclaim.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video Section 3 - Goli Soda 1.5 */}
      <section id="section-3" className="relative min-h-screen flex items-center py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-0"></div>

        <div className="container relative z-10 px-4">
          <motion.div
            className="max-w-4xl mx-auto"
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
              <span className="text-gradient-red-blue">Goli Soda Rising (2024)</span>
            </motion.h2>

            <SafeVideoPlayer
              videoSrc="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              title="Goli Soda Rising - Official Trailer"
              className="w-full aspect-video max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden"
              autoplay={true}
            />

            <motion.p
              className="mt-8 text-lg text-gray-300 text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              In 2024, the next installment, Goli Soda Rising, was launched as a web series on the Hotstar OTT platform,
              receiving positive reception from audiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Legacy Continues - Hand Animation Section */}
      <section id="section-4">
        <SafeHandAnimation />
      </section>

      {/* Character Sections with Videos */}
      {charactersWithVideos.map((character, index) => (
        <section key={character.name} id={`section-${index + 5}`} className="relative">
          <CharacterCard character={character} index={index} sectionId={`character-${index}`} isMobile={isMobile} />
          <SafeVideoPlayer
            videoSrc={character.videoSrc || "/videos/placeholder.mp4"}
            title={character.videoTitle || `${character.name} Highlight Reel`}
            className="w-full aspect-video max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden"
            autoplay={true}
          />
        </section>
      ))}

      {/* Director Section */}
      <section id={`section-${5 + charactersWithVideos.length}`}>
        <DirectorSection />
      </section>

      {/* Production Company Section */}
      <section id={`section-${6 + charactersWithVideos.length}`}>
        <ProductionSection />
      </section>

      {/* Final Compass Animation */}
      <section id={`section-${7 + charactersWithVideos.length}`}>
        <SafeCompassAnimation />
      </section>
    </motion.div>
  )
}
