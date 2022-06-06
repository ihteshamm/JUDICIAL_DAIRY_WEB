import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Judicial Dairy</h1>
                <p className="lead"></p>
                <br />
                <br />
                <br /><br />
                <br /><br /><br />
                <h6 >A Judicial Web App built with MERN stack having
                  functionilities for Clients, Lawyes.
                  All members can Sign up and Login but 
                  Admin required approvial password which is hard coded
                  in the software. Clients & Lawyers will wait till Admin's
                  Approvial. Admin can Approve Clients and Lawyer's Accounts
                  and lawyer's cases. Admin can view any data. Lawyer can add
                  or edit cases, View all cases while he also have a judicial
                  Law dictionary for Help1. Clients can View Lawyers and request
                  them for a case while also view cases. Clients can add reviews
                  about lawyers. All three type of users can add contact us
                  about our Web app. Hope you will enjoy it!  
                </h6>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,

});

export default connect(mapStateToProps)(Home);
