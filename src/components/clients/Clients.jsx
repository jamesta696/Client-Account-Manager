import React, { Component } from "react";
import { Link } from "react-router-dom";

class Clients extends Component {
    render() {
        const clients = [
            {
                id: "fhsnnfj534dsd",
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@gmail.com",
                phone: "718-792-2243",
                balance: "30"
            }
        ];

        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                <i className="fas fa-users" /> Clients
                            </h2>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <table className="table table-striped">
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
                                    <td>
                                        {client.firstName} {client.lastName}
                                    </td>
                                    <td>{client.email}</td>
                                    <td>{client.balance}</td>
                                    <td>
                                        <Link
                                            to={`/client/${client.id}`}
                                            className="btn btn-secondary btn-sm"
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
            return <h1>Loading...</h1>;
        }
    }
}

export default Clients;
