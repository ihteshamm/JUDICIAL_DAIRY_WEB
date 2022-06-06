import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css'
//const lawyer = require("../../img/lawyer.jpg");
const home = require("../../img/home.jpg");

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit() {
        const user = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            contact: this.state.contact,
            address: this.state.address,
            pic: this.state.pic,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.UpdateUser(user);
        this.setState = {
            name: this.state.name,
            email: this.state.email,
            gender: this.state.gender,
            contact: this.state.contact,
            address: this.state.address,
            password: this.state.password,
        };
    }
    componentDidMount() {
        const { user } = this.props.auth;
        this.setState = {
            name: user.name,
            email: user.email,
            gender: user.gender,
            address: user.address,
            contact: user.contact,
            password: user.password,
            password2: user.password2,
        };
    }

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state;
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
                    <div className="register mid container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <h1 style={{color:"white"}} className="display-4 text-center">My Profile</h1>
                                    <p style={{color:"white"}} className="lead text-center">You can View and Edit Your Profile info here!</p>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Name</p>
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.name
                                                })}
                                                placeholder={user.name}
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.onChange}
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
                                                placeholder={user.connect}
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
                                                placeholder={user.gender}
                                                name="gender"
                                                value={this.state.gender}
                                                onChange={this.onChange}
                                            />
                                            {errors.gender && (
                                                <div className="invalid-feedback">{errors.gender}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <p style={{color:"white"}} className="lead text-left">Address</p>
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
                                            <p style={{color:"white"}} className="lead text-left">Password</p>
                                            <input
                                                type="password"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.password
                                                })}
                                                placeholder={user.password}
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
                                                placeholder={user.password2}
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

Dashboard.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
    ,
    { getCurrentUser }
)(Dashboard);
