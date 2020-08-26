import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { FaBars, FaTimes} from 'react-icons/fa';
import {MdFingerprint} from 'react-icons/md';

import {Button} from '../Button/Button';

import "./Navbar.css"

const Navbar = () => {
    const [click, setClick] = useState(false); 
    const [button, setButton] = useState(true);

    const handleClick = () => {
        setClick(!click);
    }

    const closeMobileMenu = () => {
        setClick(false);
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    window.addEventListener('resize', showButton)


    return (
        <div className = "navbar">
            <div className = "navbar-container container">
                <Link to = "/" className = "navbar-logo" onClick = {closeMobileMenu}>
                    <MdFingerprint className = "navbar-icon" />
                    TheDietDiet 
                </Link>
                <div className = "menu-icon" onClick = {handleClick}>
                {click ? <FaTimes/> : <FaBars/> }
                </div>
                <ul className = {click ? 'nav-menu active' : 'nav-menu'}>
                    <li className = "nav-item">
                        <Link to = "/" className = "nav-links" onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className = "nav-item">
                        <Link to = "/" className = "nav-links" onClick = {closeMobileMenu}>
                            Products
                        </Link>
                    </li>
                    <li className = "nav-item">
                        <Link to = "/" className = "nav-links" onClick = {closeMobileMenu}>
                            About
                        </Link>
                    </li>
                    <li className = "nav-item">
                        <Link to = "/" className = "nav-links">
                            Help
                        </Link>
                    </li>
                    <li className = "nav-btn"> 
                        {button ? (
                            <Link to = '/sign-in' className = "btn-link" >
                            <Button buttonStyle = "btn--outline">LOGIN</Button>
                            </Link>
                        ): (
                            <Link to = '/sign-in' className = "btn-link" onClick = {closeMobileMenu} >
                                <Button buttonStyle = "btn--outline" buttonSize = "btn--mobile">
                                    LOGIN   
                                </Button>
                            </Link>
                        )}
                    </li>
                    <li className = "nav-btn"> 
                        {button ? (
                            <Link to = '/sign-up' className = "btn-link" >
                            <Button buttonStyle = "btn--outline">SIGN UP</Button>
                            </Link>
                        ): (
                            <Link to = '/sign-up' className = "btn-link" onClick = {closeMobileMenu} >
                                <Button buttonStyle = "btn--outline" buttonSize = "btn--mobile">
                                    SIGN UP
                                </Button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );

};

export default Navbar; 