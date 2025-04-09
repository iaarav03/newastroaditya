'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { SparklesCore } from '@/components/ui/sparkles'
import { PanchangTable } from '@/components/ui/PanchangTable'
import { Footer } from '@/components/Footer'
import Image from 'next/image'

export default function PanchangPage() {
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
            {/* <Image 
              src="/panchang-icon.png" 
              alt="Panchang Icon" 
              width={64} 
              height={64} 
              className="mx-auto mb-4"
            /> */}
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper bg-clip-text text-transparent">
              Vedic Panchang
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper rounded-full" />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative h-[40px] w-full mb-8">
            <SparklesCore background="transparent" minSize={0.4} maxSize={1} particleDensity={1200} className="w-full h-full" particleColor="#ff8303" />
          </motion.div>
          
          <p className="max-w-2xl mx-auto text-amber-700/80 mt-6">
            The Panchang is a Vedic calendar and almanac that follows traditional Hindu timekeeping. 
            It provides information about auspicious timings, planetary positions, and cosmic alignments 
            to guide important decisions and religious ceremonies.
          </p>
        </motion.div>

        {/* Panchang Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PanchangTable />
        </motion.div>

        {/* Informational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sacred-gold/20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Understanding the Panchang
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-800">The Five Elements</h3>
              <p className="text-amber-700/80">
                The word "Panchang" comes from Sanskrit, where "Pancha" means five and "Anga" means limb. 
                The five limbs or elements of Panchang are:
              </p>
              <ul className="list-disc list-inside space-y-2 text-amber-700/80 pl-4">
                <li><span className="font-medium">Tithi:</span> Lunar day based on the moon's longitude relative to the sun</li>
                <li><span className="font-medium">Vara:</span> Day of the week</li>
                <li><span className="font-medium">Nakshatra:</span> Lunar mansion or asterism</li>
                <li><span className="font-medium">Yoga:</span> Auspicious combination of sun and moon</li>
                <li><span className="font-medium">Karana:</span> Half of a tithi</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-800">Importance in Daily Life</h3>
              <p className="text-amber-700/80">
                The Panchang has been used for thousands of years to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-amber-700/80 pl-4">
                <li>Determine auspicious times for rituals and ceremonies</li>
                <li>Plan important life events like marriages and business ventures</li>
                <li>Understand the cosmic influence on daily activities</li>
                <li>Guide agricultural activities based on lunar cycles</li>
                <li>Time religious festivals and ceremonies</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  )
}