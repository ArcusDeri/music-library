import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getArtists } from '../../Api';

interface IState {
    Artists: Array<IArtist>
}

export interface IArtist {
    id?: number,
    name: string,
    surname: string
}

class Artists extends Component<{}, IState> {
    state = {
        Artists: new Array<IArtist>()
    }
    componentDidMount() {
        getArtists
        .then(data => this.setState({
            Artists: data as Array<IArtist>
        }))
        .catch(err => console.error(err));
    }

    render (){
        return (
            <Fragment>
                <div className="list-component-header">
                    <h1 className="list-component-title">Browse Artists</h1>
                    <button className="new-entry-button"><Link to="/songs/add" >+New Artist</Link></button>
                </div>
                {this.state.Artists.length && 
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>                          
                            </tr>
                            {this.state.Artists.map(artist => (
                                <tr key={artist.id}>
                                    <td>{artist.name}</td>
                                    <td>{artist.surname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Fragment>
        )
    }
};

export default Artists;