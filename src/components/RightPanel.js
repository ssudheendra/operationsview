// src/components/RightPanel.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockGraphData = [
  { name: 'Jan', issues: 40 },
  { name: 'Feb', issues: 30 },
  { name: 'Mar', issues: 20 },
  { name: 'Apr', issues: 27 },
  { name: 'May', issues: 18 },
];

const mockIssues = [
  { title: "Network Delay", severity: "High", color: "#e57373" },
  { title: "Login Error", severity: "Medium", color: "#ffb74d" },
  { title: "Timeout Issue", severity: "Low", color: "#81c784" },
];

function RightPanel() {
  return (
    <Box>
      <Typography variant="h6" color="primary" gutterBottom>
        Issues Overview
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockGraphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="issues" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Typography variant="h6" color="primary" mt={2}>
        Recent Issues
      </Typography>
      <List>
        {mockIssues.map((issue, index) => (
          <ListItem key={index} sx={{ backgroundColor: issue.color, borderRadius: 1, my: 0.5 }}>
            <ListItemText primary={issue.title} secondary={`Severity: ${issue.severity}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RightPanel;
