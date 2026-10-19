/**
 * ATTENTION
 * Axios’s default is 0, which means no timeout. The request can hang forever if the server never answers.
    if the server is slow or down, your dashboard would show a loading spinner forever. A timeout lets you show “Server not responding, try again.” Your current code has no timeout, so adding timeout: 10000 is a good improvement.
 * 
 * "Content-Type": "application/json": Future NOTE:
        bcz uploading Image files, PDFs -> binary data (File, Blob) -> these need FormData
 * 
 */


import axios from "axios";

/** initial code: without timeout -------------*/
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

/** TRIAL: with timout */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api", timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  } // // ** in case file needs to be updated. bcz:
    // uploading Image files, PDFs -> binary data (File, Blob) -> these need FormData
});

// token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("nilus_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;