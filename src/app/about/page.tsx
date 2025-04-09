"use client"

import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { SparklesCore } from '@/components/ui/sparkles'
import { FaOm, FaHistory, FaStar, FaUsers, FaAward } from 'react-icons/fa'
import { GiMeditation } from "react-icons/gi";
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const companyValues = [
    {
      icon: <GiMeditation className="w-8 h-8" />,
      title: "Spiritual Authenticity",
      description: "We honor ancient wisdom while embracing modern accessibility"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community Connection",
      description: "Building bridges between seekers and authentic guidance"
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Excellence in Service",
      description: "Committed to providing exceptional astrological insights"
    }
  ]

  const teamMembers = [
    {
      name: "Sanjeev Singh",
      position: "Founder & Lead Astrologer",
      bio: "With over 20 years of experience in Vedic astrology, Arjun combines traditional knowledge with modern approaches."
    },
    {
      name: "XYZ",
      position: "Head of Operations",
      bio: " bxyzrings 15 years of experience in spiritual wellness and business management to AstroAlert."
    },
    {
      name: "abc",
      position: "Research Director",
      bio: "An accomplished scholar in both astronomy and astrology, Dr. Kumar leads our research initiatives."
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-sacred-sandal via-white to-sacred-saffron/10 relative overflow-hidden">
      {/* Sacred Mandala Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/mandala-pattern.png')] bg-repeat opacity-10" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-sacred-gold/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-sacred-vermilion/10 rounded-full blur-2xl animate-float animation-delay-2000" />
      </div>

      <BackgroundBeams className="opacity-25" />

      <div className="max-w-[1300px] mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <FaOm className="w-12 h-12 mx-auto text-amber-500 animate-pulse mb-4" />
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper bg-clip-text text-transparent">
              Our Sacred Journey
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper rounded-full" />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative h-[40px] w-full mb-8">
            <SparklesCore background="transparent" minSize={0.4} maxSize={1} particleDensity={1200} className="w-full h-full" particleColor="#ff8303" />
          </motion.div>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sacred-gold/20 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaHistory className="w-6 h-6 text-amber-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Our Story
                </h2>
              </div>
              <p className="text-amber-700/80 mb-4">
                Founded in 2015, AstroAlert began with a vision to bridge ancient astrological wisdom with modern technology. 
                Our journey started with a small team of dedicated astrologers and tech enthusiasts who believed in making 
                authentic astrological guidance accessible to everyone.
              </p>
              <p className="text-amber-700/80">
                Over the years, we've grown into a trusted platform connecting seekers with verified astrologers from 
                diverse traditions. Our mission remains constant: to illuminate paths and empower lives through the 
                cosmic wisdom of astrology.
              </p>
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-sacred-saffron flex items-center justify-center">
                <span className="text-amber-800/50">Founding Team Image</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sacred-gold/20"
              >
                <div className="text-amber-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-amber-800">{value.title}</h3>
                <p className="text-amber-700/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sacred-gold/20 mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-200 to-sacred-saffron rounded-full mb-4 flex items-center justify-center">
                  <FaUsers className="w-12 h-12 text-amber-700/50" />
                </div>
                <h3 className="text-xl font-bold text-amber-800">{member.name}</h3>
                <p className="text-amber-600 mb-2">{member.position}</p>
                <p className="text-amber-700/80">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaStar className="w-6 h-6 text-amber-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Key Achievements
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sacred-gold/20">
            <div className="space-y-6">
              {[
                { year: "2015", achievement: "Launched AstroAlert with our first team of 5 verified astrologers" },
                { year: "2017", achievement: "Expanded our services to include horoscope matching and career guidance" },
                { year: "2019", achievement: "Reached 100,000 registered users on our platform" },
                { year: "2021", achievement: "Introduced AI-powered astrological insights alongside human expertise" },
                { year: "2023", achievement: "Recognized as India's leading digital astrology platform" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full h-10 w-24 flex items-center justify-center flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="bg-white/50 rounded-xl p-4 border border-sacred-gold/10 flex-1">
                    <p className="text-amber-700/80">{item.achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-amber-700/80 mb-4">
            Ready to experience our services?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consult-astro"
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              Consult an Astrologer
            </Link>
            <Link
              href="/careers"
              className="inline-block px-8 py-4 bg-white text-amber-600 font-bold rounded-full border-2 border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
            >
              Join Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
