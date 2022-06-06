import React, { Component } from 'react';
import ReactLoading from 'react-loading';
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
      MyCity: '',
      loading: true,
      _id: '',
      client: "",
      type: "",
      lawyer: "",
      description: "",
      status: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.SendRequest = this.SendRequest.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.OnRawalpindi = this.OnRawalpindi.bind(this);
    this.OnKarachi = this.OnKarachi.bind(this);
    this.OnLahore = this.OnLahore.bind(this);
    this.OnPeshawer = this.OnPeshawer.bind(this);
    this.OnOthers = this.OnOthers.bind(this);

  }

  async OnRawalpindi() {
    this.setState({ loading: true });
    await this.props.getLawyerCity("Rawalpindi");
  }
  async OnLahore() {
    this.setState({ loading: true });
    await this.props.getLawyerCity("Lahore");
  }
  async OnKarachi() {
    this.setState({ loading: true });
    await this.props.getLawyerCity("Karachi");
  }
  async OnPeshawer() {
    this.setState({ loading: true });
    await this.props.getLawyerCity("Peshawer");
  }
  async OnOthers() {
    this.setState({ loading: true });
    await this.props.getLawyerCity("Other");
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
      type: this.state.type,
      lawyer: this.state.lawyer,
      description: this.state.description,
      status: this.state.status,
    };
    console.table(RequestData);
    await this.props.SendRequest(RequestData);
    this.setState({
      client: "",
      type: "",
      label: "",
      description: "",
      status: "",
    });
  }
  OnSendRequest(name) {
    const { user } = this.props.auth;
    global.MyClient = user.name;
    global.MyLawyer = name;

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
    const { lawyerData, loading } = this.props.lawyerData;
    let tableContent;
    (!lawyerData.length) ? (
      tableContent = null
    ) : tableContent = lawyerData.length ? lawyerData.map(
      el =>
        <tr key={el._id} >
          <th scope="row">{lawyerData.indexOf(el) + 1}</th>
          <td>{el.name ? el.name : "-"}</td>
          <td>{el.type ? el.type : "-"}</td>
          <td>{el.fee ? el.fee : "-"}</td>
          <td>{el.court ? el.court : "-"}</td>
          <td>{el.contact ? el.contact : "-"}</td>
          <td>{el.experiance ? el.experiance : "-"}</td>
          <td>{el.rating ? el.rating : "-"}</td>
          <td>{el.address ? el.address : "-"}</td>
          <td>
            <Link onClick={() => this.OnSendRequest(el.name)}
              to="/SendCaseRequest" className="btn btn-danger" type="button">
              Request
            </Link>
          </td>
          <td>
            <Link onClick={() => this.Review(el.name)}
              to="/ClientFeedbacks" className="btn btn-primary">
              Reviews
            </Link>
          </td>
        </tr>
    ) : null

    // const { errors } = this.state;
    // /   const { user } = this.props.auth;
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

        <h1 style={{color:"white"}} className="display-4 text-center">Request Lawyer</h1>
        <p style={{color:"white"}} className="lead text-center">You can only request a lawyer for case from the below list.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="col-auto" >
          <Link to="/MyRequestsClient"
            style={{ verticalAlign: '39px' }}
            //className="btn btn-lg text-white bg-dark"
            className="btn btn-primary"
          >
            My Requests
          </Link>
        </div>
        <br />
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent ">
          <div className="container">
            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
              onClick={this.OnRawalpindi}>Rawalpindi/Islamabad</button>
            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
              onClick={this.OnLahore}>Lahore</button>
            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
              onClick={this.OnKarachi}>Karachi</button>
            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
              onClick={this.OnPeshawer}>Peshawer</button>
            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
              onClick={this.OnOthers}>Other</button>
          </div>
        </nav>


        <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
          <div style={{ textAlign: "center" }}>
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <th scope="row">Lawyer's List</th>
              </thead>
            </table>
          </div>
          {!loading ? <table className="table table-striped ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Fee</th>
                <th scope="col">Current Court</th>
                <th scope="col">Contact</th>
                <th scope="col">Experiance</th>
                <th scope="col">Ratings</th>
                <th scope="col">Address</th>
                <th scope="col">Send Request</th>
                <th scope="col">View Reviews</th>
              </tr>
            </thead>
            <tbody style={{color:"white"}} >
              {tableContent}
            </tbody>
          </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
        </div>
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