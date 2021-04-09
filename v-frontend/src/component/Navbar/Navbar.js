import React from "react";
import { NavLink, Link } from "react-router-dom";


import "./Navbar.css";

function Navbar(props) {
    return (
        <header className="d-flex flex-column flex-md-row align-items-center p- px-md-0 mb-3 bg-dark" >
            <p className="h5 my-0 me-md-auto fw-normal">
                <Link to="/">
                    <i className="fas fa-film"></i>
                    
                </Link>
            </p>
            <nav className="my-2 my-md-0 me-md-0">
                <NavLink
                    exact
                    className="btn btn-outline-success"
                    activeStyle={{ color: "green" }}
                    activeClassName="active-class-style"
                    to={props.user ? "/v-home" : "/home"}
                >
                    {props.user ? "V-Search 🌱🍏🌱" : "V-Home"}
                </NavLink>
            </nav>
            {props.user ? (
                <>
                

                    <NavLink
                        className="btn btn-outline-success"
                        activeStyle={{ color: "white" }}
                        to="/profile"
                    >
                        {props.user.email}
                    </NavLink>
                    <Link
                        className="btn btn-outline-success"
                        to="/login"
                        onClick={props.handleUserLogout}
                    >
                        logout
            </Link>
                </>
            ) : (
                    <>
                        <NavLink
                            className="btn btn-outline-success"
                            activeStyle={{ color: "white" }}
                            to="/sign-up"
                        >
                            Sign up
                </NavLink>
                        <NavLink
                            className="btn btn-outline-success"
                            activeStyle={{ color: "white" }}
                            to="/login"
                        >
                            Login
                </NavLink>
                
                    </>
                    
                )}
        </header>
        
    );
}

export default Navbar;