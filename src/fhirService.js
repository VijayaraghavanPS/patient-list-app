import axios from 'axios';

const BASE_URL = 'https://hapi.fhir.org/baseR4';

export const getPatients = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/Patient`);
        return response.data;
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

export const createPatient = async (patient) => {
    try {
        const response = await axios.post(`${BASE_URL}/Patient`, {
            resourceType: "Patient",
            name: [
                {
                    use: "official",
                    family: patient.family,
                    given: [patient.given]
                }
            ],
            gender: patient.gender,
            birthDate: patient.birthDate
        });
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

export const updatePatient = async (id, patient) => {
    try {
        const response = await axios.put(`${BASE_URL}/Patient/${id}`, {
            resourceType: "Patient",
            id: id,  // Make sure to include the ID in the body
            name: [
                {
                    use: "official",
                    family: patient.family,
                    given: [patient.given]
                }
            ],
            gender: patient.gender,
            birthDate: patient.birthDate
        });
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

export const searchPatients = async (searchParams) => {
    try {
        const query = new URLSearchParams(searchParams).toString();
        const response = await axios.get(`${BASE_URL}/Patient?${query}`);
        return response.data;
    } catch (error) {
        console.error('Error searching patients:', error);
        throw error;
    }
};
