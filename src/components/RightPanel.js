// src/components/RightPanel.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function RightPanel() {
  return (
    <Box p={2}>
      <Typography variant="h6">Graph (Mock)</Typography>
      {/* Placeholder for graph - add graph component here */}
      <Typography variant="h6" mt={2}>Top Issues List (Mock)</Typography>
      {/* Placeholder for issues list */}
    </Box>
  );
}

export default RightPanel;
