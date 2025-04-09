import { Box, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography, Badge } from '@mui/material';
import { format, formatDistance } from 'date-fns';
import { MessageSquare } from 'lucide-react';

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

interface ChatListProps {
  chatSessions: ChatSession[];
  selectedChatId: string | undefined;
  onSelectChat: (chatSession: ChatSession) => void;
}

export function ChatList({ chatSessions, selectedChatId, onSelectChat }: ChatListProps) {
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (date.getTime() > today.getTime()) {
        return format(date, 'h:mm a');
      } else {
        return formatDistance(date, now, { addSuffix: true });
      }
    } catch (e) {
      return 'Unknown time';
    }
  };

  return (
    <Box sx={{ overflow: 'auto', flex: 1, bgcolor: 'transparent' }}>
      <List disablePadding>
        {chatSessions.map((chat) => (
          <ListItem 
            key={chat._id} 
            disablePadding
            divider
            sx={{
              backgroundColor: selectedChatId === chat._id 
                ? 'rgba(59, 130, 246, 0.2)' 
                : 'transparent',
              borderBottom: '1px solid rgba(75, 85, 99, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }
            }}
          >
            <ListItemButton onClick={() => onSelectChat(chat)}>
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={chat.status === 'active' ? 'success' : 'default'}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: chat.status === 'active' ? '#10B981' : '#6B7280'
                    }
                  }}
                >
                  <Avatar 
                    src={chat.userId.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${chat.userId.name}`} 
                    alt={chat.userId.name}
                    sx={{
                      border: chat.status === 'active' ? '2px solid #10B981' : undefined
                    }}
                  >
                    {chat.userId.name.charAt(0)}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle2" 
                    noWrap 
                    sx={{ 
                      fontWeight: 500,
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: selectedChatId === chat._id ? 'white' : '#D1D5DB'
                    }}
                  >
                    <span>{chat.userId.name}</span>
                    <Typography 
                      variant="caption" 
                      component="span"
                      sx={{ color: '#9CA3AF' }}
                    >
                      {formatTime(chat.startTime)}
                    </Typography>
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body2" 
                    noWrap
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      color: '#9CA3AF'
                    }}
                  >
                    <MessageSquare size={12} />
                    <span>{chat.lastMessage || 'No messages'}</span>
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 