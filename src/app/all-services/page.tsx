'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { freeServices } from '@/app/constants/freeServices'
import { premiumServices } from '@/app/constants/premiumServices'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { ParallaxText } from '@/components/ui/parallax-text'
import { GlowingStarsText } from '@/components/ui/glowing-stars'
import { SparklesCore } from '@/components/ui/sparkles'

export default function AllServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sacred-sandal via-white to-sacred-saffron/10 relative overflow-hidden">
      {/* Sacred Mandala Background */}
      <div className="absolute inset-0 opacity-5"></div>
      <div className="absolute inset-0 bg-[url('/mandala-pattern.png')] bg-repeat opacity-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sacred-gold/50 to-transparent" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-sacred-gold rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-sacred-vermilion rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-64 h-64 bg-sacred-copper rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <BackgroundBeams className="opacity-20" />

      {/* Header with floating text */}
      <div className="relative pt-24 pb-20 text-center z-10">
        <div className="relative h-16 w-full flex items-center justify-center overflow-hidden">
          <ParallaxText className="text-xl font-medium text-sacred-copper whitespace-nowrap">
            Vedic Astrology Services • Premium Consultations • Sacred Insights • Astrological Readings • Spiritual Guidance
          </ParallaxText>
        </div>
        
        <GlowingStarsText className="mt-6 mb-2">
          <h1 className="text-5xl font-bold">Our Astrology Services</h1>
        </GlowingStarsText>

        <p className="mx-auto max-w-2xl text-xl text-sacred-copper/80 mt-4">
          Discover the perfect blend of ancient wisdom and modern guidance
        </p>
        
        <div className="w-full h-12 relative mt-8">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={70}
            className="w-full h-full"
            particleColor="#D4AF37"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24 relative z-10">
        {/* Free Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 text-center relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper animate-sacred-shimmer bg-[length:200%_auto]">
              Free Sacred Services
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sacred-vermilion via-sacred-gold to-sacred-copper rounded-full"></div>
          </h2>
          <p className="text-sacred-copper/80 text-lg max-w-3xl mx-auto text-center mb-12">
            Begin your spiritual journey with our complimentary offerings, powered by ancient Vedic wisdom
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-orange-50/50 to-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 h-full">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-4xl bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {service.icon}
                      </div>
                      <div className="text-amber-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        Try Now →
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-amber-900 group-hover:text-orange-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-amber-700">
                      {service.description}
                    </p>

                    <div className="mt-4 inline-flex items-center text-sm font-medium text-sacred-gold">
                      Free
                    </div>

                    {/* Bottom decorative border */}
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sacred-gold to-sacred-copper animate-sacred-shimmer bg-[length:200%_auto]">
              Premium Consultations
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sacred-gold to-sacred-copper rounded-full"></div>
          </h2>
          <p className="text-sacred-copper/80 text-lg max-w-3xl mx-auto text-center mb-12">
            Transform your life with personalized guidance from our expert Vedic astrologers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-sacred-gold/5 to-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-sacred-gold/20 h-full">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sacred-gold via-sacred-copper to-sacred-vermilion transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-sacred-gold/10 to-sacred-copper/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-4xl bg-gradient-to-br from-sacred-gold/20 to-sacred-copper/20 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {service.icon}
                      </div>
                      <div className="text-sacred-copper opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        Book Now →
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-sacred-copper group-hover:text-sacred-vermilion transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sacred-copper/80 mb-4">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-lg font-bold text-sacred-vermilion">
                        {service.price}
                      </div>
                      <div className="text-xs bg-sacred-gold/10 px-3 py-1 rounded-full text-sacred-copper">
                        {service.duration}
                      </div>
                    </div>

                    {/* Bottom decorative border */}
                    <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-sacred-gold/30 to-transparent"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-sacred-copper/80 text-lg max-w-2xl mx-auto mb-8">
              Ready to transform your life with powerful Vedic insights?
            </p>
            <Link href="/consult-astro" 
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-sacred-gold to-sacred-copper text-white font-semibold hover:shadow-lg hover:shadow-sacred-gold/20 hover:scale-105 transition-all duration-300"
            >
              Connect with an Expert Astrologer
              <span className="ml-2">✨</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
} 