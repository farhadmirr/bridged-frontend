import axios from "axios";

export default axios.create({
    baseURL:"http://test.local:8085",
    // withCredentials:true
});