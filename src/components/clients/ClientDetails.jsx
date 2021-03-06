import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ""
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmitBalanceUpdate = e => {
        e.preventDefault();
        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        // New updated balance
        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        };

        // Update Firestore with new client balance
        firestore.update(
            { collection: "clients", doc: client.id },
            clientUpdate
        );
    };

    onDeleteClient = e => {
        const { client, firestore, history } = this.props;

        firestore
            .delete({
                collection: "clients",
                doc: client.id
            })
            .then(() => history.push("/"));
    };

    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;
        let balanceForm = "";
        // If balanceForm will display
        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.onSubmitBalanceUpdate}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="balanceUpdateAmount"
                            placeholder="Add New Balance"
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <input
                                type="submit"
                                value="Update"
                                className="btn btn-outline-dark"
                            />
                        </div>
                    </div>
                </form>
            );
        } else {
            balanceForm = null;
        }

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link
                                to="/"
                                className="btn btn-link backToDash-styling"
                            >
                                <i className="fas fa-arrow-circle-left" /> Back
                                To Dashboard
                            </Link>
                            <div className="btn-group float-right">
                                <Link
                                    to={`/client/edit/${client.id}`}
                                    className="btn btn-dark btn-group-styling"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger btn-group-styling"
                                    onClick={this.onDeleteClient}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card cardStyling mb-4">
                        <h3 className="card-header">
                            {client.firstName} {client.lastName}
                        </h3>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4 className="clientID">
                                        Client ID:{" "}
                                        <span className="text-secondary">
                                            {client.id}
                                        </span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3 className="pull-right balanceAmount">
                                        Balance: $
                                        <span
                                            className={classnames({
                                                "text-danger":
                                                    client.balance > 0,
                                                "text-success":
                                                    client.balance === 0
                                            })}
                                        >
                                            {parseFloat(client.balance).toFixed(
                                                2
                                            )}
                                        </span>
                                        <small>
                                            <a
                                                href="#!"
                                                onClick={() =>
                                                    this.setState({
                                                        showBalanceUpdate: !showBalanceUpdate
                                                    })
                                                }
                                            >
                                                {" "}
                                                <i className="fas fa-pencil-alt" />
                                            </a>
                                        </small>
                                    </h3>
                                    {balanceForm}
                                </div>
                            </div>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <i class="fas fa-envelope" /> Email:{" "}
                                    {client.email}
                                </li>
                                <li className="list-group-item">
                                    <i class="fas fa-phone" /> Phone:{" "}
                                    <a
                                        href={`tel:${client.phone}`}
                                        alt="contact phone"
                                        className="clientPhone"
                                    >
                                        {client.phone}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        { collection: "clients", storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
