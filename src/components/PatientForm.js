import React, { useState, useEffect } from 'react';
import { createPatient, updatePatient } from '../fhirService';
import { TextField, Button, Typography, Box } from '@mui/material';

const PatientForm = ({ patient, isCreating, onClose }) => {
    const [formData, setFormData] = useState({ family: '', given: '', gender: '', birthDate: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (patient && !isCreating) {
            const name = patient.name[0];
            setFormData({
                family: name.family || '',
                given: name.given ? name.given.join(' ') : '',
                gender: patient.gender || '',
                birthDate: patient.birthDate || ''
            });
        } else {
            setFormData({ family: '', given: '', gender: '', birthDate: '' });
        }
    }, [patient, isCreating]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isCreating) {
                await createPatient(formData);
            } else {
                await updatePatient(patient.id, formData);
            }
            alert('Patient saved!');
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>{isCreating ? 'Create Patient' : 'Update Patient'}</Typography>
            <TextField
                fullWidth
                label="Family Name"
                name="family"
                value={formData.family}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Given Name"
                name="given"
                value={formData.given}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Birth Date"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" type="submit">{isCreating ? 'Create' : 'Update'}</Button>
                <Button variant="outlined" onClick={onClose}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default PatientForm;
