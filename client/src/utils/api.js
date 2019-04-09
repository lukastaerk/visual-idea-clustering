import axios from "axios";

const LOCAL_ENDPOINT = "http://localhost:8080/";
const dev_ENDPOINT = "http://58.84.34.65:8081/";

export const IMAGE_ENDPOINT = "http://localhost:8080";
// const IMAGE_ENDPOINT = 'http://58.84.34.65:8081'

const apiEndpoint = axios.create({
  baseURL: LOCAL_ENDPOINT
  /* other custom settings */
});

export default apiEndpoint;
