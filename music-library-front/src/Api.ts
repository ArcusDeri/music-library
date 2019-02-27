import axios from 'axios';
import { IAlbum } from './components/Albums/Albums';

const apiRoot = 'https://localhost:44347/api/';
const endpoints = {
    albums: apiRoot + 'Albums',
    songs: apiRoot + 'Songs',
    artists: apiRoot + 'Artists'
};

const getAlbums = (resolve: Function, reject: Function) => {
    console.log('in get albums');
    axios.get(endpoints.albums)
        .then(Response =>{ 
            console.log('gettn albums');resolve(Response.data)})
        .catch(Error => reject(Error));
};

const addAlbum = (newAlbum: IAlbum) => new Promise((resolve, reject) => {
    axios.post(endpoints.albums, newAlbum)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

const getSongs = new Promise((resolve, reject) => {
    axios.get(endpoints.songs)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

const getArtists = new Promise((resolve, reject) => {
    axios.get(endpoints.artists)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

const getSingleAlbum = (id: number) => new Promise((resolve, reject) => {
    axios.get(`${endpoints.albums}/${id}`)
        .then(Response => resolve(Response.data[0]))
        .catch(Error => reject(Error));
})

const deleteAlbum = (id: number) => new Promise((resolve, reject) => {
    axios.delete(`${endpoints.albums}/${id}`)
        .then(Response => resolve(Response.data))
        .catch(Error => reject(Error));
})

export { getAlbums, addAlbum, getSongs, getArtists, getSingleAlbum, deleteAlbum };