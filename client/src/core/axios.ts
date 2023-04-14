import axios from "axios";

axios.defaults.baseURL = window.location.origin.replace("3000", "5000");
axios.defaults.headers.common["token"] = window.localStorage.token;

(window as any).axios = axios;

export default axios;
