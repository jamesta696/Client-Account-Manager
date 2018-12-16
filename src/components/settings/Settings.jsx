import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration
} from "../../actions/settingsActions";

class Settings extends Component {
    onDisableBalanceOnAddChange = e => {
        const { setDisableBalanceOnAdd } = this.props;
        setDisableBalanceOnAdd();
    };

    onDisableBalanceOnEditChange = e => {
        const { setDisableBalanceOnEdit } = this.props;
        setDisableBalanceOnEdit();
    };

    onAllowRegistrationChange = e => {
        const { setAllowRegistration } = this.props;
        setAllowRegistration();
    };

    render() {
        const {
            disableBalanceOnAdd,
            disableBalanceOnEdit,
            allowRegistration
        } = this.props.settings;
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
                    <div className="card-header">Edit Settings</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group custom-control custom-checkbox mr-sm-2">
                                <input
                                    type="checkbox"
                                    name="allowRegistration"
                                    checked={!!allowRegistration}
                                    onChange={this.onAllowRegistrationChange}
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customCheck1"
                                >
                                    Allow Registration
                                </label>
                            </div>

                            <div className="form-group custom-control custom-checkbox mr-sm-2">
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnAdd"
                                    checked={!!disableBalanceOnAdd}
                                    onChange={this.onDisableBalanceOnAddChange}
                                    className="custom-control-input"
                                    id="customCheck2"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customCheck2"
                                >
                                    Disable Balance on Add
                                </label>
                            </div>

                            <div className="form-group custom-control custom-checkbox mr-sm-2">
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnEdit"
                                    checked={!!disableBalanceOnEdit}
                                    onChange={this.onDisableBalanceOnEditChange}
                                    className="custom-control-input"
                                    id="customCheck3"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customCheck3"
                                >
                                    Disable Balance on Edit
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
    (state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }),
    { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
