import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getAlbums } from '../../Api';
import './Albums.css';

interface IState {
    Albums: Array<IAlbum>
}

export interface IAlbum {
    id?: number,
    title: string,
    year: string,
    genre: string,
    coverUrl: string
}

class Albums extends Component<{}, IState> {
    state = {
        Albums: new Array<IAlbum>()
    }
    componentDidMount() {
        getAlbums
        .then(data => this.setState({
            Albums: data as Array<IAlbum>
        }))
        .catch(err => console.error(err));
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
                            </tr>
                            {this.state.Albums.map(album => (
                                <tr key={album.id}>
                                    <td>{album.title}</td>
                                    <td>{album.year}</td>
                                    <td>{album.genre}</td>
                                    <td><img className="albums-cover" src={album.coverUrl} alt={album.title + ' cover photo.'}/></td>
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