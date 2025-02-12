import axios from "axios";

const customFetch = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1`,
});

export default customFetch;
