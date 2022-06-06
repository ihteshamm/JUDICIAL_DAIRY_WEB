import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const home = require("../../img/home.jpg");
const search = require("../../img/search lawyer.png");
const feedback = require("../../img/feedback.png");
const profile = require("../../img/profile.png");
const chat = require("../../img/chat.png");
const request = require("../../img/request.png");
const add = require("../../img/case.png");
const dictionary = require("../../img/dictionaryfn.png");
const payment = require("../../img/payment.png");

class Dashboard extends Component {
  componentDidMount() {
    toast('Welcome to Client Dashboard')
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }


  render() {
    //    const { user } = this.props.auth;
    return (
      <div style={{
        padding: 20,
        marginTop: -24,
        marginBottom: -50,
        position: 'sticky', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: `url("https://i.pinimg.com/originals/f6/97/d6/f697d672340a2b0a1fe24ec31b1d64de.jpg") `
      }}
      >
      <div className="mid container"
      >
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <div style={{ width: "5rem", height: '4rem' }}>
              <Link to="/dashboard" className="btn btn-lg  ">
                <img src={home} alt="Home" />
              </Link>
            </div>
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
        <h1 style={{color:"white"}} className="display-4 text-center">Client Dashboard</h1>
        <p style={{color:"white"}} className="lead text-center">Client's related functionilities are here</p>
        <div className="mid container" style={{ width: "60rem", hover: '', height: '22rem' }}>
          <div className="card-body" style={{ height: '10rem' }}>
            <div style={{ marginTop: 'px' }}>
              <div className="row">
                <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/ViewCaseClient" className="btn btn-lg text-white ">
                      <img src={search} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Search</h4>
                    <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Cases</h4>

                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/MyRequestsClient" className="btn btn-lg text-white ">
                      <img src={request} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;View</h4>
                    <h4 className="card-title">&nbsp;&nbsp;Requests</h4>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/ChatClient" className="btn btn-lg text-white ">
                      <img src={chat} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Chat</h4>
                    <h4 className="card-title">&nbsp;&nbsp;Lawyers</h4>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/Profile" className="btn btn-lg text-white ">
                      <img src={profile} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Edit</h4>
                    <h4 className="card-title">&nbsp;&nbsp;Profile</h4>
                  </div>
                </div>
              </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <div className="row">
              <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                <div className="col">
                  <Link to="/Lawyers" className="btn btn-lg text-white ">
                    <img src={add} className="card-img-top" alt="Cleaning" />
                  </Link>
                  <h4 className="card-title">&nbsp;&nbsp;Request</h4>
                  <h4 className="card-title">&nbsp;&nbsp;Lawyer</h4>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                <div className="col">
                  <Link to="/ClientPayments" className="btn btn-lg text-white ">
                    <img src={payment} className="card-img-top" alt="Cleaning" />
                  </Link>
                  <h4 className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fee</h4>
                  <h4 className="card-title">&nbsp;Payment</h4>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem' }}>
                <div className="col">
                  <Link to="/DictionaryClient" className="btn btn-lg text-white ">
                    <img src={dictionary} className="card-img-top" alt="Cleaning" />
                  </Link>
                  <h4 className="card-title">&nbsp;&nbsp;&nbsp;View</h4>
                  <h5 className="card-title">&nbsp;Dictionary</h5>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="card hoverable" style={{ width: "9rem", height: '12rem' }}>
                <div className="col">
                  <Link to="/Reviews" className="btn btn-lg text-white ">
                    <img src={feedback} className="card-img-top" alt="Cleaning" />
                  </Link>
                  <h4 className="card-title">&nbsp;&nbsp;Provide</h4>
                  <h4 className="card-title">&nbsp;&nbsp;Review</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div >
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


// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { getCurrentUser } from "../../actions/authActions";
// import { Link } from "react-router-dom";

// const lawyer = require("../../img/lawyer.jpg");

// class Dashboard extends Component {
//   componentDidMount() {
//     if (!this.props.auth.isAuthenticated) {
//       this.props.history.push("/");
//     }
//   }


//   render() {
//     //    const { user } = this.props.auth;
//     return (
//       <div className="mid container" 
//       >
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
//               Request Lawyers
//             </Link>
//             <Link to="/ViewCaseClient" className="btn btn-lg text-white bg-dark">
//               Cases
//             </Link>
//             <Link to="/ChatClient" className="btn btn-lg text-white bg-dark">
//               Chat
//             </Link>
//             <Link to="/ClientPayments" className="btn btn-lg text-white bg-dark">
//               Payments
//             </Link>
//             <Link to="/DictionaryClient" className="btn btn-lg text-white bg-dark">
//               Dictionary
//             </Link>
//             <Link to="/Profile" className="btn btn-lg text-white bg-dark">
//               Profile
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#mobile-nav"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//           </div>
//         </nav>

//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
//           <div className="card hoverable" style={{ width: "18rem", hover: '', height: '22rem' }}>
//             <div className="card-body" style={{ height: '10rem' }}>
//               <h3 className="card-title">What's New</h3>
//             </div>
//             <img src={lawyer} className="card-img-top" alt="Cleaning" />
//           </div>

//           <div className="card hoverable" style={{ width: "60rem", hover: '', height: '22rem' }}>
//             <div className="card-body" style={{ height: '10rem' }}>
//               <h6 className="card-body">A Judicial Web App for Clients:<br></br>
//                 &nbsp;&nbsp;&nbsp;Clients can:<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request lawyer for a Case.<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Easily get lawyer<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View lawyer's Payments<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View lawyers<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Laws from a law Dictionary<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Communicate with its Lawyers<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View his Case information<br></br>
//               </h6>
//               <div className="mid container"   >
//                 <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
//                   Search Lawyers
//                 </Link>
//                 &nbsp;&nbsp;&nbsp;
//                 <Link to="/Reviews" className="btn btn-lg text-white bg-dark">
//                   Provide Feedback
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Dashboard.propTypes = {
//   getCurrentUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps
//   ,
//   { getCurrentUser }
// )(Dashboard );
