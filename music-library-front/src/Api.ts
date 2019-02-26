import axios from 'axios';
import { IAlbum } from './components/Albums/Albums';

const apiRoot = 'https://localhost:44347/api/';
const endpoints = {
    allAlbums: apiRoot + 'Albums',
    allSongs: apiRoot + 'Songs',
    allArtists: apiRoot + 'Artists'
};

const getAlbums = new Promise((resolve, reject) => {
    axios.get(endpoints.allAlbums)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
});

const addAlbum = (newAlbum: IAlbum) => new Promise((resolve, reject) => {
    axios.post(endpoints.allAlbums, newAlbum)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

const getSongs = new Promise((resolve, reject) => {
    axios.get(endpoints.allSongs)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

const getArtists = new Promise((resolve, reject) => {
    axios.get(endpoints.allArtists)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

export { getAlbums, addAlbum, getSongs, getArtists };