'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation'; // <-- Import useParams
import { Button, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

export default function CallPage() {
  // Grab the route param "id" using the useParams hook
  const { id: roomId } = useParams();

  const [role, setRole] = useState<'user' | 'astrologer' | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isCallStarted, setIsCallStarted] = useState(false);

  // States for mic and camera
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Determine if it's an astrologer or user by checking URL, or use any custom logic
    const isAstrologer = window.location.href.includes('/astrologer/');
    setRole(isAstrologer ? 'astrologer' : 'user');

    // Construct the WebSocket URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const wsUrl = baseUrl.replace('https://', 'wss://').replace('http://', 'ws://') + '/calls';
    console.log("Connecting to WebSocket:", wsUrl);

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('WebSocket Connected to', wsUrl);
      wsRef.current?.send(
        JSON.stringify({
          type: 'join',
          roomId,
          userId: Math.random().toString(36).substring(7),
          role: isAstrologer ? 'astrologer' : 'user'
        })
      );
    };

    wsRef.current.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'offer':
          case 'answer':
          case 'candidate':
            handleSignalingData(data);
            break;
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };

    return () => {
      wsRef.current?.close();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      // Clean up local stream when component unmounts
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId]);

  const handleSignalingData = async (data: any) => {
    try {
      switch (data.type) {
        case 'offer':
          if (!peerConnectionRef.current) {
            await startCall();
          }
          await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnectionRef.current?.createAnswer();
          await peerConnectionRef.current?.setLocalDescription(answer);
          wsRef.current?.send(
            JSON.stringify({
              type: 'answer',
              answer: answer,
              roomId,
              userId: Math.random().toString(36).substring(7)
            })
          );
          break;

        case 'answer':
          if (peerConnectionRef.current?.signalingState !== 'stable') {
            await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(data.answer));
          }
          break;

        case 'candidate':
          if (peerConnectionRef.current && data.candidate) {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
          break;
      }
    } catch (error) {
      console.error('Error in signaling:', error);
    }
  };

  const startCall = async () => {
    try {
      // Request audio + video
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      peerConnectionRef.current = peerConnection;

      // Add local tracks to RTCPeerConnection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // When remote stream arrives
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // ICE Candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          wsRef.current?.send(
            JSON.stringify({
              type: 'candidate',
              candidate: event.candidate,
              roomId,
              userId: Math.random().toString(36).substring(7)
            })
          );
        }
      };

      // If user, create offer
      if (role === 'user') {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        wsRef.current?.send(
          JSON.stringify({
            type: 'offer',
            offer: offer,
            roomId,
            userId: Math.random().toString(36).substring(7)
          })
        );
      }

      setIsCallStarted(true);
    } catch (error) {
      console.error('Error starting call:', error);
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    // Stop local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    wsRef.current?.close();
    setIsCallStarted(false);
  };

  // Toggle microphone
  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;
        setIsMuted(!enabled);
      }
    }
  };

  // Toggle camera
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;
        setIsVideoOff(!enabled);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-chandan via-white to-sacred-haldi/10 p-4">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h5" className="mb-4 text-sacred-kumkum">
          {role === 'astrologer' ? 'Consultation Session' : 'Meeting with Astrologer'}
        </Typography>

        <Typography variant="body2" className="mb-4 text-gray-600">
          Status: {isCallStarted ? 'Connected' : 'Waiting to connect...'}
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          {/* Local video */}
          <div className="relative bg-black rounded-lg overflow-hidden h-64 md:h-80">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Camera off overlay */}
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center">
                  <VideoOff size={40} className="mx-auto text-white/70 mb-2" />
                  <Typography className="text-white/70">Camera Off</Typography>
                </div>
              </div>
            )}
            {/* Mic/Video indicators */}
            <div className="absolute top-2 right-2 flex gap-2">
              {isMuted && (
                <div className="bg-red-500 p-1 rounded-full">
                  <MicOff size={16} className="text-white" />
                </div>
              )}
              {isVideoOff && (
                <div className="bg-red-500 p-1 rounded-full">
                  <VideoOff size={16} className="text-white" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <Typography className="text-white font-medium">You</Typography>
            </div>
          </div>

          {/* Remote video */}
          <div className="relative bg-black rounded-lg overflow-hidden h-64 md:h-80">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <Typography className="text-white font-medium">Remote User</Typography>
            </div>
            {/* Connection pending overlay */}
            {!isCallStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <Typography className="text-white">Waiting to start call...</Typography>
              </div>
            )}
          </div>
        </div>

        <Box className="flex flex-wrap justify-center mt-6 gap-3">
          {!isCallStarted ? (
            <Button
              variant="contained"
              color="success"
              onClick={startCall}
              startIcon={<Phone />}
              className="py-3 px-6"
            >
              Start Call
            </Button>
          ) : (
            <>
              <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                <IconButton
                  onClick={toggleMic}
                  color={isMuted ? 'error' : 'primary'}
                  className="bg-white/80 backdrop-blur-sm shadow-md"
                  size="large"
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </IconButton>
              </Tooltip>

              <Tooltip title={isVideoOff ? 'Turn on video' : 'Turn off video'}>
                <IconButton
                  onClick={toggleVideo}
                  color={isVideoOff ? 'error' : 'primary'}
                  className="bg-white/80 backdrop-blur-sm shadow-md"
                  size="large"
                >
                  {isVideoOff ? <VideoOff /> : <Video />}
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                color="error"
                onClick={endCall}
                startIcon={<PhoneOff />}
                className="py-3 px-6"
              >
                End Call
              </Button>
            </>
          )}
        </Box>
      </div>
    </div>
  );
}
