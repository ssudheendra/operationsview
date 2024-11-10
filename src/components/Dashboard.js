// src/components/Dashboard.js
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Tile from './Tile';

function Dashboard({ onTileClick }) {
  const tiles = ['Trading', 'Mutual Funds', 'Retirement'];
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Operations AI Assistant</Typography>
      <Grid container spacing={2}>
        {tiles.map(tile => (
          <Grid item xs={4} key={tile}>
            <Tile title={tile} onClick={() => onTileClick(tile)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
