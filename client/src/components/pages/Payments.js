import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  registerCase, getCase, getCaseClient, DeleteRequest,
  getCaseType, DeleteCase, UpdateCase, getMyRequest
} from "../../actions/caseAction";
import { SendPaymentRequest } from "../../actions/PaymentAction";
const home = require("../../img/home.jpg");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findBy: '',
      val: '',
      data: {},
      _id: '',
      lawyer_ID: '',
      lawyer: "",
      client: "",
      case: "",
      amount: "",
      description: "",
      easypaisaname: "",
      easypaisanumber: '',
      status: "",

      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onSubmit(e) {
    const { user } = this.props.auth;
    const RequestData = {
      lawyer_ID: this.state.lawyer_ID,
      lawyer: user.name,
      client: this.state.client,
      case: this.state.case,
      amount: this.state.amount,
      description: this.state.description,
      easypaisaname: this.state.easypaisaname,
      easypaisanumber: this.state.easypaisanumber,
      status: this.state.status,
    };
    console.table(RequestData);
    await this.props.SendPaymentRequest(RequestData);
    this.setState({
      lawyer_ID: "",
      lawyer: "",
      client: "",
      case: "",
      amount: "",
      description: "",
      easypaisaname: "",
      easypaisanumber: "",
      status: "",
    });
  }
  AddNewPayment(name, title, id) {
    const { user } = this.props.auth;
    global.MyPaymentLawyer_ID = id;
    global.MyPaymentLawyer = user.name;
    global.MyPaymentClient = name;
    global.MyPaymentTitle = title;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

    }
  }
  async componentDidMount() {
    const { user } = this.props.auth;
    await this.props.getCase(user.name);
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

          <td>{el.client ? el.client : "-"}</td>
          <td>{el.title ? el.title : "-"}</td>
          <td>
            <Link onClick={() => this.AddNewPayment(
              el.client, el.title, el._id)}
              to="/NewPaymentReq" className="btn btn-primary" type="button">
              Request
            </Link>
          </td>
        </tr>
    ) : null
    return (
      <div style={{
        padding: 20,
        marginTop: -24,
        marginBottom: -50,
        position: 'sticky',  backgroundPosition: 'center',
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
        <h1 style={{color:"white"}}  className="display-4 text-center">Payment</h1>
        <p style={{color:"white"}} className="lead text-center">Send new Payment Request from Client list below</p>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }} className="col-auto" >
          <Link to="/MyPaymentRequests"
            style={{ verticalAlign: '39px' }}
            //className="btn btn-lg text-white bg-dark"
            className="btn btn-primary"
          >
            My Payment Requests
          </Link>
        </div>
        <br />
        <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
          <div style={{ textAlign: "center" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <th scope="row">My Clients</th>
              </thead>
            </table>
          </div>
          {!loading ? <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client</th>
                <th scope="col">Case Title</th>
                <th scope="col">Payment Request</th>
              </tr>
            </thead>
            <tbody style={{color:"white"}} >
              {tableContent}
            </tbody>
          </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
        </div>
      </div >
      </div>
    );
  }

}
Register.propTypes = {
  registerCase: PropTypes.func.isRequired,
  getCase: PropTypes.func.isRequired,
  getCaseClient: PropTypes.func.isRequired,
  getCaseType: PropTypes.func.isRequired,
  DeleteCase: PropTypes.func.isRequired,
  StatusChange: PropTypes.func.isRequired,
  getMyRequest: PropTypes.func.isRequired,
  DeleteRequest: PropTypes.func.isRequired,
  SendPaymentRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  lawyerData: state.lawyerData,
  clientData: state.clientData,
  caseData: state.caseData
});
export default connect(
  mapStatesToProps,
  { registerCase, DeleteRequest, SendPaymentRequest, getCase, getMyRequest, getCaseClient, getCaseType, DeleteCase, UpdateCase }
)(withRouter(Register));

