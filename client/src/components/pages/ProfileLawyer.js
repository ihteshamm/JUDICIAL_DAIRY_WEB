import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentUser, MyProfile } from "../../actions/authActions";
import { UpdateLawyer } from "../../actions/authActions";
import { logoutLawyer } from "../../actions/authActions";
//const lawyer = require("../../img/lawyer.jpg");
const home = require("../../img/home.jpg");

class ProfileLawyer extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props.auth;
        this.state = {
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            contact: user.contact,
            gender: user.gender,
            court: user.court,
            experiance: user.experiance,
            pic: "",
            password: user.password,
            password2: user.password2,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { user } = this.props.auth;
        const lawyerdata = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            contact: this.state.contact,
            gender: this.state.gender,
            court: this.state.court,
            experiance: this.state.experiance,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.UpdateLawyer(user.id, lawyerdata);
        this.props.logoutLawyer(this.props.history);
    }

    render() {
        const { user } = this.props.auth;
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
                    <div className="register mid container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <h1 style={{color:"white"}} className="display-4 text-center">My Profile</h1>
                                    <p style={{color:"white"}} className="lead text-center">You can View and Edit Your Profile info here!</p>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <p style={{color:"white"}}  className="lead text-left">Name</p>
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.name
                                                })}
                                                placeholder={user.name}
                                                name="name"
                                                defaultValue={user.name}
                                                value={this.state.name}
                                            />
                                            {errors.name && (
                                                <div className="invalid-feedback">{errors.name}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Email</p>
                                            <input
                                                type="email"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.email
                                                })}
                                                placeholder={user.email}
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Contact</p>
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.contact
                                                })}
                                                placeholder={user.contact}
                                                name="contact"
                                                value={this.state.contact}
                                                onChange={this.onChange}
                                            />
                                            {errors.contact && (
                                                <div className="invalid-feedback">{errors.contact}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Gender</p>
                                            <input
                                                type="gender"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.gender
                                                })}
                                                value={user.gender}
                                            />
                                            {errors.gender && (
                                                <div className="invalid-feedback">{errors.gender}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}}  className="lead text-left">Address</p>
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.address
                                                })}
                                                placeholder={user.address}
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.onChange}
                                            />
                                            {errors.address && (
                                                <div className="invalid-feedback">{errors.address}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Court</p>
                                            <input
                                                type="court"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.court
                                                })}
                                                placeholder={user.court}
                                                name="court"
                                                value={this.state.court}
                                                onChange={this.onChange}
                                            />
                                            {errors.court && (
                                                <div className="invalid-feedback">{errors.court}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Experiance</p>
                                            <textarea
                                                type="experiance"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.experiance
                                                })}
                                                placeholder={user.experiance}
                                                name="experiance"
                                                value={this.state.experiance}
                                                onChange={this.onChange}
                                            />
                                            {errors.experiance && (
                                                <div className="invalid-feedback">{errors.experiance}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Password</p>
                                            <input
                                                type="password"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.password
                                                })}
                                                placeholder="Enter Password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.onChange}
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">{errors.password}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Change Password(Same as Above)</p>
                                            <input
                                                type="password"
                                                label="Password"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.password2
                                                })}
                                                placeholder="Enter Password"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileLawyer.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    MyProfile: PropTypes.func.isRequired,
    UpdateLawyer: PropTypes.func.isRequired,
    logoutLawyer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { getCurrentUser, UpdateLawyer, MyProfile, logoutLawyer }
)(ProfileLawyer);
