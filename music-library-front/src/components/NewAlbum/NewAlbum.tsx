import React, { Component, Fragment } from 'react';

import { IAlbum } from '../Albums/Albums';
import { addAlbum } from '../../Api';
import './NewAlbum.css';
import { Redirect } from 'react-router';

interface IState {
    newAlbum: IAlbum,
    isFormValid: boolean,
    redirectToAlbums: boolean
}

class NewAlbum extends Component<{}, IState> {

    state = {
        newAlbum: {
            title: '',
            year: '',
            genre: '',
            coverUrl: ''
        },
        isFormValid: false,
        redirectToAlbums: false
    }

    handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        let album = { ...this.state.newAlbum };
        switch(event.currentTarget.name){
            case 'title':
                album.title = event.currentTarget.value;
                break;
            case 'year':
                album.year = event.currentTarget.value;
                break;
            case 'genre':
                album.genre = event.currentTarget.value;
                break;
            case 'coverUrl':
                album.coverUrl = event.currentTarget.value;
                break;
        }

        this.setState({
            newAlbum: album,
            isFormValid: this.isAlbumValid(album)
        })
    }
    
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addAlbum(this.state.newAlbum)
        .then(() => this.setState({redirectToAlbums: true}))
            .catch(Error => console.log(Error));
    }

    isAlbumValid = (album: IAlbum) => {
        if (album.title.length <= 0){
            return false;
        }

        if (album.year.length != 4){
            return false;
        }

        if (album.genre.length <= 0){
            return false;
        }

        if (album.coverUrl.length > 1){
            const coverUrl = album.coverUrl;
            const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            let urlRegex = new RegExp(pattern);

            if(!urlRegex.test(coverUrl))
                return false;
        }

        
        if (album.coverUrl.length === 0)
            return true;

        if (!this.isValidUrlEnd(album.coverUrl))
            return false;

        return true;
    }

    isValidUrlEnd = (url: string) => {
        let end = url.substr(url.length - 4);
        if(end === '.jpg' || end === '.gif' || end === '.png')
            return true;

        end = url.substr(url.length - 5);
        if(end === '.jpeg')
            return true;

        return false;
    }

    render (){
        if(this.state.redirectToAlbums)
            return <Redirect to='/albums'/>;
        return (
            <Fragment>
                <div className="list-component-header">
                    <h1 className="list-component-title">Add an album</h1>
                </div>
                <form className="new-entry-form" action="#" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="text" name="title" id="albumTitle" placeholder="Title" onChange={this.handleInput}/><br/>
                        <input type="number" name="year" id="albumTitle" placeholder="Year" onChange={this.handleInput}/><br/>
                        <input type="text" name="genre" id="albumTitle" placeholder="Genre" onChange={this.handleInput}/><br/>
                        <input type="text" name="coverUrl" id="albumTitle" placeholder="Cover url" onChange={this.handleInput}/><br/>
                        <input type="submit" value="Add" disabled={!this.state.isFormValid}/>
                    </fieldset>
                </form>
            </Fragment>
        )
    }
};

export default NewAlbum;