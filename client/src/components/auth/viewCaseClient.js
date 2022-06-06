import React, { Component } from 'react';
import classnames from "classnames";
import ReactLoading from 'react-loading';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { registerCase, getCase, getCase_Client, getCaseType, DeleteCase, UpdateCase } from "../../actions/caseAction";
import axios from 'axios';
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
            title: "",
            type: "",
            code: "",
            client: "",
            lawyer: "",
            court: "",
            hearingDate: "",
            description: "",
            status: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onFtechDetails = this.onFtechDetails.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }
    async onFtechDetails() {
        const { user } = this.props.auth;
        this.setState({ loading: true });
        if (this.state.findBy === 'all') {
            await this.props.getCase(user.name);
        }
        else if (this.state.findBy === 'client') {
            await this.props.getCaseClient(this.state.val, user.name);
        }
        else if (this.state.findBy === 'type') {
            await this.props.getCaseType(this.state.val, user.name);
        } else if (this.state.findBy === 'isAvailable') {
            await axios.get(`/api/student/all`).then((res) => {
                let tempVal = this.state.val;
                tempVal = tempVal.trim().toLowerCase();
                if (tempVal === 'absent') {
                    tempVal = false
                } else if (tempVal === 'present') {
                    tempVal = true
                } else {
                    this.setState({ loading: false })
                    return alert("Input can be 'absent' or 'present' only!");
                }
                const filteredData = res.data ? res.data.filter(el => el.isAvailable === tempVal
                ) : [];
                const data = {
                    data: filteredData
                }
                this.setState({ data: data, loading: false });
                if (!filteredData.length) {
                    alert("Not Found");
                }
            }
            ).catch(err =>
                console.log(err)
            );
        } else {
            this.setState({ loading: false })
            return alert('Select Type or Client?');
        }
    }
    onBatchSelect(lawyer) {
        this.props.history.push(`/${lawyer}`);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onDelete(_id) {
        const { user } = this.props.auth;
        await this.props.DeleteCase(_id);
        await this.props.getCase(user.name);
    }
    async onStatusChange(title, status) {
        await this.props.StatusChange(title, status);
        const user = this.props.auth;
        await this.props.getCase(user.name);
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
            console.table(newCase);
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
    async onEdit(_id, title, type, code, client, court, hearingDate, description, status) {
        this.setState({
            _id: _id,
            title: title,
            type: type,
            code: code,
            client: client,
            court: court,
            hearingDate: hearingDate,
            description: description,
            errors: {},
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });

        }
    }
    async componentDidMount() {
        const { user } = this.props.auth;
        await this.props.getCase_Client(user.name);
    }
    render() {
        const { caseData, loading } = this.props.caseData;
        let tableContent;
        (!caseData.length) ? (
            tableContent = null
        ) : tableContent = caseData.length ? caseData.map(
            el =>
                <tr key={el._id} >
                    <th scope="row">{caseData.indexOf(el) + 1}</th>
                    <td>{el.title ? el.title : "-"}</td>
                    <td>{el.type ? el.type : "-"}</td>
                    <td>{el.code ? el.code : "-"}</td>
                    <td>{el.lawyer ? el.lawyer : "-"}</td>
                    <td>{el.court ? el.court : "-"}</td>
                    <td>{el.hearingDate ? el.hearingDate : "-"}</td>
                    <td>{el.description ? el.description : "-"}</td>
                    <td>{el.status ? el.status : "-"}</td>
                </tr>
        ) : null
        const { errors } = this.state;
        //       const { user } = this.props.auth;
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
                    <h1 style={{ color: "white" }} className="display-4 text-center">My Cases</h1>
                    <p style={{ color: "white" }} className="lead text-center">You can View your Accepted Cases</p>
                    <br />
                    <label htmlFor="find" style={{ marginLeft: '14px' }}><h5>Search Cases</h5></label>
                    <div className="col-8 input-group-prepend">
                        <select className={classnames("form-control", {
                            "is-invalid": errors.title
                        })}
                            id="find" onChange={this.onChange} value={this.state.findBy}
                            name="findBy"
                        >   <option value="" defaultValue disabled>Select</option>
                            <option value="all">All Cases</option>
                            <option value="type">Type</option>
                            <option value="client">Clients</option>
                            <option value="isAvailable">Active/Suspended</option>
                        </select>
                        <input type="text" id="val" placeholder="Value"
                            className={classnames("form-control", {
                                "is-invalid": errors.title
                            })}
                            onChange={this.onChange}
                            name="val"
                            value={this.state.val}
                            required={true}
                        />
                        {errors.title && (
                            <div className="invalid-tooltip">{errors.title}</div>
                        )}
                        <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }} onClick={this.onFtechDetails}>Find Cases</button>
                    </div>
                    <br />
                    <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <th scope="row">My Cases</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table className="table table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Lawyer</th>
                                    <th scope="col">Court</th>
                                    <th scope="col">Hearing</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }} >
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
    registerCase: PropTypes.func.isRequired,
    getCase: PropTypes.func.isRequired,
    getCase_Client: PropTypes.func.isRequired,
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
    { registerCase, getCase, getCase_Client, getCaseType, DeleteCase, UpdateCase }
)(withRouter(Register));