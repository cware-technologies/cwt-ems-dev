import axios from "axios";
import { getAuthToken } from "./utils";

export const addAuthHeaderAsBearerToken = () => {
    console.log("axios config")
    let token = getAuthToken();
    if(token){
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `bearer ${token.token}`;
            return config;
          }, function (error) {
            return
          });
    }
    
}