// // src/api.js
// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:8000/tracker/' });

// // === Income APIs ===
// export const getIncomes = () => API.get('incomes/');
// export const postIncome = (data) => API.post('incomes/create/', data);
// export const deleteIncome = (id) => API.delete(`incomes/${id}/`);

// // === Expense APIs ===
// export const getExpense = () => API.get('expenses/');
// export const postExpense = (data) => API.post('expenses/create/', data);
// export const deleteExpense = (id) => API.delete(`expenses/${id}/`);

// src/api.js
import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8000/',
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginUser = (data) => API.post('tracker/login/', data);
export const registerUser = (data) => API.post('tracker/register/', data);
export const getProfile = () => API.get('tracker/profile/'); 
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};


export const getIncomes = () => API.get('tracker/incomes/');
export const postIncome = (data) => API.post('tracker/incomes/create/', data);
export const deleteIncome = (id) => API.delete(`tracker/incomes/${id}/`);


export const getExpense = () => API.get('tracker/expenses/');
export const postExpense = (data) => API.post('tracker/expenses/create/', data);
export const deleteExpense = (id) => API.delete(`tracker/expenses/${id}/`);








