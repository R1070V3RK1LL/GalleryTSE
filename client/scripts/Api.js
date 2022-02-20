// Api.js
import axios from "axios";

// Crée une instance d'axios qui utilise l'url de base suivante:
const axiosAPI = axios.create({
  baseURL : "http://localhost:8080/api/photos"
});

// Méthode exécutant toutes les requêtes
const apiRequest = (method, url, request) => {
    const headers = {
        authorization: ""
    };
    //utilisant l'instance axios pour réaliser la requête reçue pour chaque méthode http
    return axiosAPI({
        method,
        url,
        data: request,
        params: request,
        headers
      }).then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
};

// fonction qui exécute la requête http get
const get = (url, request) => apiRequest("get",url,request);

// fonction qui exécute la requête http delete
const deleteRequest = (url, request) =>  apiRequest("delete", url, request);

// fonction qui exécute la requête http post
const post = (url, request) => apiRequest("post", url, request);

// fonction qui exécute la requête http put
const put = (url, request) => apiRequest("put", url, request);

// fonction qui exécute la requête http patch
const patch = (url, request) =>  apiRequest("patch", url, request);

// partager la méthode pour les autres services
const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;