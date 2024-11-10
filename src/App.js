// src/App.js
import React, { useState } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
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
  const onTileClick = (tile) => setSelectedTile(tile); // Track selected tile
  const toggleTheme = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <Dashboard onTileClick={onTileClick} />
            </Grid>
            {/* Render panels and chat box only if a tile is selected */}
            {selectedTile && (
              <>
                <Grid item xs={2}>
                  <IssuesPanel issues={mockIssues} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" p={2}>
                    Displaying details for {selectedTile}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <RightPanel />
                </Grid>
                {/* Chat box rendered at the bottom center of the screen */}
                <ChatBox />
              </>
            )}
          </Grid>
        )}
        {/* Theme toggle button */}
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
