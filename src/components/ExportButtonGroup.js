// src/components/ExportButtonGroup.js
import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableViewIcon from '@mui/icons-material/TableView';

function ExportButtonGroup() {
  const handleExport = (format) => {
    // Placeholder function for handling exports
    console.log(`Exporting as ${format}`);
  };

  return (
    <ButtonGroup variant="contained" color="primary" aria-label="export button group">
      <Button onClick={() => handleExport('email')} startIcon={<EmailIcon />}>Email</Button>
      <Button onClick={() => handleExport('pdf')} startIcon={<PictureAsPdfIcon />}>PDF</Button>
      <Button onClick={() => handleExport('csv')} startIcon={<TableViewIcon />}>CSV</Button>
    </ButtonGroup>
  );
}

export default ExportButtonGroup;
