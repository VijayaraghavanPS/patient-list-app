import React, { useState } from 'react';
import { searchPatients } from '../fhirService';

const SearchPatient = () => {
    const [searchParams, setSearchParams] = useState({ name: '', phone: '' });
    const [patients, setPatients] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await searchPatients(searchParams);
        setPatients(data.entry ? data.entry.map(entry => entry.resource) : []);
    };

    return (
        <div>
            <h2>Search Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={searchParams.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" name="phone" value={searchParams.phone} onChange={handleChange} />
                </div>
                <button type="submit">Search</button>
            </form>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.name[0].text} - {patient.gender} - {patient.birthDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPatient;
