import axios from "axios";

const api = axios.create({
  baseURL: "https://inknest-backend-36m2.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;