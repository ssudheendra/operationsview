// src/components/Tile.js
import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

function Tile({ title, onClick }) {
  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" align="center">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Tile;
