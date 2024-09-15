'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Instagram, Youtube, Github, Linkedin, Mail, ExternalLink, Video, PenTool, Code, Smartphone, Shield, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const projects = [
  { id: 1, title: 'AI Chatbot', description: 'An advanced AI-powered chatbot for customer service.', link: 'https://github.com/AMARRAJU118/ai-chat-bots/projects?query=is%3Aopen', icon: Code },
  { id: 2, title: 'Web Development', description: 'Various web development projects and experiments.', link: 'https://github.com/AMARRAJU118/web-dov', icon: Smartphone },
  { id: 3, title: 'Social Media Dashboard', description: 'Analytics dashboard for social media management.', link: 'https://github.com/AMARRAJU118/Social-Media-Dashboard/projects?query=is%3Aopen', icon: PenTool },
  { id: 4, title: 'Mobile Game', description: 'An addictive puzzle game for iOS and Android.', link: 'https://github.com/AMARRAJU118/Mobile-Game/projects?query=is%3Aopen', icon: Smartphone },
  { id: 5, title: 'Mobile Apps', description: 'Various mobile applications for different purposes.', link: 'https://github.com/AMARRAJU118/MOBILE-APPS/projects?query=is%3Aopen', icon: Smartphone },
  { id: 6, title: 'Hacking Projects', description: 'Ethical hacking and cybersecurity projects.', link: 'https://github.com/AMARRAJU118/hacking-projects/projects?query=is%3Aopen', icon: Shield },
]

const shortFilms = [
  { id: 1, title: 'Short Film 1', link: 'https://www.youtube.com/watch?v=wYBnYGPxDss' },
  { id: 2, title: 'Short Film 2', link: 'https://www.youtube.com/watch?v=3azltqv68UY' },
  { id: 3, title: 'Short Film 3', link: 'https://www.youtube.com/watch?v=fhDDUGOIakQ' },
  { id: 4, title: 'Short Film 4', link: 'https://www.youtube.com/watch?v=0Dhv0Z_UT9s' },
  { id: 5, title: 'Short Film 5', link: 'https://www.youtube.com/watch?v=voxPNVkPevk' },
  { id: 6, title: 'Short Film 6', link: 'https://www.youtube.com/watch?v=rd9UsDiRyXM' },
  { id: 7, title: 'Short Film 7', link: 'https://www.youtube.com/watch?v=NHNr1N1UhCk' },
]

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/amar_raj118" },
  { icon: Youtube, href: "https://www.youtube.com/@mrtechandfactstelugu" },
  { icon: Github, href: "https://github.com/AMARRAJU118" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amarraju118" },
  { icon: Mail, href: "mailto:fasaksquad118@gmail.com" }
]

const menuItems = ['Home', 'About', 'Projects', 'Editing', 'Contact']

function GradientBackground({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="fixed inset-0 z-0 transition-colors duration-500">
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'}`}></div>
    </div>
  )
}

function TypeWriter({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length
      const fullWord = words[i]

      if (isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1))
        setTypingSpeed(30)
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1))
        setTypingSpeed(100)
      }

      if (!isDeleting && currentWord === fullWord) {
        setTimeout(() => setIsDeleting(true), 500)
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentWord, isDeleting, loopNum, words, typingSpeed])

  return (
    <motion.span
      className="text-4xl font-bold text-purple-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentWord}
    </motion.span>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('Home')
  const [shortFilmsOpen, setShortFilmsOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const profileRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const profileAnimation = useAnimation()

  const yPosAnim = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const animateProfile = async () => {
      await profileAnimation.start({
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0],
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      })
    }
    animateProfile()
  }, [profileAnimation])

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(section)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <GradientBackground isDarkMode={isDarkMode} />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');
        
        body {
          cursor: none;
        }
      `}</style>
      
      <motion.div
        className={`fixed w-12 h-12 rounded-full border-2 pointer-events-none z-50 ${isDarkMode ? 'border-purple-400' : 'border-purple-600'}`}
        style={{
          x: cursorPosition.x - 24,
          y: cursorPosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: 0.7,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="flex justify-between items-center mb-12">
          <nav>
            <ul className="flex space-x-6">
              {menuItems.map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`text-lg ${activeSection === item ? 'text-purple-400' : isDarkMode ? 'text-white' : 'text-black'} hover:text-purple-400 transition-colors`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </header>

        <main className="flex flex-col items-center justify-start min-h-screen">
          <motion.section
            id="home"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 w-full"
            style={{ y: yPosAnim }}
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-purple-400 mb-4 text-xl"
            >
              Hey, hello! I am
            </motion.p>
            <motion.div
              ref={profileRef}
              animate={profileAnimation}
              className="mb-8 relative inline-block"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md ${isDarkMode ? 'opacity-75' : 'opacity-50'}`}></div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1725711417577-PoPyHVnGstrJVcVrHjABP4azmNX7mw.jpeg"
                alt="Amar Raju"
                className="w-80 h-80 rounded-full border-4 border-white shadow-lg relative z-10"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-6xl font-bold mb-4 text-purple-400"
            >
              Amar Raju
            </motion.h1>
            <motion.div
              className="h-16 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <TypeWriter words={['Ethical Hacker', 'YouTuber', 'AI Expert', 'Creator', 'Digital Marketer', 'Coder', 'Editor', 'Developer']} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center space-x-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-pink-400 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <social.icon size={32} />
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            <motion.h2 
              className="text-4xl font-bold mb-6 text-purple-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-4"
            >
              I'm a multifaceted professional in the tech world, passionate about pushing the boundaries of what's possible. My diverse skill set allows me to approach challenges from multiple angles, always striving for innovation and excellence.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl"
            >
              From ethical hacking to AI development, from creating engaging YouTube content to crafting cutting-edge mobile apps, I'm constantly evolving and learning. Join me as we explore the exciting frontiers of technology together!
            </motion.p>
          </motion.section>

          <motion.section
            id="projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.3)" }}
                  className={`p-6 rounded-lg cursor-pointer border transform transition-all duration-300 hover:rotate-2 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500' : 'bg-white border-purple-200 shadow-lg'}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <project.icon className="text-purple-400 mb-4 h-12 w-12" />
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">{project.title}</h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                  <span className="text-purple-400 flex items-center">
                    Explore <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="editing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-purple-400">My Editing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500' : 'bg-white border-purple-200 shadow-lg'}`}
              >
                <Video className="text-purple-400 mb-4 h-16 w-16 mx-auto" />
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Short Films</h3>
                <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Explore my collection of captivating short films, showcasing my storytelling and editing skills.</p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(167, 139, 250, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShortFilmsOpen(true)}
                  className="bg-purple-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-600 transition-colors"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  View Short Films
                </motion.button>
              </motion.div>
              <motion.a
                href="https://www.behance.net/amarrju"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-lg border flex flex-col items-center ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-purple-500' : 'bg-white border-purple-200 shadow-lg'}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <PenTool className="text-purple-400 mb-4 h-16 w-16" />
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Graphic Designs</h3>
                <p className={`mb-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Check out my portfolio of stunning graphic designs on Behance, showcasing my creative vision and technical skills.</p>
                <span className="text-purple-400 flex items-center mt-auto text-lg">
                  View on Behance <ExternalLink className="ml-2 h-5 w-5" />
                </span>
              </motion.a>
            </div>
          </motion.section>

          <AnimatePresence>
            {shortFilmsOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                onClick={() => setShortFilmsOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`p-8 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-3xl font-bold mb-6 text-purple-400">My Short Films</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shortFilms.map((film) => (
                      <motion.a
                        key={film.id}
                        href={film.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center p-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <Video className="text-purple-400 mr-4 h-8 w-8" />
                        <span className="text-lg">{film.title}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.section
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-purple-400">Get in Touch</h2>
            <motion.form
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className={`w-full p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                ></textarea>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-purple-600 transition-all duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.section>
        </main>
      </div>
    </div>
  )
}