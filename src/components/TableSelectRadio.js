// src/components/TableWithRadioSelect.js
import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const mockData = [
  { sno: 1, issue: "Network Lag", description: "Slow network detected in server", createdDate: "2024-11-01", eta: "2024-11-05", closed: "No", closedBy: "" },
  { sno: 2, issue: "Login Issue", description: "Failed login attempts", createdDate: "2024-11-02", eta: "2024-11-06", closed: "Yes", closedBy: "Admin" },
  { sno: 3, issue: "Data Sync", description: "Data mismatch", createdDate: "2024-11-03", eta: "2024-11-07", closed: "No", closedBy: "" },
  { sno: 4, issue: "High Latency", description: "Latency spikes in network", createdDate: "2024-11-04", eta: "2024-11-08", closed: "Yes", closedBy: "Tech Team" },
  { sno: 5, issue: "Error Code 500", description: "Internal Server Error", createdDate: "2024-11-05", eta: "2024-11-09", closed: "No", closedBy: "" },
];

function TableWithRadioSelect() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [submitResponse, setSubmitResponse] = useState(null);

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleSubmit = async () => {
    if (!selectedRow) return;

    try {
      const response = await axios.post('http://localhost:1009/accepted', selectedRow);
      setSubmitResponse(response.data);
    } catch (error) {
      console.error("Error submitting selected row:", error);
      setSubmitResponse({ error: "Failed to submit the selected row." });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:9000/search', { params: { query: searchQuery } });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResults([]);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Issues Table</Typography>
      
      {/* Search Bar */}
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      
      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
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
            {(searchResults.length ? searchResults : mockData).map((row) => (
              <TableRow key={row.sno} hover selected={selectedRow && selectedRow.sno === row.sno}>
                <TableCell padding="checkbox">
                  <Radio
                    checked={selectedRow && selectedRow.sno === row.sno}
                    onChange={() => handleRowSelect(row)}
                  />
                </TableCell>
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

      {/* Submit Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={!selectedRow}>
          Submit Selected Row
        </Button>
      </Box>

      {/* Submit Response */}
      {submitResponse && (
        <Box mt={2}>
          <Typography variant="subtitle1">Response:</Typography>
          <Typography variant="body2">{JSON.stringify(submitResponse, null, 2)}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TableWithRadioSelect;
