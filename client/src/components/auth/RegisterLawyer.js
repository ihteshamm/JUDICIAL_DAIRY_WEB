import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerLawyer } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      fee: "",
      email: "",
      address: "",
      contact: "",
      gender: "",
      selectedFile: null,
      court: "",
      experiance: "",
      pic: "",
      image: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Lawyer_Dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

  }

  onSubmit(e) {
    e.preventDefault();
    const newLawyer = {
      name: this.state.name,
      type: this.state.type,
      fee: this.state.fee,
      email: this.state.email,
      address: this.state.address,
      contact: this.state.contact,
      gender: this.state.gender,
      court: this.state.court,
      experiance: this.state.experiance,
      pic: this.state.pic,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerLawyer(newLawyer, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div style={{
        padding: 80,
        marginTop: -24,
        marginBottom: -50,
        position: 'sticky', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: `url("https://emerging-europe.com/wp-content/uploads/2017/12/bigstock-178701754-e1512749165168.jpg") `
      }}
      >
        <div className="login mid container">
          <div className="container" style={{ paddingLeft: 100 }}>
            <div className="row" >
              <div className="card hoverable" style={{ paddingRight: 30, width: "70rem", hover: '', height: '70rem', backgroundColor: 'transparent', fill: 'ThreeDShadow' }}>
                <div className="col-md-6 m-auto">
                  <div className="col">
                    <h1 className="display-4 text-center">SIGN UP LAWYER</h1>
                    <p className="lead text-center">Create your account</p>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.name
                          })}
                          placeholder="User Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <select className={classnames("form-control", {
                          "is-invalid": errors.type
                        })}
                          id="type" onChange={this.onChange} value={this.state.type}
                          name="type"
                        >   <option value="" defaultValue disabled>Select Lawyer Type</option>
                          <option value="Family Lawyer">Family Lawyer</option>
                          <option value="Criminal Lawyer">Criminal Lawyer</option>
                          <option value="Civil Lawyer">Civil Lawyer</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.fee
                          })}
                          placeholder="Case Fee"
                          name="fee"
                          value={this.state.fee}
                          onChange={this.onChange}
                        />
                        {errors.fee && (
                          <div className="invalid-feedback">{errors.fee}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.email
                          })}
                          placeholder="Email Address"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <select className={classnames("form-control", {
                          "is-invalid": errors.address
                        })}
                          id="address" onChange={this.onChange} value={this.state.address}
                          name="address"
                        >   <option value="" defaultValue disabled>Select City</option>
                          <option value="Rawalpindi">Rawalpindi/Islamabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Peshawer">Peshawer</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.contact
                          })}
                          placeholder="Phone No."
                          name="contact"
                          value={this.state.contact}
                          onChange={this.onChange}
                        />
                        {errors.contact && (
                          <div className="invalid-feedback">{errors.contact}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <select className={classnames("form-control", {
                          "is-invalid": errors.gender
                        })}
                          id="male" onChange={this.onChange} value={this.state.gender}
                          name="gender"
                        >   <option value="" defaultValue disabled>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input
                          type="court"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.court
                          })}
                          placeholder="Your Working court area"
                          name="court"
                          value={this.state.court}
                          onChange={this.onChange}
                        />
                        {errors.court && (
                          <div className="invalid-feedback">{errors.court}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <textarea
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.experiance
                          })}
                          placeholder="Experiance"
                          name="experiance"
                          value={this.state.experiance}
                          onChange={this.onChange}
                        />
                        {errors.experiance && (
                          <div className="invalid-feedback">{errors.experiance}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.password
                          })}
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.password2
                          })}
                          placeholder="Confirm Password"
                          name="password2"
                          value={this.state.password2}
                          onChange={this.onChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password2}</div>
                        )}
                      </div>
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    <Link to="/Lawyer_login" className="btn btn-info btn-block mt-4">
                      Already Account ? (Login here)
                    </Link>
                    <Link to="/GuestLawyer" className="btn btn-info btn-block mt-4">
                      Guest Lawyer
                    </Link>
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

Register.propTypes = {
  registerLawyer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { registerLawyer }
)(withRouter(Register));
