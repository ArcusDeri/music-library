import axios from 'axios';

const apiRoot = 'https://localhost:44347/api/';
const endpoints = {
    allAlbums: apiRoot + 'Albums'
};

const getAlbums = new Promise((resolve, reject) => {
    axios.get(endpoints.allAlbums)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
});

export { getAlbums };