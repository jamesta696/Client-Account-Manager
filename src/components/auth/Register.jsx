import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { notifyUser } from "../../actions/notifyActions";
import AlertMessage from "../layout/AlertMessage";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;

        // Register with firebase
        firebase
            .createUser({ email, password })
            .catch(err =>
                notifyUser("That User Email Already Exists", "error")
            );
    };

    onResetForm = e => {
        const { notifyUser } = this.props;

        // Clear fields and any errors
        this.setState({
            email: "",
            password: ""
        });

        notifyUser(null, null);
    };

    componentWillMount() {
        const { allowRegistration } = this.props.settings;
        const { history } = this.props;

        if (!allowRegistration) {
            history.push("/");
        }
    }

    render() {
        const { message, messageType } = this.props.notify;
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card loginCard">
                        <div className="card-body">
                            {message ? (
                                <AlertMessage
                                    message={message}
                                    messageType={messageType}
                                />
                            ) : null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock" /> Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        required
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-primary btn-block"
                                />
                                <input
                                    type="reset"
                                    value="Reset"
                                    className="btn btn-secondary btn-block"
                                    onClick={this.onResetForm}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
};

export default compose(
    firebaseConnect(),
    connect(
        (state, props) => ({
            notify: state.notify,
            settings: state.settings
        }),
        { notifyUser }
    )
)(Login);
