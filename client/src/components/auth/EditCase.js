import React, { Component } from 'react';
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    registerCase, getCase, getCaseClient,
    getCaseType, getCaseCourt, DeleteCase, UpdateCase
} from "../../actions/caseAction";
const home = require("../../img/home.jpg");

class ViewCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findBy: '',
            val: '',
            data: {},
            loading: true,
            _id: global.MyCaseID,
            title: global.MyCaseTitle,
            type: global.MyCaseType,
            code: global.MyCaseCode,
            client: global.MyCaseClient,
            lawyer: global.MyCaseLawyer,
            court: global.MyCaseCourt,
            hearingDate: global.MyCaseHearingDate,
            description: global.MyCaseDescription,
            status: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async onSubmit(e) {
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
        if (this.state._id === '') {
            await this.props.registerCase(newCase);
            await this.props.getCase(user.name);
        } else {
            await this.props.UpdateCase(this.state._id, newCase);
            await this.props.getCase(user.name);
        }
        this.setState({
            _id: '',
            title: "",
            type: "",
            code: "",
            client: "",
            court: "",
            hearingDate: "",
            description: "",
            errors: {},
        });
    }
    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;
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
                    <h1 style={{color:"white"}} className="display-4 text-center">Edit Case Information</h1>
                    <p style={{color:"white"}} className="lead text-center">You can Edit your already inserted Case details</p>
                    <br />
                    <p style={{color:"white"}} id='here' className="lead text-center">Edit Case Details</p>
                    <br />
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col">
                                <label style={{color:"white"}}  htmlFor="name">Title</label>
                                <input type="text" id="title" placeholder="Name"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.name
                                    })}
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                                {errors.title && (
                                    <div className="invalid-tooltip">{errors.title}</div>
                                )}
                            </div>
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="type">Type</label>
                                <input type="type" id="type" placeholder="Case Type"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.type
                                    })}
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.onChange}
                                />
                                {errors.type && (
                                    <div className="invalid-tooltip">{errors.type}</div>
                                )}
                            </div>
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="code">Code</label>
                                <input type="text" id="code" placeholder="Case Code"
                                    alt={user.name}
                                    title="Unknwon"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.code
                                    })}
                                    name="code"
                                    value={this.state.code}
                                    onChange={this.onChange}
                                />
                                {errors.code && (
                                    <div className="invalid-tooltip">{errors.code}</div>
                                )}
                            </div>
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="client">Client</label>
                                <input type="text" id="client" placeholder="Client"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.client
                                    })}
                                    name="client"
                                    value={this.state.client}
                                    //onChange={this.onChange}
                                />
                                {errors.client && (
                                    <div className="invalid-tooltip">{errors.client}</div>
                                )}
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="court">Court</label>
                                <input type="text" id="court" placeholder="Court"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.court
                                    })}
                                    name="court"
                                    value={this.state.court}
                                    onChange={this.onChange}
                                />
                                {errors.court && (
                                    <div className="invalid-tooltip">{errors.court}</div>
                                )}
                            </div>
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="hearingDate">Hearing Date</label>
                                <input type="text" id="hearingDate" placeholder="Date"
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
                            <div className="col">
                                <label style={{color:"white"}} htmlFor="description">Description</label>
                                <textarea type="text" id="description" placeholder="Description"
                                    className={classnames("form-control", {
                                        "is-invalid": errors.description
                                    })}
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                                {errors.description && (
                                    <div className="invalid-tooltip">{errors.description}</div>
                                )}
                            </div>
                            <div className="col-auto" >
                                <button type="submit" style={{ verticalAlign: '-39px' }} className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
ViewCase.propTypes = {
    registerCase: PropTypes.func.isRequired,
    getCase: PropTypes.func.isRequired,
    getCaseCourt: PropTypes.func.isRequired,
    getCaseClient: PropTypes.func.isRequired,
    getCaseType: PropTypes.func.isRequired,
    DeleteCase: PropTypes.func.isRequired,
    StatusChange: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    caseData: state.caseData

});
export default connect(
    mapStatesToProps,
    { registerCase, getCase, getCaseCourt, getCaseClient, getCaseType, DeleteCase, UpdateCase }
)(withRouter(ViewCase));