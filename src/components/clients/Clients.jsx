import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class Clients extends Component {
    state = {
        totalOwed: null
    };

    static getDerivedStateFromProps(props, state) {
        const { clients } = props;

        if (clients) {
            // Add balances
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);

            return { totalOwed: total };
        }

        return null;
    }

    render() {
        const { clients } = this.props;
        const { totalOwed } = this.state;

        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                <i className="fas fa-users" /> Clients
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary totalOwed-breakpoint mt-2">
                                Total Owed{" "}
                                <span className="text-primary">
                                    ${parseFloat(totalOwed).toFixed(2)}
                                </span>
                            </h5>
                        </div>
                    </div>
                    <table className="table table-striped table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td style={{ fontWeight: "600" }}>
                                        {client.firstName} {client.lastName}
                                    </td>
                                    <td style={{ fontWeight: "600" }}>
                                        {client.email}
                                    </td>
                                    <td style={{ fontWeight: "600" }}>
                                        <span
                                            className={classnames({
                                                "text-danger":
                                                    client.balance > 0,
                                                "text-success":
                                                    client.balance === 0
                                            })}
                                        >
                                            $
                                            {parseFloat(client.balance).toFixed(
                                                2
                                            )}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/client/${client.id}`}
                                            className="btn btn-info btn-sm detailsButton"
                                        >
                                            <i className="fas fa-arrow-circle-right" />{" "}
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: "clients" }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);
