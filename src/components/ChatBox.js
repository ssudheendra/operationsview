// src/components/ChatBox.js
import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/material/styles';

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  left: '50%',
  transform: 'translateX(-50%)',
  padding: theme.spacing(2),
  width: '80%',
  maxWidth: 700, // Increase max width
  maxHeight: 400, // Increased height for expanded chat view
  display: 'flex',
  flexDirection: 'column',
}));

const MessageBox = styled(Box)(({ theme, sender }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  maxWidth: '70%',
  alignSelf: sender === 'User' ? 'flex-end' : 'flex-start',
  backgroundColor: sender === 'User' ? theme.palette.primary.light : theme.palette.grey[300],
  color: sender === 'User' ? theme.palette.common.white : theme.palette.text.primary,
}));

function ChatBox() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setChatHistory((prevHistory) => [...prevHistory, { sender: 'User', message: input }]);
    const userMessage = input;
    setInput('');

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'AI Assistant', message: 'Processing your request...' }
    ]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100);

      const res = await fetch('http://localhost:1039/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let botResponse = 'Mock response: Could not fetch actual response in time.';
      if (res.ok) {
        const data = await res.json();
        botResponse = data.response || botResponse;
      }

      setChatHistory((prevHistory) =>
        prevHistory.map((msg) =>
          msg.message === 'Processing your request...' ? { sender: 'AI Assistant', message: botResponse } : msg
        )
      );
    } catch (error) {
      setChatHistory((prevHistory) =>
        prevHistory.map((msg) =>
          msg.message === 'Processing your request...' ? { sender: 'AI Assistant', message: 'Mock response: Could not fetch actual response in time.' } : msg
        )
      );
    }
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachments([...attachments, file]);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'User', message: `📎 Attached: ${file.name}`, file }
      ]);
    }
  };

  return (
    <ChatContainer elevation={3}>
      {/* Chat history display */}
      <Box mb={2} maxHeight={300} overflow="auto" sx={{ display: 'flex', flexDirection: 'column' }}>
        {chatHistory.map((entry, index) => (
          <MessageBox key={index} sender={entry.sender}>
            <Typography variant="body2" gutterBottom>{entry.sender}:</Typography>
            <Typography variant="body1">{entry.message}</Typography>
            {entry.file && (
              <Typography variant="caption" color="primary" onClick={() => window.open(URL.createObjectURL(entry.file), '_blank')}>
                {entry.file.name}
              </Typography>
            )}
          </MessageBox>
        ))}
      </Box>

      {/* Input field, attachment, and send button */}
      <Box display="flex" alignItems="center">
        <IconButton color="primary" component="label">
          <AttachFileIcon />
          <input type="file" hidden onChange={handleAttachmentChange} />
        </IconButton>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </ChatContainer>
  );
}

export default ChatBox;
