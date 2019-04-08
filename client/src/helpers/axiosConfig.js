import axios from "axios";
import { getAuthToken } from "./utils";

export const addAuthHeaderAsBearerToken = () => {
    console.log("axios config")
    let token = getAuthToken();
    if(token){
        console.log("inside axios system! ",token.token)
        
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token.token}`;
            console.log('CONFIG: ', config)
            return config;
          }, function (error) {
            return
          });
    }
    
}