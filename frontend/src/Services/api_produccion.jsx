import axios from "axios";

const api = axios.create({
    baseURL: "https://adopcionperrosdjangoreact.onrender.com/api/"
});

export default api;