import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {UserIsAuthenticated, UserIsNotAuthenticated} from "./helpers/Auth";
import { Provider } from "react-redux";
import store from "./store";
import AppNavBar from "./components/layout/AppNavBar";
import Dashboard from "./components/layout/DashBoard";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import ClientDetails from "./components/clients/ClientDetails";
import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <AppNavBar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                                <Route
                                    exact
                                    path="/client/add"
                                    component={UserIsAuthenticated(AddClient)}
                                />
                                <Route
                                    exact
                                    path="/client/edit/:id"
                                    component={UserIsAuthenticated(EditClient)}
                                />
                                <Route
                                    exact
                                    path="/client/:id"
                                    component={UserIsAuthenticated(ClientDetails)}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
