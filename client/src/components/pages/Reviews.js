import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactLoading from 'react-loading';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCase_Client } from "../../actions/caseAction";
import { addReview } from "../../actions/reviewAction";

const home = require("../../img/home.jpg");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      lawyer: "",
      title: "",
      description: "",
      ratings: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  OnAddReview(lawyer, client) {
    global.MyLawyerReview = lawyer;
    global.MyClientReview = client;
  }

  async componentDidMount() {
    const { user } = this.props.auth;
    await this.props.getCase_Client(user.name);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  scrollToBottom(lawyer, client) {
    document.getElementById('here').scrollIntoView({ behavior: "smooth", block: "start" })
    this.setState({
      lawyer: lawyer,
      client: client
    });

  }


  onSubmit() {
    const review = {
      client: this.state.client,
      lawyer: this.state.lawyer,
      title: this.state.title,
      description: this.state.description,
      ratings: this.state.ratings,
    };
    this.props.addReview(review);
    this.setState = {
      client: "",
      lawyer: "",
      title: "",
      description: "",
      ratings: "",
      errors: {}
    };
  }
  render() {
    const { caseData, loading } = this.props.caseData;
    let tableContent;
    (!caseData.length) ? (
      tableContent = null
    ) : tableContent = caseData.length ? caseData.map(
      el =>
        <tr key={el._id} >
          <th scope="row">{caseData.indexOf(el) + 1}</th>

          <td>{el.lawyer ? el.lawyer : "-"}</td>
          <td>{el.title ? el.title : "-"}</td>
          <td>
            <Link onClick={() => this.OnAddReview(el.lawyer, el.client)}
              to="/AddNewReview" className="btn btn-danger" type="button">
              Add Review
            </Link>
          </td>
        </tr>
    ) : null
    //    const { errors } = this.state;
    return (
      <div style={{
        padding: 20,
        marginTop: -24,
        marginBottom: -50,
        position: 'sticky', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: `url("https://i.pinimg.com/originals/f6/97/d6/f697d672340a2b0a1fe24ec31b1d64de.jpg") `
      }}
      >
        <div className="mid container">
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

          <h1 style={{ color: "white" }}className="display-4 text-center">Add Review</h1>
          <p style={{ color: "white" }}className="lead text-center">You can only add reviews about your case's lawyers</p>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="col-auto" >
            <Link to="/MyReviews"
              style={{ verticalAlign: '39px' }}
              //className="btn btn-lg text-white bg-dark"
              className="btn btn-primary"
            >
              My Reviews
            </Link>
          </div>
          <br />
          <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
            <div style={{ textAlign: "center" }}>
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <th scope="row">My Lawyers</th>
                </thead>
              </table>
            </div>
            {!loading ? <table className="table table-striped ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Lawyer</th>
                  <th scope="col">Case Title</th>
                  <th scope="col">Provide Feedback</th>
                </tr>
              </thead>
              <tbody style={{ color: "white" }}>
                {tableContent}
              </tbody>
            </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
          </div>
        </div>
      </div >
    );
  }
}

Dashboard.propTypes = {
  addReview: PropTypes.func.isRequired,
  getCase_Client: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  caseData: state.caseData,
});

export default connect(
  mapStateToProps
  ,
  { addReview, getCase_Client }
)(Dashboard);





// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import ReactLoading from 'react-loading';
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import classnames from "classnames";
// import { getCase_Client } from "../../actions/caseAction";
// import { addReview } from "../../actions/reviewAction";


// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       client: "",
//       lawyer: "",
//       title: "",
//       description: "",
//       ratings: "",
//       errors: {}
//     };
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//   }

//   async componentDidMount() {
//     const { user } = this.props.auth;
//     await this.props.getCase_Client(user.name);
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   scrollToBottom(lawyer, client) {
//     document.getElementById('here').scrollIntoView({ behavior: "smooth", block: "start" })
//     this.setState({
//       lawyer: lawyer,
//       client:client
//     });

//   }


//   onSubmit() {
//     const review = {
//       client: this.state.client,
//       lawyer: this.state.lawyer,
//       title: this.state.title,
//       description: this.state.description,
//       ratings: this.state.ratings,
//     };
//    this.props.addReview(review);
//     this.setState = {
//       client: "",
//       lawyer: "",
//       title: "",
//       description: "",
//       ratings: "",
//       errors: {}
//     };
//   }
//   render() {
//     const { caseData, loading } = this.props.caseData;
//     let tableContent;
//     (!caseData.length) ? (
//       tableContent = null
//     ) : tableContent = caseData.length ? caseData.map(
//       el =>
//         <tr key={el._id} >
//           <th scope="row">{caseData.indexOf(el) + 1}</th>

//           <td>{el.lawyer ? el.lawyer : "-"}</td>
//           <td>{el.title ? el.title : "-"}</td>
//           <td>
//             <button type="button" className="btn btn-danger"
//               data-toggle="tooltip"
//               data-placement="right" title="Click to Provide Review"
//               onClick={() =>
//                 this.scrollToBottom(el.lawyer, el.client)
//               }
//             >
//               Add Review
//             </button>
//           </td>
//         </tr>
//     ) : null
//     const { errors } = this.state;
//     return (
//       <div className="mid container">
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
//               Lawyers
//             </Link>
//             <Link to="/Cases" className="btn btn-lg text-white bg-dark">
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
//             <Link to="/Reviews" className="btn btn-lg text-white bg-dark">
//               Reviews
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
//         <h1 className="display-4 text-center">Add Review</h1>
//         <p className="lead text-center">You can only add reviews about your case's lawyers</p>
//         <div style={{ display: 'flex', justifyContent: 'center' }} className="col-auto" >
//           <Link to="/MyReviews"
//             style={{ verticalAlign: '39px' }}
//             //className="btn btn-lg text-white bg-dark"
//             className="btn btn-primary"
//           >
//             My FeedBacks
//           </Link>
//         </div>
//         <br />
//         <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
//           <div style={{ textAlign: "center" }}>
//             <table className="table table-striped table-hover">
//               <thead className="thead-dark">
//                 <th scope="row">My Lawyers</th>
//               </thead>
//             </table>
//           </div>
//           {!loading ? <table className="table table-striped table-hover">
//             <thead className="thead-dark">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Lawyer</th>
//                 <th scope="col">Case Title</th>
//                 <th scope="col">Provide Feedback</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableContent}
//             </tbody>
//           </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
//         </div>
//         <br />
//         <p id='here' className="lead text-center">Now Enter below's informtion</p>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
//           <div className="register mid container">
//             <div className="container">
//               <div className="row">
//                 <div className="col-md-8 m-auto">
//                   <form noValidate onSubmit={this.onSubmit}>
//                     <div className="lead text-center">
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className={classnames("form-control form-control-lg", {
//                           "is-invalid": errors.lawyer
//                         })}
//                         placeholder="Lawyer Name"
//                         name="lawyer"
//                         value={this.state.lawyer}
//                         onChange={this.onChange}
//                       />
//                       {errors.lawyer && (
//                         <div className="invalid-feedback">{errors.lawyer}</div>
//                       )}
//                     </div>

//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className={classnames("form-control form-control-lg", {
//                           "is-invalid": errors.title
//                         })}
//                         placeholder="Review Title"
//                         name="title"
//                         value={this.state.title}
//                         onChange={this.onChange}
//                       />
//                       {errors.title && (
//                         <div className="invalid-feedback">{errors.title}</div>
//                       )}
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="Textarea"
//                         className={classnames("form-control form-control-lg", {
//                           "is-invalid": errors.description
//                         })}
//                         placeholder="Description"
//                         name="description"
//                         value={this.state.description}
//                         onChange={this.onChange}
//                       />
//                       {errors.description && (
//                         <div className="invalid-feedback">{errors.description}</div>
//                       )}
//                     </div>
//                     <div className="lead text-center">
//                       <select className={classnames("form-control", {
//                         "is-invalid": errors.ratings
//                       })}
//                         id="ratings" onChange={this.onChange} value={this.state.ratings}
//                         name="ratings"
//                       >   <option value="" defaultValue disabled>Rate Your Lawyer</option>
//                         <option value="1">*</option>
//                         <option value="2">**</option>
//                         <option value="3">***</option>
//                         <option value="4">****</option>
//                         <option value="5">*****</option>
//                       </select>

//                       {/* <Select
//                         placeholder="Rate Your Lawyer"
//                         options={options}
//                         value={this.state.rating}
//                       //                        onChange={this.onChange}
//                       /> */}
//                       &nbsp;
//                     </div>
//                     <input type="submit" className="btn btn-info btn-block mt-4" />
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>


//         </div>

//       </div>
//     );
//   }
// }

// Dashboard.propTypes = {
//   addReview: PropTypes.func.isRequired,
//   getCase_Client: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   caseData: state.caseData,
// });

// export default connect(
//   mapStateToProps
//   ,
//   { addReview, getCase_Client }
// )(Dashboard);
