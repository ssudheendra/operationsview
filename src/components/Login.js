// src/components/Login.js
import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function Login({ onLogin }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh" bgcolor="background.default">
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: '400px' }}>
        <Typography variant="h4" gutterBottom align="center">Operations AI Assistant</Typography>
        <TextField label="Username" variant="outlined" fullWidth margin="normal" />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={onLogin} fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
