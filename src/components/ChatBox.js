// src/components/ChatBox.js
import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Typography, Paper, Radio, RadioGroup, FormControlLabel, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
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
  maxWidth: 700,
  maxHeight: 500,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
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

const mockTableData = [
  { sno: 1, issue: "Network Lag", description: "Slow network detected", createdDate: "2024-11-01", eta: "2024-11-05", closed: "No", closedBy: "" },
  { sno: 2, issue: "Login Issue", description: "Failed login attempts", createdDate: "2024-11-02", eta: "2024-11-06", closed: "Yes", closedBy: "Admin" },
];

function ChatBox() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setChatHistory((prevHistory) => [...prevHistory, { sender: 'User', message: userMessage }]);
    setInput('');

    if (userMessage.toLowerCase().includes("show table")) {
      setShowTable(true);
      return;
    } else {
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

  const handleRowSelect = (event) => {
    setSelectedRow(event.target.value);
  };

  const handleTableSubmit = async () => {
    if (!selectedRow) return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'User', message: `Submitting row ${selectedRow}` },
    ]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100);

      const res = await fetch('http://localhost:1009/accepted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedRow }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let responseMessage = 'Mock response: Request accepted.';
      if (res.ok) {
        const data = await res.json();
        responseMessage = data.message || responseMessage;
      }

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'AI Assistant', message: responseMessage },
      ]);
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'AI Assistant', message: 'Mock response: Request accepted.' },
      ]);
    }
  };

  return (
    <ChatContainer elevation={3}>
      {/* Mock Table Display */}
      {showTable && (
        <TableContainer component={Paper} sx={{ mb: 2, maxHeight: 150, overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Sno</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTableData.map((row) => (
                <TableRow key={row.sno}>
                  <TableCell>
                    <RadioGroup value={selectedRow} onChange={handleRowSelect}>
                      <FormControlLabel value={row.sno.toString()} control={<Radio />} label="" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>{row.sno}</TableCell>
                  <TableCell>{row.issue}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.createdDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" onClick={handleTableSubmit} sx={{ mt: 1 }}>
            Submit
          </Button>
        </TableContainer>
      )}

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
