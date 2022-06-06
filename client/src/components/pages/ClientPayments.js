import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { GetPaymentsRequestsClient, DeletePaymentRequest, UpdateStatusPaidByPayment } from "../../actions/PaymentAction";
import { Link } from "react-router-dom";
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
      client: "",
      type: "",
      lawyer: "",
      description: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onPay = this.onPay.bind(this);
    this.onCash = this.onCash.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onCash(_id) {
    await this.props.UpdateStatusPaidByPayment(_id);
    const { user } = this.props.auth;
    await this.props.GetPaymentsRequestsClient(user.name);
  }
  async onDelete(_id) {
    await this.props.UpdateStatusPaidByPayment(_id);
    const { user } = this.props.auth;
    await this.props.GetPaymentsRequestsClient(user.name);
  }

  async onPay(id, amount, name, lawyerid) {
    global.MyAmount = amount;
    global.MyName = name;
    global.lawyer_ID = lawyerid;
  }

  async onEasyPaisa(id, amount, name, easypaisaname, easypaisanumber) {
    global.MyEasypaisaID = id;
    global.MyAmount = amount;
    global.MyName = name;
    global.MyEasypaisaName = easypaisaname;
    global.MyEasypaisaNumber = easypaisanumber;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

    }
  }
  async componentDidMount() {
    const { user } = this.props.auth;
    await this.props.GetPaymentsRequestsClient(user.name);
  }
  render() {
    const { paymentData, loading } = this.props.paymentData;
    let tableContent;
    (!paymentData.length) ? (
      tableContent = null
    ) : tableContent = paymentData.length ? paymentData.map(
      el =>
        <tr key={el._id} >
          <th scope="row">{paymentData.indexOf(el) + 1}</th>
          <td>{el.lawyer ? el.lawyer : "-"}</td>
          <td>{el.case ? el.case : "-"}</td>
          <td>{el.amount ? el.amount : "-"}</td>
          <td>{el.description ? el.description : "-"}</td>
          <td>
            <Link
              style={{ verticalAlign: '39px' }}
              title="Click to Pay Amount"
              // className="btn btn-primary"
              onClick={() => this.onCash(el._id)}
            >
              Cash
            </Link>
          </td>
          <td>
            <Link to="/Pay"
              style={{ verticalAlign: '39px' }}
              // className="btn btn-primary"
              onClick={() => this.onPay(el._id, el.amount, el.lawyer, el.lawyer_ID)}
            >
              Credit
            </Link>
          </td>
          <td>
            <Link to="/PayEasypaisa"
              style={{ verticalAlign: '39px' }}
              // className="btn btn-primary"
              onClick={() => this.onEasyPaisa(el._id, el.amount,
                el.lawyer, el.easypaisaname, el.easypaisanumber)}
            >
              Easypaisa
            </Link>
          </td>
          <td>
            <button type="button" className="btn btn-danger"
              data-toggle="tooltip"
              data-placement="right"
              title="Click to Remove Payment Request"
              style={{ verticalAlign: '39px' }}
              onClick={() => this.onDelete(el._id)}
            >
              Remove
            </button>
          </td>

        </tr>
    ) : null
    //        const { errors } = this.state;
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
          <h1 style={{ color: "white" }} className="display-4 text-center">Payments Requests</h1>
          <p style={{ color: "white" }} className="lead text-center">You can pay lawyer's Fee from the list Below!</p>
          <br />
          <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
            <div style={{ textAlign: "center" }}>
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <th scope="row">Payment Requests from Lawyer</th>
                </thead>
              </table>
            </div>
            {!loading ? <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Lawyer</th>
                  <th scope="col">Case</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">Cash</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Easypaisa</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody style={{ color: "white" }}>
                {tableContent}

              </tbody>
            </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
          </div>
        </div>
      </div>

    );
  }
}
Register.propTypes = {
  DeletePaymentRequest: PropTypes.func.isRequired,
  GetPaymentsRequestsClient: PropTypes.func.isRequired,
  UpdateStatusPaidByPayment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  caseData: state.caseData,
  paymentData: state.paymentData

});
export default connect(
  mapStatesToProps,
  { DeletePaymentRequest, GetPaymentsRequestsClient, UpdateStatusPaidByPayment }
)(withRouter(Register));