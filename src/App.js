// src/App.js
import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import IssuesPanel from './components/IssuesPanel';
import RightPanel from './components/RightPanel';
import ChatBox from './components/ChatBox';
import { mockIssues } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const onTileClick = (tile) => setSelectedTile(tile);
  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: darkMode ? '#90caf9' : '#1976d2' },
      background: { default: darkMode ? '#121212' : '#f5f5f5' },
    },
    typography: { fontFamily: 'Arial, sans-serif' },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: theme.palette.background.default }}>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={12}>
              <Dashboard onTileClick={onTileClick} />
            </Grid>
            {selectedTile && (
              <>
                <Grid item xs={2}>
                  <Paper elevation={3} sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
                    <IssuesPanel issues={mockIssues} />
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper elevation={3} sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
                    <Typography variant="h6" color="primary" mb={2}>
                      Displaying details for {selectedTile}
                    </Typography>
                    {/* Add additional content or details related to the selectedTile here */}
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Paper elevation={3} sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
                    <RightPanel />
                  </Paper>
                </Grid>
                <ChatBox />
              </>
            )}
          </Grid>
        )}
        <Box position="fixed" bottom={16} right={16}>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
