import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      selectedFile: null,
      contact: "",
      gender: "",
      address: "",
      pic: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  onSubmit(e) {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      contact: this.state.contact,
      address: this.state.address,
      file: this.state.selectedFile,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
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
              <div className="card hoverable" style={{ paddingRight: 30, width: "60rem", hover: '', height: '60rem', backgroundColor: 'transparent', fill: 'ThreeDShadow' }}>
                <div className="col-md-6 m-auto">
                  <div className="col">
                    <h1 style={{ color: "white" }} className="display-4 text-center">CLIENT SIGN UP</h1>
                    <p style={{ color: "white" }} className="lead text-center">Create your account</p>
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
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.contact
                          })}
                          placeholder="User Contact"
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
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.address
                          })}
                          placeholder="Address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                        />
                        {errors.address && (
                          <div className="invalid-feedback">{errors.address}</div>
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
                    <Link to="/login" className="btn btn-info btn-block mt-4">
                      Already Account ? (Login here)
                    </Link>
                    <Link to="/GuestClient" className="btn btn-info btn-block mt-4">
                      Guest Client
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
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { registerUser }
)(withRouter(Register));
