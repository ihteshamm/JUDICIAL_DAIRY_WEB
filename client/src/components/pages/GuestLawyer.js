import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const lawyer = require("../../img/lawyer.jpg");

class Lawyer_Dashboard extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="mid container">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link to="/CaseRequests" className="btn btn-lg text-white bg-dark">
              Case Requests
            </Link>
            <Link to="/viewCase" className="btn btn-lg text-white bg-dark">
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
            <Link to="/ProfileLawyer" className="btn btn-lg text-white bg-dark">
              Profile
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
              <h6 className="card-body">A Judicial Web App for lawyer:<br></br>
                &nbsp;&nbsp;&nbsp;Lawyer can:<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add new Cases.<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertise himself<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ask for Payments<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View its Clients<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Laws from a law Dictionary<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Communicate with its Client<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit/Remove his Cases<br></br>
              </h6>
              <div className="mid container"   >
                <Link to="/AddNewCase" className="btn btn-lg text-white bg-dark">
                  Add New Case
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/LawyerFeedbacks" className="btn btn-lg text-white bg-dark">
                  View Feedbacks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lawyer_Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps
  ,
  {  }
)(Lawyer_Dashboard);