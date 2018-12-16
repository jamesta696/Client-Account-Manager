import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";

class AddClient extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        balance: ""
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { firestore, history } = this.props;

        const newClient = this.state;
        // If there isn't a balance, make it 0
        if (newClient.balance === "") {
            newClient.balance = 0;
        }

        firestore
            .add({ collection: "clients" }, newClient)
            .then(() => history.push("/"));
    };

    render() {
        const { disableBalanceOnAdd } = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Link
                            to="/"
                            className="btn btn-link backToDash-styling"
                        >
                            <i className="fas fa-arrow-circle-left" /> Back To
                            Dashboard
                        </Link>
                    </div>
                </div>

                <div className="card mb-4 cardStyling">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    minLength="2"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    minLength="10"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="balance">Balance</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="balance"
                                    onChange={this.onChange}
                                    value={this.state.balance}
                                    disabled={disableBalanceOnAdd}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);
