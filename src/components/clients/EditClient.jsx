import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
    constructor(props) {
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();
        const { client, firestore, history } = this.props;

        // Update Client
        const updateClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance:
                this.balanceInput.current.value === ""
                    ? 0
                    : this.balanceInput.current.value
        };

        // Update Client in Firestore
        firestore
            .update(
                {
                    collection: "clients",
                    doc: client.id
                },
                updateClient
            )
            .then(history.push("/"));
    };

    render() {
        const { client } = this.props;

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> Back
                                To Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">Edit Client</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        minLength="2"
                                        required
                                        defaultValue={client.firstName}
                                        ref={this.firstNameInput}
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
                                        defaultValue={client.lastName}
                                        ref={this.lastNameInput}
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
                                        defaultValue={client.email}
                                        ref={this.emailInput}
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
                                        defaultValue={client.phone}
                                        ref={this.phoneInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="balance"
                                        defaultValue={client.balance}
                                        ref={this.balanceInput}
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
        } else {
            return <Spinner />;
        }
    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        { collection: "clients", storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);
