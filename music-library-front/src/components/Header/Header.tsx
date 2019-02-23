import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Logo from '../../assets/vinyl.png';

class Header extends Component {

    render(){
        return <header>
            <nav>
                <div className="header-home">
                    <Link to='/'><img src={Logo} alt='vinyl logo'/>Music Library</Link>
                </div>
                <ul className='dropdown-menu'>
                    <li className='dropdown-menu-pill'>Menu
                        <ul className='dropdown-menu-content'>    
                            <li><Link to='/albums'>Albums</Link></li>
                            <li><Link to='/artists'>Artists</Link></li>
                            <li><Link to='/songs'>Songs</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    }
}

export default Header;
