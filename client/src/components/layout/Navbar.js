import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutLawyer } from "../../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();
    this.onLougoutClick = this.onLougoutClick.bind(this);
  }

  onLougoutClick(e) {
    e.preventDefault();
    this.props.logoutLawyer(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    global.MyName = user.name;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li >
          <div style={{ fontSize: "25px", color: "white" }}>
            {global.MyName}
          </div>
        </li>
        <li className="nav-ite">
          <Link onClick={this.onLougoutClick.bind(this)} className="nav-link" to="/">
            {
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                title="Unknwon"
                style={{ width: "30px", marginRight: "5px" }}
              />
            }
            {""} Log Out
          </Link>
        </li>
      </ul>
    );

    const unauthLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/RegisterLawyer">
            Register Lawyer
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register" >
            Register Client
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Lawyer_login">
            Lawyer Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" >
            Client's Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Judicial Dairy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : unauthLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutLawyer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutLawyer }
)(Navbar);
