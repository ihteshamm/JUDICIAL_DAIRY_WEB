import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { addEasypaisaResponce } from "../../actions/EasypaisaResponceAction";
import { UpdateStatusPaidByEasypaisa } from "../../actions/PaymentAction";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestID: "",
      lawyername: "",
      transitionID: "",
      date: "",
      clientEasypisaName: "",
      clientEasypaisaNumber: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
      requestID: global.MyEasypaisaID,
      lawyername: global.MyEasypaisaName,
      transitionID: this.state.transitionID,
      date: this.state.date,
      clientEasypisaName: this.state.clientEasypisaName,
      clientEasypaisaNumber: this.state.clientEasypaisaNumber,
    };
    this.props.addEasypaisaResponce(review);
    this.props.UpdateStatusPaidByEasypaisa(global.MyEasypaisaID);
    this.setState = {
      transitionID: "",
      date: "",
      clientEasypisaName: "",
      clientEasypaisaNumber: "",
      errors: {}
    };
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
              <Link to="/Lawyers" className="btn btn-lg text-white bg-dark">
                Lawyers
              </Link>
              <Link to="/Cases" className="btn btn-lg text-white bg-dark">
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
              <Link to="/Reviews" className="btn btn-lg text-white bg-dark">
                Reviews
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
          <h1 style={{color:"white"}}className="display-4 text-center">Easypaisa Payment</h1>
          <p style={{color:"white"}}className="lead text-center">You have to pay through easypaisa app and submit its response here</p>
          <div style={{ marginTop: '50px', backgroundColor: 'transparent'}} className="card" >
            <p style={{color:"white"}} className="lead text-center">You have to Pay : {global.MyAmount}</p>
            <p style={{color:"white"}} className="lead text-center">Your Lawyer : {global.MyName}</p>
            <p style={{color:"white"}} className="lead text-center">Easypaisa Number : {global.MyEasypaisaNumber}</p>
            <p style={{color:"white"}} className="lead text-center">Easypaisa Name : {global.MyEasypaisaName}</p>
          </div>
          <br />
          <p style={{color:"white"}} id='here' className="lead text-center">Add easypaisa payment details below</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <div className="register mid container">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="lead text-center">
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.transitionID
                          })}
                          placeholder="Transition ID"
                          name="transitionID"
                          value={this.state.transitionID}
                          onChange={this.onChange}
                        />
                        {errors.transitionID && (
                          <div className="invalid-feedback">{errors.transitionID}</div>
                        )}
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.date
                          })}
                          placeholder="Payment Date"
                          name="date"
                          value={this.state.date}
                          onChange={this.onChange}
                        />
                        {errors.date && (
                          <div className="invalid-feedback">{errors.date}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="Textarea"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.clientEasypisaName
                          })}
                          placeholder="Your Easypaisa Name"
                          name="clientEasypisaName"
                          value={this.state.clientEasypisaName}
                          onChange={this.onChange}
                        />
                        {errors.clientEasypisaName && (
                          <div className="invalid-feedback">{errors.clientEasypisaName}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="Textarea"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.clientEasypaisaNumber
                          })}
                          placeholder="Your Easypaisa Phone No."
                          name="clientEasypaisaNumber"
                          value={this.state.clientEasypaisaNumber}
                          onChange={this.onChange}
                        />
                        {errors.clientEasypaisaNumber && (
                          <div className="invalid-feedback">{errors.clientEasypaisaNumber}</div>
                        )}
                      </div>
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
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

Dashboard.propTypes = {
  addEasypaisaResponce: PropTypes.func.isRequired,
  UpdateStatusPaidByEasypaisa: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  caseData: state.caseData,
});

export default connect(
  mapStateToProps
  ,
  { addEasypaisaResponce, UpdateStatusPaidByEasypaisa }
)(Dashboard);
