import axios from "axios";

export const _baseUrl =
  process.env.REACT_APP_API_URL || "http://localhost:6325";
const customAxios = axios.create({
  baseURL: _baseUrl,
});

export default customAxios;
