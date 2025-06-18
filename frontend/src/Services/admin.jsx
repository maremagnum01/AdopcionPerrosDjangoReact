import axios from 'axios';

const admin = axios.create({
    baseURL: "http://localhost:8000/admin/"
});

export default admin;