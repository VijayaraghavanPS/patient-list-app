import React, { useState, useEffect } from 'react';
import { getPatients } from './fhirService';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import { Container, Button, Typography, Dialog, DialogContent, AppBar, Toolbar } from '@mui/material';

function App() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const data = await getPatients();
            const patientList = data.entry ? data.entry.map(entry => entry.resource) : [];
            setPatients(patientList);
            setFilteredPatients(patientList);
        } catch (err) {
            console.error('Error fetching patients:', err);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        setIsCreating(false);
        setOpenForm(true);
    };

    const handleCreatePatient = () => {
        setSelectedPatient(null);
        setIsCreating(true);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        fetchPatients(); // Refresh the patient list after creating/updating
    };

    const handleSearch = (searchTerm) => {
        const filtered = patients.filter(patient => {
            const name = patient.name && patient.name.length > 0 ? patient.name[0].text || `${patient.name[0].given?.join(' ')} ${patient.name[0].family}` : 'No Name';
            const phone = patient.telecom && patient.telecom.find(t => t.system === 'phone') ? patient.telecom.find(t => t.system === 'phone').value : '';
            return name.toLowerCase().includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
        });
        setFilteredPatients(filtered);
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FHIR Patient Management
                    </Typography>
                    <Button color="inherit" onClick={handleCreatePatient}>Create Patient</Button>
                </Toolbar>
            </AppBar>
            <main>
                <PatientList patients={filteredPatients} onPatientSelect={handlePatientSelect} onSearch={handleSearch} />
                <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
                    <DialogContent>
                        <PatientForm patient={selectedPatient} isCreating={isCreating} onClose={handleCloseForm} />
                    </DialogContent>
                </Dialog>
            </main>
        </Container>
    );
}

export default App;
