import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <Link
            to="/client/add"
            className="btn btn-success btn-block newClient-link"
        >
            <i className="fas fa-plus" /> New
        </Link>
    );
};

export default SideBar;
