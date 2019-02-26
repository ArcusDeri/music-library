import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { getSongs } from '../../Api';

interface IState {
    Songs: Array<ISong>
}

export interface ISong {
    id?: number,
    title: string,
    length: string
}

class Songs extends Component<{}, IState> {
    state = {
        Songs: new Array<ISong>()
    }
    componentDidMount() {
        getSongs
        .then(data => this.setState({
            Songs: data as Array<ISong>
        }))
        .catch(err => console.error(err));
    }

    render (){
        return (
            <Fragment>
                <div className="list-component-header">
                    <h1 className="list-component-title">Browse Songs</h1>
                    <button className="new-entry-button"><Link to="/songs/add" >+New Song</Link></button>
                </div>
                {this.state.Songs.length && 
                    <table>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <th>Length</th>                          
                            </tr>
                            {this.state.Songs.map(song => (
                                <tr key={song.id}>
                                    <td>{song.title}</td>
                                    <td>{song.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </Fragment>
        )
    }
};

export default Songs;