import { useState, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Paper, Avatar, Divider, CircularProgress } from '@mui/material';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  messageType: string;
}

interface ChatSession {
  _id: string;
  roomId: string;
  userId: {
    _id: string;
    name: string;
    profileImage: string | null;
  };
  lastMessage: string;
  startTime: string;
  status: string;
}

interface ChatBoxProps {
  chatSession: ChatSession;
  astrologerId: string;
  astrologerName: string;
}

export function ChatBox({ chatSession, astrologerId, astrologerName }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch messages when chat session changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/astrologer/chat?id=${chatSession._id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        if (data.messages) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    if (chatSession?._id) {
      fetchMessages();
    }
  }, [chatSession]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/astrologer/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatSession._id,
          message: newMessage,
          userId: chatSession.userId._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Add the new message to the list optimistically
      const tempMessage: Message = {
        _id: `temp-${Date.now()}`,
        senderId: astrologerId,
        message: newMessage,
        timestamp: new Date().toISOString(),
        messageType: 'text',
      };

      setMessages((prev) => [...prev, tempMessage]);
      setNewMessage('');
      
      // Fetch the updated messages
      const updatedResponse = await fetch(`/api/astrologer/chat?id=${chatSession._id}`);
      const updatedData = await updatedResponse.json();
      
      if (updatedData.messages) {
        setMessages(updatedData.messages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return '';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <Box p={2} borderBottom="1px solid rgba(255,255,255,0.1)" display="flex" alignItems="center" gap={2}>
        <Avatar 
          src={chatSession.userId.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${chatSession.userId.name}`}
          alt={chatSession.userId.name}
          sx={{
            border: chatSession.status === 'active' ? '2px solid #10B981' : undefined
          }}
        >
          {chatSession.userId.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={500} className="text-white">
            {chatSession.userId.name}
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
            {chatSession.status === 'active' ? 'Active' : 'Inactive'} • Started {formatDistanceToNow(new Date(chatSession.startTime), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      {/* Messages Container */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          backgroundColor: '#1F2937'
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress size={30} className="text-blue-500" />
          </Box>
        ) : messages.length === 0 ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100%"
            p={3}
            textAlign="center"
          >
            <Typography sx={{ color: '#9CA3AF' }}>
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          messages.map((message) => {
            const isAstrologer = message.senderId === astrologerId;
            
            return (
              <Box
                key={message._id}
                sx={{
                  display: 'flex',
                  justifyContent: isAstrologer ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    borderRadius: 2,
                    p: 1.5,
                    backgroundColor: isAstrologer 
                      ? '#3B82F6' 
                      : '#374151',
                    color: isAstrologer ? 'white' : '#D1D5DB',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    borderTopRightRadius: isAstrologer ? 0 : undefined,
                    borderTopLeftRadius: !isAstrologer ? 0 : undefined,
                  }}
                >
                  <Typography variant="body1">{message.message}</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 0.5, 
                      textAlign: 'right',
                      color: isAstrologer ? 'rgba(255,255,255,0.7)' : '#9CA3AF'
                    }}
                  >
                    {formatMessageTime(message.timestamp)}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box p={2} borderTop="1px solid rgba(255,255,255,0.1)" bgcolor="#111827">
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 8 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#374151',
                color: 'white',
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6'
                },
                '&:hover fieldset': {
                  borderColor: '#60A5FA'
                },
                '& fieldset': {
                  borderColor: '#4B5563'
                }
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9CA3AF'
              }
            }}
          />
          <IconButton 
            type="submit" 
            disabled={!newMessage.trim()}
            sx={{ 
              bgcolor: newMessage.trim() ? '#3B82F6' : '#4B5563', 
              color: 'white',
              '&:hover': {
                bgcolor: newMessage.trim() ? '#2563EB' : '#4B5563',
              }
            }}
          >
            <Send size={16} />
          </IconButton>
        </form>
      </Box>
    </Box>
  );
} 