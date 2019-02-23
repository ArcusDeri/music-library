import React, { Component, Fragment } from 'react';

const Home: React.SFC = () => {
    return (
        <Fragment>
            <h1>Welcome to the Music Library!</h1>
            <p>
                This project utilizes a .NET Core REST API, MS SQL database and React with TypeScript.<br/>
                Author: Marcin Michniak.
            </p>
        </Fragment>
    );
}

export default Home;