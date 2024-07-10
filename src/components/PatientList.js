import React from 'react';
import { List, ListItem, ListItemText, TextField, Typography } from '@mui/material';

const PatientList = ({ patients, onPatientSelect, onSearch }) => {
    const formatPatient = (patient) => {
        const name = patient.name && patient.name.length > 0 ? patient.name[0].text || `${patient.name[0].given?.join(' ')} ${patient.name[0].family}` : 'No Name';
        const gender = patient.gender || '-';
        const birthDate = patient.birthDate ? new Date(patient.birthDate).toISOString().split('T')[0] : '-';
        return `${name} - ${gender} - ${birthDate}`;
    };

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>Patients on the Server</Typography>
            <TextField fullWidth placeholder="Search by name or phone number (exact)" variant="outlined" margin="normal" onChange={handleSearchChange} />
            <List>
                {patients.map(patient => (
                    <ListItem button key={patient.id} onClick={() => onPatientSelect(patient)}>
                        <ListItemText primary={formatPatient(patient)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PatientList;
