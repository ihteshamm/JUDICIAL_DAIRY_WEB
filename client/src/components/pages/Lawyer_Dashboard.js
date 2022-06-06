import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentLawyer } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const search = require("../../img/search lawyer.png");
const feedback = require("../../img/feedback.png");
const profile = require("../../img/profile.png");
const chat = require("../../img/chat.png");
const request = require("../../img/request.png");
const add = require("../../img/addcase.png");
const dictionary = require("../../img/dictionaryfn.png");
const payment = require("../../img/payment.png");
const home = require("../../img/home.jpg");

class Lawyer_Dashboard extends Component {
  componentDidMount() {
    toast('Welcome to Lawyer Dashboard')
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div style={{
        padding: 20,
        marginTop: -24,
        marginBottom: -50,
        position: 'relative', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: `url("https://i.pinimg.com/originals/f6/97/d6/f697d672340a2b0a1fe24ec31b1d64de.jpg") `
      }}
      >
        <div className="mid container">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <div style={{ width: "5rem", height: '4rem' }}>
                <Link to="/Lawyer_Dashboard" className="btn btn-lg  ">
                  <img src={home} alt="Home" />
                </Link>
              </div>
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
          <h1 style={{color:"white"}} className="display-4 text-center">Lawyer Dashboard</h1>
          <p style={{color:"white"}} className="lead text-center">Lawyer's related functionilities are here</p>
          <div className="mid container" style={{ width: "60rem", hover: '', height: '22rem' }}>
            <div className="card-body" style={{ height: '10rem' }}>
              <div style={{ marginTop: 'px' }}>
                <div className="row">
                  <div className="card hoverable" style={{ width: "9rem", hover: '', height: '12rem',backgroundColor:'white' }}>
                    <div className="col">
                      <Link to="/viewCase" className="btn btn-lg text-white ">
                        <img src={search} className="card-img-top" alt="Cleaning" />
                      </Link>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Search</h4>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Cases</h4>

                    </div>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="card hoverable" style={{ backgroundColor:'white',width: "9rem", hover: '', height: '12rem' }}>
                    <div className="col">
                      <Link to="/CaseRequests" className="btn btn-lg text-white ">
                        <img src={request} className="card-img-top" alt="Cleaning" />
                      </Link>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Case</h4>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Request</h4>
                    </div>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="card hoverable" style={{ backgroundColor:'white',width: "9rem", hover: '', height: '12rem' }}>
                    <div className="col">
                      <Link to="/Chat" className="btn btn-lg text-white ">
                        <img src={chat} className="card-img-top" alt="Cleaning" />
                      </Link>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Chat</h4>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Clients</h4>
                    </div>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="card hoverable" style={{backgroundColor:'white', width: "9rem", hover: '', height: '12rem' }}>
                    <div className="col">
                      <Link to="/ProfileLawyer" className="btn btn-lg text-white ">
                        <img src={profile} className="card-img-top" alt="Cleaning" />
                      </Link>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;&nbsp;Edit</h4>
                      <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Profile</h4>
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
                <div className="card hoverable" style={{backgroundColor:'white', width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/AddNewCase" className="btn btn-lg text-white ">
                      <img src={add} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 style={{color:"black"}} className="card-title">Add New</h4>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Case</h4>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{backgroundColor:'white', width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/Payments" className="btn btn-lg text-white ">
                      <img src={payment} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Request</h4>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;Payment</h4>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{backgroundColor:'red', width: "9rem", hover: '', height: '12rem' }}>
                  <div className="col">
                    <Link to="/Dictionary" className="btn btn-lg text-white ">
                      <img src={dictionary} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;View</h4>
                    <h5 style={{color:"black"}} className="card-title">&nbsp;Dictionary</h5>
                  </div>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="card hoverable" style={{ backgroundColor:'white',width: "9rem", height: '12rem' }}>
                  <div className="col">
                    <Link to="/LawyerFeedbacks" className="btn btn-lg text-white ">
                      <img src={feedback} className="card-img-top" alt="Cleaning" />
                    </Link>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;&nbsp;Check</h4>
                    <h4 style={{color:"black"}} className="card-title">&nbsp;&nbsp;Review</h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lawyer_Dashboard.propTypes = {
  getCurrentLawyer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
  ,
  { getCurrentLawyer }
)(Lawyer_Dashboard);









// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { getCurrentLawyer } from "../../actions/authActions";
// import { Link } from "react-router-dom";
// const lawyer = require("../../img/lawyer.jpg");

// class Lawyer_Dashboard extends Component {
//   componentDidMount() {
//     if (!this.props.auth.isAuthenticated) {
//       this.props.history.push("/");
//     }
//   }
//   render() {
//     return (
//       <div className="mid container">
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <Link to="/CaseRequests" className="btn btn-lg text-white bg-dark">
//               Case Requests
//             </Link>
//             <Link to="/viewCase" className="btn btn-lg text-white bg-dark">
//               Cases
//             </Link>
//             <Link to="/Chat" className="btn btn-lg text-white bg-dark">
//               Chat
//             </Link>
//             <Link to="/Payments" className="btn btn-lg text-white bg-dark">
//               Payments
//             </Link>
//             <Link to="/Dictionary" className="btn btn-lg text-white bg-dark">
//               Dictionary
//             </Link>
//             <Link to="/ProfileLawyer" className="btn btn-lg text-white bg-dark">
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
//               <h6 className="card-body">A Judicial Web App for lawyer:<br></br>
//                 &nbsp;&nbsp;&nbsp;Lawyer can:<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add new Cases.<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertise himself<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ask for Payments<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View its Clients<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Laws from a law Dictionary<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Communicate with its Client<br></br>
//                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edit/Remove his Cases<br></br>
//               </h6>
//               <div className="mid container"   >
//                 <Link to="/AddNewCase" className="btn btn-lg text-white bg-dark">
//                   Add New Case
//                 </Link>
//                 &nbsp;&nbsp;&nbsp;
//                 <Link to="/LawyerFeedbacks" className="btn btn-lg text-white bg-dark">
//                   View Feedbacks
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Lawyer_Dashboard.propTypes = {
//   getCurrentLawyer: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps
//   ,
//   { getCurrentLawyer }
// )(Lawyer_Dashboard);