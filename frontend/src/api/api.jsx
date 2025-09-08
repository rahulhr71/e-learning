import axios from "axios";
import { useState, useEffect } from "react";
const API = axios.create({ baseURL: "http://localhost:4000/api" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
}
);
export const api = API;
export const fetchCourse = (id) => API.get(`/videos/getvideos/${id}`);


