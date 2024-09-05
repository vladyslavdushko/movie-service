import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/'
});
