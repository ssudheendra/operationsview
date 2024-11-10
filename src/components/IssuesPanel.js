// src/components/IssuesPanel.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Dialog, DialogTitle, DialogContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Assignment, CheckCircle, BarChart } from '@mui/icons-material';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { CSVLink } from "react-csv";

const mockData = [
  { sno: 1, issue: "Network Lag", description: "Slow network detected in server", createdDate: "2024-11-01", eta: "2024-11-05", closed: "No", closedBy: "" },
  { sno: 2, issue: "Login Issue", description: "Failed login attempts", createdDate: "2024-11-02", eta: "2024-11-06", closed: "Yes", closedBy: "Admin" },
  { sno: 3, issue: "Data Sync", description: "Data mismatch", createdDate: "2024-11-03", eta: "2024-11-07", closed: "No", closedBy: "" },
  { sno: 4, issue: "High Latency", description: "Latency spikes in network", createdDate: "2024-11-04", eta: "2024-11-08", closed: "Yes", closedBy: "Tech Team" },
  { sno: 5, issue: "Error Code 500", description: "Internal Server Error", createdDate: "2024-11-05", eta: "2024-11-09", closed: "No", closedBy: "" },
];

const tilesData = [
  { title: 'Current Issues', icon: <Assignment color="error" />, count: 10 },
  { title: 'Resolved Issues', icon: <CheckCircle color="success" />, count: 25 },
  { title: 'Reports', icon: <BarChart color="primary" />, count: 5 },
];

function IssuesPanel() {
  const [open, setOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);

  const handleClickOpen = (tile) => {
    setSelectedTile(tile);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTile(null);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Issue Report", 14, 10);
    doc.autoTable({
      head: [["Sno", "Issue", "Description", "Created Date", "ETA", "Closed", "Closed By"]],
      body: mockData.map((row) => [
        row.sno,
        row.issue,
        row.description,
        row.createdDate,
        row.eta,
        row.closed,
        row.closedBy,
      ]),
    });
    doc.save("Issue_Report.pdf");
  };

  const emailReport = () => {
    const mailtoLink = `mailto:?subject=Issue Report&body=${encodeURIComponent("Please find the attached issue report.")}`;
    window.location.href = mailtoLink;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {tilesData.map((tile, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                height: 80,
                cursor: 'pointer',
              }}
              onClick={() => handleClickOpen(tile)}
            >
              <Box display="flex" alignItems="center">
                {tile.icon}
                <Typography variant="h6" ml={1}>
                  {tile.title}
                </Typography>
              </Box>
              <Typography variant="h5" color="text.secondary">
                {tile.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{selectedTile ? selectedTile.title : ''} Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sno</TableCell>
                  <TableCell>Issue</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>ETA</TableCell>
                  <TableCell>Closed</TableCell>
                  <TableCell>Closed By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.sno}>
                    <TableCell>{row.sno}</TableCell>
                    <TableCell>{row.issue}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.createdDate}</TableCell>
                    <TableCell>{row.eta}</TableCell>
                    <TableCell>{row.closed}</TableCell>
                    <TableCell>{row.closedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" sx={{ mr: 1 }}>
              <CSVLink data={mockData} filename="Issue_Report.csv" style={{ color: 'inherit', textDecoration: 'none' }}>
                Export CSV
              </CSVLink>
            </Button>
            <Button variant="contained" color="secondary" onClick={exportToPDF} sx={{ mr: 1 }}>
              Export PDF
            </Button>
            <Button variant="contained" color="info" onClick={emailReport}>
              Email
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default IssuesPanel;
