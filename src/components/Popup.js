// src/components/Popup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ExportButtonGroup from './ExportButtonGroup';

function Popup({ title, issues, onClose }) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <ExportButtonGroup />
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Issue</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>ETA</th>
              <th>Closed</th>
              <th>Closed By</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{issue.issue}</td>
                <td>{issue.description}</td>
                <td>{issue.createdDate}</td>
                <td>{issue.eta}</td>
                <td>{issue.closed ? 'Yes' : 'No'}</td>
                <td>{issue.closedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;
    