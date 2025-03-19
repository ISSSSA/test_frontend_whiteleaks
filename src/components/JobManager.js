import React, { useState } from 'react';
import axios from 'axios';
import '@tabler/core/dist/css/tabler.min.css';

const VacancyManager = () => {
    const [vacancy, setVacancy] = useState(null);
    const [vacancyId, setVacancyId] = useState('');
    const [formData, setFormData] = useState({
        company_address: '',
        company_logo: '',
        company_name: '',
        status: '',
        vacancy_description: '',
    });
    const API_URL = 'http://localhost:8000/api/v1/vacancy/'; // Замени на свой URL
    const JWT_TOKEN = localStorage.token; // Замени на актуальный токен

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
    });

    const fetchVacancy = async () => {
        try {
            const response = await axiosInstance.get(`get/${vacancyId}`);
            setVacancy(response.data);
            setFormData(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке вакансии:', error);
        }
    };

    const updateVacancy = async () => {
        console.log(formData)
        try {
            const response = await axiosInstance.put(`update`, formData);
            setVacancy(response.data);
        } catch (error) {
            console.error('Ошибка при обновлении вакансии:', error);
        }
    };

    const deleteVacancy = async () => {
        try {
            await axiosInstance.delete(`delete/${vacancyId}`);
            setVacancy(null);
            setFormData({ company_address: '', company_logo: '', company_name: '', status: '', vacancy_description: '' });
        } catch (error) {
            console.error('Ошибка при удалении вакансии:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="vacancy-manager p-4">
            <h1 className="text-xl font-bold mb-4">Управление вакансиями</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={vacancyId}
                    onChange={e => setVacancyId(e.target.value)}
                    className="w-full border p-2 mb-2"
                    placeholder="ID вакансии"
                />
                <button onClick={fetchVacancy} className="bg-blue-500 text-white p-2">Получить вакансию</button>
            </div>
            {vacancy && (
                <div className="mb-4">
                    <img src={formData.company_logo} alt="Company Logo" className="w-24 h-24 mb-2" />
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        className="w-full border p-2 mb-2"
                        placeholder="Название компании"
                    />
                    <input
                        type="text"
                        name="company_address"
                        value={formData.company_address}
                        onChange={handleInputChange}
                        className="w-full border p-2 mb-2"
                        placeholder="Адрес компании"
                    />
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full border p-2 mb-2"
                        placeholder="Статус вакансии"
                    />
                    <textarea
                        name="vacancy_description"
                        value={formData.vacancy_description}
                        onChange={handleInputChange}
                        className="w-full border p-2 mb-2"
                        placeholder="Описание вакансии"
                    />
                    <div dangerouslySetInnerHTML={{ __html: formData.vacancy_description }} className="border p-2 mb-4"></div>
                    <div className="mt-2">
                        <button onClick={updateVacancy} className="bg-yellow-500 text-white p-2 mx-1">Изменить</button>
                        <button onClick={deleteVacancy} className="bg-red-500 text-white p-2">Удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VacancyManager;