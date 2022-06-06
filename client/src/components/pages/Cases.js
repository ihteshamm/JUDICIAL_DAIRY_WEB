import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css'

const lawyer = require("../../img/lawyer.jpg");

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }


  render() {
    //    const { user } = this.props.auth;
    return (
      <div className="mid container">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
              Lawyers
            </Link>
            <Link to="/Cases" className="btn btn-lg text-white bg-dark">
              Cases
            </Link>
            <Link to="/Chat" className="btn btn-lg text-white bg-dark">
              Chat
            </Link>
            <Link to="/Payments" className="btn btn-lg text-white bg-dark">
              Payments
            </Link>
            <Link to="/Dictionary" className="btn btn-lg text-white bg-dark">
              Dictionary
            </Link>
            <Link to="/Reviews" className="btn btn-lg text-white bg-dark">
              Reviews
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <div className="card hoverable" style={{ width: "18rem", hover: '', height: '22rem' }}>
            <div className="card-body" style={{ height: '10rem' }}>
              <h3 className="card-title">What's New</h3>
            </div>
            <img src={lawyer} className="card-img-top" alt="Cleaning" />
          </div>

          <div className="card hoverable" style={{ width: "60rem", hover: '', height: '22rem' }}>
            <div className="card-body" style={{ height: '10rem' }}>
              <h6 className="card-body">Cases Module<br></br>
              </h6>
              <div className="mid container"   >
                <Link to="/dashboard" className="btn btn-lg text-white bg-dark">
                  Search Lawyers
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/dashboard" className="btn btn-lg text-white bg-dark">
                  Provide Feedback
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  { getCurrentUser }
)(Dashboard);
