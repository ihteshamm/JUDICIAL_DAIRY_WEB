import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css'
import classnames from "classnames";
import PropTypes from "prop-types";
import { registerCase } from "../../actions/caseAction";
const home = require("../../img/home.jpg");

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: "",
            type: "",
            lawyer: "",
            description: "",
            title: "",
            code: "",
            court: "",
            hearingDate: "",
            status: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/AddNewCase");
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps.errors) {
    //         this.setState({ errors: nextProps.errors });

    //     }
    // }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        const { user } = this.props.auth;
        e.preventDefault();
        const newCase = {
            title: this.state.title,
            type: this.state.type,
            code: this.state.code,
            client: this.state.client,
            lawyer: user.name,
            court: this.state.court,
            hearingDate: this.state.hearingDate,
            description: this.state.description,
            status: true,
        };
        this.props.registerCase(newCase, this.props.history);
        this.setState = {
            title: "",
            type: "",
            code: "",
            client: "",
            lawyer: "",
            court: "",
            hearingDate: "",
            description: "",
            status: "",
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
                    <div className="register mid container">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <h1 className="display-4 text-center">Add Case</h1>
                                    <p className="lead text-center">You can add unlimited cases here!</p>
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.description
                                                })}
                                                placeholder="title"
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.onChange}

                                            />
                                            {errors.description && (
                                                <div className="invalid-feedback">{errors.description}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.type
                                                })}
                                                placeholder="type"
                                                name="type"
                                                value={this.state.type}
                                                onChange={this.onChange}
                                            />
                                            {errors.type && (
                                                <div className="invalid-feedback">{errors.type}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.code
                                                })}
                                                placeholder="code"
                                                name="code"
                                                value={this.state.code}
                                                onChange={this.onChange}
                                            />
                                            {errors.code && (
                                                <div className="invalid-feedback">{errors.code}</div>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.client
                                                })}
                                                placeholder="client"
                                                name="client"
                                                value={this.state.client}
                                                onChange={this.onChange}
                                            />
                                            {errors.client && (
                                                <div className="invalid-feedback">{errors.client}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.court
                                                })}
                                                placeholder="court"
                                                name="court"
                                                value={this.state.court}
                                                onChange={this.onChange}
                                            />
                                            {errors.court && (
                                                <div className="invalid-feedback">{errors.court}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.hearingDate
                                                })}
                                                placeholder="hearingDate"
                                                name="hearingDate"
                                                value={this.state.hearingDate}
                                                onChange={this.onChange}
                                            />
                                            {errors.hearingDate && (
                                                <div className="invalid-feedback">{errors.hearingDate}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                type="text"
                                                className={classnames("form-control form-control-lg", {
                                                    "is-invalid": errors.description
                                                })}
                                                placeholder="description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onChange}
                                            />
                                            {errors.description && (
                                                <div className="invalid-feedback">{errors.description}</div>
                                            )}
                                        </div>
                                        <input type="submit"
                                            className="btn btn-info btn-block mt-4"
                                        />
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
Register.propTypes = {
    registerCase: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStatesToProps,
    { registerCase }
)(withRouter(Register));