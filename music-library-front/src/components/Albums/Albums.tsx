import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getAlbums, deleteAlbum } from '../../Api';
import './Albums.css';
import { ISong } from '../Songs/Songs';
import { IArtist } from '../Artists/Artists';
import { type } from 'os';

interface IState {
    Albums: Array<IAlbum>
}

export interface IAlbum {
    id?: number,
    title: string,
    year: string,
    genre: string,
    coverUrl: string,
    albumsSongs?: Array<IAlbumSong>
    albumsArtists?: Array<IAlbumArtist>
}

export interface IAlbumArtist {
    albumId: number,
    artistId: number,
    artist: IArtist
}

export interface IAlbumSong {
    albumId: number,
    songId: number,
    song: ISong
}

class Albums extends Component<{}, IState> {
    state = {
        Albums: new Array<IAlbum>()
    }

    componentDidMount() {
        this.refreshAlbums();
    }

    refreshAlbums = () =>
        getAlbums((data: any) => this.setState({
            Albums: data as Array<IAlbum>
        }), (error: Error) => console.log(error));

    onDelete = (id: number | undefined) => {
        if(typeof id === 'undefined')
            return;
        deleteAlbum(id)
            .then(data => this.refreshAlbums())    
            .catch(Error => console.log(Error));
    }

    render (){
        return (
            <Fragment>
                <div className="list-component-header">
                    <h1 className="list-component-title">Browse albums</h1>
                    <button className="new-entry-button"><Link to="/albums/add" >+New Album</Link></button>
                </div>
                {this.state.Albums.length && 
                    <table>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Genre</th>
                                <th>Cover</th>
                                <th>Action</th>                       
                            </tr>
                            {this.state.Albums.map(album => (
                                <tr key={album.id}>
                                    <td><Link to={`/albums/${album.id}`}>{album.title}</Link></td>
                                    <td>{album.year}</td>
                                    <td>{album.genre}</td>
                                    <td><img className="albums-cover" src={album.coverUrl} alt={album.title + ' cover photo.'}/></td>
                                    <td><button 
                                            onClick={() => this.onDelete(album.id)}
                                            className="delete-button">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Fragment>
        )
    }
};

export default Albums;