import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const lawyer = require("../../img/lawyer.jpg");

class Dashboard extends Component {
  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/Dashboard");
    // }
  }


  render() {
    //    const { user } = this.props.auth;
    return (
      <div className="mid container" 
      >
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
              Request Lawyers
            </Link>
            <Link to="/ViewCaseClient" className="btn btn-lg text-white bg-dark">
              Cases
            </Link>
            <Link to="/ChatClient" className="btn btn-lg text-white bg-dark">
              Chat
            </Link>
            <Link to="/ClientPayments" className="btn btn-lg text-white bg-dark">
              Payments
            </Link>
            <Link to="/DictionaryClient" className="btn btn-lg text-white bg-dark">
              Dictionary
            </Link>
            <Link to="/Profile" className="btn btn-lg text-white bg-dark">
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
              <h6 className="card-body">A Judicial Web App for Clients:<br></br>
                &nbsp;&nbsp;&nbsp;Clients can:<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request lawyer for a Case.<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Easily get lawyer<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View lawyer's Payments<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View lawyers<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Laws from a law Dictionary<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Communicate with its Lawyers<br></br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View his Case information<br></br>
              </h6>
              <div className="mid container"   >
                <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
                  Search Lawyers
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/Reviews" className="btn btn-lg text-white bg-dark">
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  {  }
)(Dashboard );
