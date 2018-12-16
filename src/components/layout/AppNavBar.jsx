import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AppNavBar extends Component {
    state = {
        isAuthenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true };
        } else {
            return { isAuthenticated: false };
        }
    }

    onLogout = e => {
        e.preventDefault();
        const { firebase } = this.props;

        firebase.logout();
    };

    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        const { allowRegistration } = this.props.settings;

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <h2 to="/" className="navbar-brand">
                        Client Manager Panel
                    </h2>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            {isAuthenticated ? (
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                        {isAuthenticated ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#!" className="nav-link">
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/settings" className="nav-link">
                                        Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#!"
                                        className="nav-link"
                                        onClick={this.onLogout}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : null}
                        {allowRegistration && !isAuthenticated ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        ) : null}
                    </div>
                </div>
            </nav>
        );
    }
}

AppNavBar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }))
)(AppNavBar);
