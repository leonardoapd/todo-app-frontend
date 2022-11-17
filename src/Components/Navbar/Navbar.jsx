// Componente que renderiza un navbar
import React from 'react';
import { images } from '../../constants';
import './Navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="app__navbar">
                <div className="app__navbar-logo">
                    <img src={images.logo} alt="logo" />
                </div>
                <div className="app__navbar-title">
                    <h1>My ToDo App</h1>
                </div>
            </nav>
        );
    }
}

export { Navbar };