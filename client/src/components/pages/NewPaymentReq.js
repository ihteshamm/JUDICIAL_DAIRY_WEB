import React, { Component } from 'react';
import classnames from "classnames";
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
      lawyer_ID: global.MyPaymentLawyer_ID,
      lawyer: global.MyPaymentLawyer,
      client: global.MyPaymentClient,
      case: global.MyPaymentTitle,
      amount: "",
      description: "",
      easypaisaname: "",
      easypaisanumber: '',
      status: "pending",

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
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div style={{
        padding: 20,
        marginTop: -24,
        marginBottom: -50,
        position: 'sticky', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: `url("https://emerging-europe.com/wp-content/uploads/2017/12/bigstock-178701754-e1512749165168.jpg") `
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
          <h1 className="display-4 text-center">Payment Request</h1>
          <p className="lead text-center">Send new Payment Request</p>
          <br />
          <p className="lead text-center">Please fill to send Payment Request</p>
          <br />
          <div className="login mid container">
            <div className="container"  >
              <div className="row" style={{paddingRight:26}}>
                <div className="card hoverable" style={{ width: "60rem", hover: '', height: '30rem', backgroundColor: 'transparent' }}>
                  <div className="col-md-10 m-auto">
                    <div className="col">

                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="row">
                          <div className="col">
                            <label htmlFor="name">Client</label>
                            <input type="text" id="client" placeholder="Client Name"
                              className={classnames("form-control", {
                                "is-invalid": errors.client
                              })}
                              name="client"
                              value={this.state.client}
                            //                onChange={this.onChange}
                            />
                            {errors.client && (
                              <div className="invalid-tooltip">{errors.client}</div>
                            )}
                          </div>
                          <div className="col">
                            <label htmlFor="title">Title</label>
                            <input type="text" title="client" placeholder="Case Title"
                              className={classnames("form-control", {
                                "is-invalid": errors.title
                              })}
                              name="title"
                              value={this.state.case}
                            //                onChange={this.onChange}
                            />
                            {errors.title && (
                              <div className="invalid-tooltip">{errors.title}</div>
                            )}
                          </div>
                          <div className="col">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" id="amount" placeholder="Enter Amount!"
                              className={classnames("form-control", {
                                "is-invalid": errors.amount
                              })}
                              name="amount"
                              value={this.state.amount}
                              onChange={this.onChange}
                            />
                            {errors.amount && (
                              <div className="invalid-tooltip">{errors.amount}</div>
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="row">
                          <div className="col">
                            <label htmlFor="easypaisanumber">Easypaisa No.</label>
                            <input type="text" id="easypaisanumber" placeholder="Easypaisa Phone number"
                              className={classnames("form-control", {
                                "is-invalid": errors.easypaisanumber
                              })}
                              name="easypaisanumber"
                              value={this.state.easypaisanumber}
                              onChange={this.onChange}
                            />
                            {errors.easypaisanumber && (
                              <div className="invalid-tooltip">{errors.easypaisanumber}</div>
                            )}
                          </div>
                          <div className="col">
                            <label htmlFor="name">Easypaisa Name</label>
                            <input type="text" id="easypaisaname" placeholder="Easypaisa Name"
                              className={classnames("form-control", {
                                "is-invalid": errors.easypaisaname
                              })}
                              name="easypaisaname"
                              value={this.state.easypaisaname}
                              onChange={this.onChange}
                            />
                            {errors.easypaisaname && (
                              <div className="invalid-tooltip">{errors.easypaisaname}</div>
                            )}
                          </div>
                          <div className="col">
                            <label htmlFor="description">Description</label>
                            <textarea type="text" id="description" placeholder="Payment Description"
                              className={classnames("form-control", {
                                "is-invalid": errors.description
                              })}
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                            />
                            {errors.description && (
                              <div className="invalid-tooltip">{errors.description}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-auto" >
                          <button type="submit" style={{ verticalAlign: '-39px' }} className="btn btn-primary">Send Request</button>
                        </div>
                      </form >
                    </div >
                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
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

