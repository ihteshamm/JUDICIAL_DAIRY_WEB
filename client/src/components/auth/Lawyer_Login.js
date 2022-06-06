import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginLawyer } from "../../actions/authActions";
import { Link } from "react-router-dom";

//process.env.NODE_ENV.MY_Name;
class Lawyer_Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Lawyer_Dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginLawyer(userData);
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
              <div className="card hoverable" style={{ paddingRight: 30, width: "60rem", hover: '', height: '30rem', backgroundColor: 'transparent', fill: 'ThreeDShadow' }}>
                <div className="col-md-6 m-auto">
                  <div className="col">
                    <h1 className="display-4 text-center">LAWYER LOG IN</h1>
                    <p className="lead text-center">Sign in to your account</p>
                    <form onSubmit={this.onSubmit}>
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
                      <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    <Link to="/RegisterLawyer" className="btn btn-info btn-block mt-4">
                      No Account ? (Register New Account)
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

Lawyer_Login.propTypes = {
  loginLawyer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginLawyer }
)(Lawyer_Login);
