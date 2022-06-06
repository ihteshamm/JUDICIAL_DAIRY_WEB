import React, { Component } from 'react';
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";

import {
  registerCase, getCase, getCaseClient, DeleteRequest,
  getCaseType, DeleteCase, UpdateCase, SendRequest, getMyRequest
} from "../../actions/caseAction";

import { getLawyer, getLawyerCity } from "../../actions/lawyerAction";
const home = require("../../img/home.jpg");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findBy: '',
      val: '',
      data: {},
      loading: true,
      _id: '',

      client: global.MyClient,
      title: "",
      type: "",
      court: "",
      lawyer: global.MyLawyer,
      hearingDate: "",
      description: "",
      status: "pending",

      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.SendRequest = this.SendRequest.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  scrollToBottom(client, title) {
    document.getElementById('here').scrollIntoView({ behavior: "smooth", block: "start" })
    this.SendRequest(client, title)
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onDelete(_id) {
    const { user } = this.props.auth;
    await this.props.DeleteRequest(_id);
    await this.props.getMyRequest(user.name);
  }

  // async onDelete(title) {
  //   const { user } = this.props.auth;
  //   await this.props.DeleteCase(title);
  //   await this.props.getCase(user.name);
  // }

  Review(name) {
    global.LawyerName = name;
  }
  async onStatusChange(title, status) {
    await this.props.StatusChange(title, status);
    const user = this.props.auth;
    await this.props.getCase(user.name);
  }
  async onSubmit(e) {
    const { user } = this.props.auth;
    const RequestData = {
      client: user.name,
      title: this.state.title,
      type: this.state.type,
      court: this.state.court,
      lawyer: this.state.lawyer,
      hearingDate: this.state.hearingDate,
      description: this.state.description,
      status: this.state.status,
    };
    console.table(RequestData);
    await this.props.SendRequest(RequestData);
  }
  async SendRequest(name) {
    const { user } = this.props.auth;
    this.setState({
      client: user.name,
      type: "",
      lawyer: name,
      description: "",
      status: "pending",
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

    }
  }
  async componentDidMount() {
    const { user } = this.props.auth;
    await this.props.getLawyer();
    await this.props.getMyRequest(user.name);
  }
  render() {
    const { errors } = this.state;
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
        <h1 style={{ color: "white" }}className="display-4 text-center">Request Lawyer</h1>
        <p style={{ color: "white" }}className="lead text-center">You can only request a lawyer for case from the below list.</p>
        <p style={{ color: "white" }}id='here' className="lead text-center">Now Enter below's informtion</p>

        <div className="register mid container">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">

                <form noValidate onSubmit={this.onSubmit}>
                  <div className="col">
                    <div className="row">
                      <label style={{ color: "white" }}htmlFor="name">Client</label>
                      <input type="text" id="client" placeholder="Client Name"
                        className={classnames("form-control", {
                          "is-invalid": errors.client
                        })}
                        name="client"
                        value={this.state.client}
                      />
                      {errors.client && (
                        <div className="invalid-tooltip">{errors.client}</div>
                      )}
                    </div>
                    <br />
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="title">Case Title</label>
                      <input type="text" id="title" placeholder="Case Title"
                        className={classnames("form-control", {
                          "is-invalid": errors.title
                        })}
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                      />
                      {errors.title && (
                        <div className="invalid-tooltip">{errors.title}</div>
                      )}
                    </div>
                    <br />
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="type">Case Type</label>
                      <select className={classnames("form-control", {
                        "is-invalid": errors.type
                      })}
                        id="type" onChange={this.onChange} value={this.state.type}
                        name="type"
                      >   <option value="" defaultValue disabled>Select Lawyer Type</option>
                        <option value="Family Case">Family Case</option>
                        <option value="Criminal Case">Criminal Case</option>
                        <option value="Civil Case">Civil Case</option>
                        <option value="Others">Others</option>
                      </select>
                      {errors.type && (
                        <div className="invalid-tooltip">{errors.type}</div>
                      )}
                    </div>
                    <br />
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="court">Court</label>
                      <select className={classnames("form-control", {
                        "is-invalid": errors.court
                      })}
                        id="court" onChange={this.onChange} value={this.state.court}
                        name="court"
                      >   <option value="" defaultValue disabled>Select Court</option>
                        <option value="Islamabad High Court">Islamabad High Court</option>
                        <option value="Lahore High Court">Lahore High Court</option>
                        <option value="Karachi High Court">Karachi High Court</option>
                        <option value="Peshawer High Court">Peshawer High Court</option>
                        <option value="Others">Others</option>
                      </select>
                      {errors.court && (
                        <div className="invalid-tooltip">{errors.court}</div>
                      )}
                    </div>
                    <br />
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="lawyer">Lawyer</label>
                      <input type="text" id="lawyer" placeholder="Lawyer Name"
                        className={classnames("form-control", {
                          "is-invalid": errors.lawyer
                        })}
                        name="lawyer"
                        value={this.state.lawyer}
                      //onChange={this.onChange}
                      />
                      {errors.lawyer && (
                        <div className="invalid-tooltip">{errors.lawyer}</div>
                      )}
                    </div>
                    <br />
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="hearingDate">First Hearing Date</label>
                      <input type="date" id="hearingDate" placeholder="First Hearing Date"
                        className={classnames("form-control", {
                          "is-invalid": errors.hearingDate
                        })}
                        name="hearingDate"
                        value={this.state.hearingDate}
                        onChange={this.onChange}
                      />
                      {errors.hearingDate && (
                        <div className="invalid-tooltip">{errors.hearingDate}</div>
                      )}
                    </div>
                    <div className="row">
                      <label style={{ color: "white" }} htmlFor="description">Description</label>
                      <textarea type="text" id="description" placeholder="Describle your Case"
                        className={classnames("form-control", {
                          "is-invalid": errors.description
                        })}
                        rows={5}
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
                    <button type="submit" style={{ verticalAlign: '-39px' }} className="btn btn-primary">Request</button>
                  </div>
                </form >
              </div >
            </div >
          </div >
        </div >
        </div>

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
  getLawyer: PropTypes.func.isRequired,
  getLawyerCity: PropTypes.func.isRequired,
  getMyRequest: PropTypes.func.isRequired,
  DeleteRequest: PropTypes.func.isRequired,
  SendRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  lawyerData: state.lawyerData,
  caseData: state.caseData
});
export default connect(
  mapStatesToProps,
  { registerCase, DeleteRequest, SendRequest, getCase, getMyRequest, getCaseClient, getLawyer, getLawyerCity, getCaseType, DeleteCase, UpdateCase }
)(withRouter(Register));