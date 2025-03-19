import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [vacancies, setVacancies] = useState([]);
    const [hhId, setHhId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/vacancy/create',
                { hh_id: hhId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setVacancies([...vacancies, response.data]);
            setHhId('');
        } catch (error) {
            console.error('Error creating vacancy:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4>Vacancies</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="hhId" className="form-label">HH ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="hhId"
                            value={hhId}
                            onChange={(e) => setHhId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create Vacancy</button>
                </form>
                {vacancies.length === 0 ? (
                    <p>No vacancies found.</p>
                ) : (
                    <div className="list-group">
                        {vacancies.map((vacancy) => (
                            <div key={vacancy.id} className="list-group-item">
                                <h5>{vacancy.company_name}</h5>
                                <p>{vacancy.company_address}</p>
                                {vacancy.company_logo && (
                                    <img src={vacancy.company_logo} alt="Company Logo" className="img-fluid mb-3" />
                                )}
                                <div className="vacancy-description" dangerouslySetInnerHTML={{__html: vacancy.vacancy_description}}/>
                                <p>Status: {vacancy.status}</p>
                                <p>Created At: {new Date(vacancy.created_at).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobList;
