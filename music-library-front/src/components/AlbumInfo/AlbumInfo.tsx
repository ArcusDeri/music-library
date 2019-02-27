import React, { Component, Fragment } from 'react';
import { RouteProps } from 'react-router-dom';

import { getSingleAlbum } from '../../Api';
import { IAlbum, IAlbumArtist, IAlbumSong } from '../Albums/Albums';
import './AlbumInfo.css';

interface IState {
    Album: IAlbum
}

interface IProps {
    match: any;
}

class AlbumInfo extends Component<IProps, IState> {

    state = {
        Album: {
            title: '',
            year: '',
            genre: '',
            coverUrl: '',
            albumsArtists: new Array<IAlbumArtist>(),
            albumsSongs: new Array<IAlbumSong>()        
        }
    }

    componentDidMount() {
        getSingleAlbum(this.props.match.params.id)
        .then(data => {
            this.setState({
                Album: data as IAlbum
            });
        })
        .catch(err => console.error(err));
    }

    ensureHasArtists = () => {
        if(this.state.Album && this.state.Album.albumsArtists)
            return this.state.Album.albumsArtists.length > 0;
        return false;
    }

    ensureHasSongs = () => {
        if(this.state.Album && this.state.Album.albumsSongs)
            return this.state.Album.albumsSongs.length > 0;
        return false;
    }

    render (){
        return (
            <Fragment>
                
                <div className="list-component-header">
                    <img src={this.state.Album.coverUrl} alt="cover image" />
                    <h1 className="list-component-title">{`${this.state.Album.title}- ${this.state.Album.genre}, ${this.state.Album.year}`}</h1>
                </div>

                {this.ensureHasArtists() &&
                    <Fragment>
                    <h2>Artists</h2>
                    <ul>
                        {this.state.Album.albumsArtists.map(albumArtist => (
                            <li key={albumArtist.artist.id}>
                                {`${albumArtist.artist.name} ${albumArtist.artist.surname}`}
                            </li>
                        ))
                        }
                    </ul>
                    </Fragment>
                }
                {this.ensureHasSongs() &&
                    <Fragment>
                    <h2>Songs</h2>
                    <ul>
                        {this.state.Album.albumsSongs.map(albumSong => (
                            <li key={albumSong.song.id}>
                                {`${albumSong.song.title} ${albumSong.song.length}`}
                            </li>
                        ))
                        }
                    </ul>
                    </Fragment>
                }
            </Fragment>
        )
    }
};

export default AlbumInfo;