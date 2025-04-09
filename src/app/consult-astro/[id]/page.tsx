'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { Chat } from '@/components/Chat';
import { SparklesCore } from '@/components/ui/sparkles';
import { Alert } from '@mui/material';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface ChatSession {
  sessionId: string;
  startTime: string;
  endTime: string;
  duration: number;
  messages: Array<{
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
  }>;
}

interface AstrologerDetails {
  _id: string;
  name: string;
  profileImage?: string;
}

export default function ConsultAstro() {
  // 1) Get the astrologer ID from the URL
  const { id } = useParams();

  // Normalize id in case it's an array
  const astrologerId = Array.isArray(id) ? id[0] : id;

  // Early return if no astrologerId is provided
  if (!astrologerId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sacred-chandan via-white to-sacred-haldi/10">
        <div className="text-sacred-rudraksha text-xl">
          No astrologer id provided.
        </div>
      </div>
    );
  }

  // 2) Access current user & loading state from your auth hook
  const { user, loading } = useAuth();

  // 3) Local states
  const [astrologer, setAstrologer] = useState<AstrologerDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingAstrologer, setIsLoadingAstrologer] = useState(true);

  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // 4) Fetch astrologer details & chat history
  useEffect(() => {
    // A. Fetch single astrologer via /api/astrologers/:id
    const fetchAstrologerDetails = async () => {
      if (!user || !astrologerId) return;
      setIsLoadingAstrologer(true);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://localhost:3001/api/astrologers/${astrologerId}`, // IMPORTANT: Matches your backend route
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch astrologer details');
        }

        const data = await response.json();
        // This route returns: { success: boolean, astrologer: {...} }
        if (data.success && data.astrologer) {
          setAstrologer(data.astrologer);
        } else {
          throw new Error(data.error || 'Astrologer not found');
        }
      } catch (err: any) {
        console.error('Error fetching astrologer:', err);
        setError(err.message);
      } finally {
        setIsLoadingAstrologer(false);
      }
    };

    // B. Fetch chat history via /api/chat/get-messages/:roomId
    const fetchChatHistory = async () => {
      if (!user || !astrologerId) return;
      setIsLoadingHistory(true);

      try {
        const token = localStorage.getItem('token');
        // The same roomId logic used by your `useChat` hook
        const roomId = [user._id.trim(), astrologerId.trim()].sort().join('_');

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chat/get-messages/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }

        const data = await response.json();
        // Returns: { success: boolean, messages: [...] }
        if (data.success && data.messages) {
          // Transform the raw messages to your local shape
          const transformedMessages = data.messages.map((msg: any) => ({
            id: msg._id,
            text: msg.message,
            senderId: msg.senderId,
            timestamp: msg.timestamp,
          }));

          setChatHistory([
            {
              sessionId: roomId,
              startTime: '',
              endTime: '',
              duration: 0,
              messages: transformedMessages,
            },
          ]);
        } else {
          throw new Error(data.message || 'Failed to fetch chat history');
        }
      } catch (err: any) {
        console.error('Error fetching chat history:', err);
        setError(err.message);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    // Only fetch if logged in & we have `astrologerId`
    if (user && astrologerId) {
      fetchAstrologerDetails();
      fetchChatHistory();
    }
  }, [user, astrologerId]);

  // 5) Loading & Auth Checks
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sacred-chandan via-white to-sacred-haldi/10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-sacred-kumkum via-sacred-haldi to-sacred-tilak blur-2xl opacity-20 animate-pulse" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-[200px] h-[200px]"
            particleColor="#FF4B2B"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sacred-kumkum">॥ Loading ॥</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sacred-chandan via-white to-sacred-haldi/10">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-sacred-haldi/20">
          <h2 className="text-2xl font-bold text-sacred-kumkum mb-4">
            ॥ Sacred Connection Required ॥ 
          </h2>
          <p className="text-sacred-rudraksha/80">
            Please login to begin your spiritual journey
          </p>
        </div>
      </div>
    );
  }

  // 6) Render the Page
  return (
    <main className="min-h-screen bg-gradient-to-br from-sacred-chandan via-white to-sacred-haldi/10 relative">
      {/* Sacred Om Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/om-pattern.png')] bg-repeat opacity-20" />
      </div>

      <BackgroundBeams className="opacity-25" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {error && (
          <Alert severity="error" className="mb-4 bg-red-50 border border-red-200">
            {error}
          </Alert>
        )}

        {/* ========== Chat History Section ========== */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block mb-6"
          >
            <div
              className="relative bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 border-2 border-sacred-haldi/20 shadow-[0_0_15px_rgba(255,75,43,0.2)]"
            >
              <span
                className="text-lg bg-gradient-to-r from-sacred-kumkum via-sacred-haldi to-sacred-tilak bg-clip-text text-transparent font-semibold"
              >
                ॥ पूर्व परामर्श ॥
              </span>
            </div>
          </motion.div>

          {isLoadingHistory ? (
            <div className="text-sacred-rudraksha/60 text-center">
              Loading divine wisdom...
            </div>
          ) : (
            <div className="space-y-6">
              {chatHistory.length > 0 ? (
                chatHistory.map((session) => (
                  <motion.div
                    key={session.sessionId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-sacred-haldi/10 hover:shadow-sacred-kumkum/10 transition-shadow duration-300"
                  >
                    <div className="space-y-3">
                      {session.messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{
                            opacity: 0,
                            x: msg.senderId === user._id ? 20 : -20,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`p-3 rounded-lg max-w-[80%] ${
                            msg.senderId === user._id
                              ? 'ml-auto bg-gradient-to-r from-sacred-kumkum/10 to-sacred-haldi/10 border border-sacred-haldi/20'
                              : 'bg-sacred-chandan/50 border border-sacred-rudraksha/20'
                          }`}
                        >
                          <div
                            className={
                              msg.senderId === user._id
                                ? 'text-sacred-kumkum'
                                : 'text-sacred-rudraksha'
                            }
                          >
                            {msg.text}
                          </div>
                          <div className="text-xs text-sacred-rudraksha/50 mt-1">
                            {format(new Date(msg.timestamp), 'p')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-sacred-rudraksha/70 text-center py-6">
                  No previous consultations found with this astrologer.
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========== Current Chat Section ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-sacred-haldi/20 hover:shadow-sacred-kumkum/10 transition-shadow duration-300"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-sacred-kumkum flex items-center gap-2">
              <span>🕉</span> वर्तमान परामर्श
              {astrologer && <span className="ml-1">with {astrologer.name}</span>}
            </h2>
          </div>
          {/* Render the real-time Chat component */}
          <Chat
            astrologerId={astrologerId}
            astrologerName={astrologer?.name || 'Astrologer'}
          />
        </motion.div>
      </div>
    </main>
  );
}
