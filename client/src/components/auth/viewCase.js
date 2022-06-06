import React, { Component } from 'react';
import classnames from "classnames";
import ReactLoading from 'react-loading';
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
        this.onDelete = this.onDelete.bind(this);
        this.onFtechDetails = this.onFtechDetails.bind(this);
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
        } else if (this.state.findBy === 'court') {
            await this.props.getCaseCourt(this.state.val, user.name);
        }
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    async onDelete(_id) {
        const { user } = this.props.auth;
        await this.props.DeleteCase(_id);
        await this.props.getCase(user.name);
    }
    EditCaseData(_id, title, type, code, client, lawyer, court, hearingDate, description) {
        global.MyCaseID = _id;
        global.MyCaseTitle = title;
        global.MyCaseType = type;
        global.MyCaseCode = code;
        global.MyCaseClient = client;
        global.MyCaseLawyer = lawyer;
        global.MyCaseCourt = court;
        global.MyCaseHearingDate = hearingDate;
        global.MyCaseDescription = description;

    }
    async componentDidMount() {
        const { user } = this.props.auth;
        await this.props.getCase(user.name);
    }
    render() {
        const { caseData, loading } = this.props.caseData;
        let tableContent;
        (!caseData.length) ? (
            tableContent = null
        ) : tableContent = caseData.length ? caseData.map(
            el =>
                <tr key={el._id} >
                    <th  scope="row">{caseData.indexOf(el) + 1}</th>
                    <td style={{color:"red"}}>{el.title ? el.title : "-"}</td>
                    <td>{el.type ? el.type : "-"}</td>
                    <td>{el.code ? el.code : "-"}</td>
                    <td>{el.client ? el.client : "-"}</td>
                    <td>{el.court ? el.court : "-"}</td>
                    <td>{el.hearingDate ? el.hearingDate : "-"}</td>
                    <td>{el.description ? el.description : "-"}</td>
                    <td>{el.status ? el.status : "-"}</td>
                    <td  >
                        <Link onClick={() => this.EditCaseData(
                            el._id,
                            el.title,
                            el.type,
                            el.code,
                            el.client,
                            el.lawyer,
                            el.court,
                            el.hearingDate,
                            el.description,
                            el.status)}
                            to="/EditCase" className="btn btn-primary" type="button">
                            Edit
                        </Link>
                    </td>
                    <td>
                        <Link
                            onClick=
                            {() => this.onDelete(el._id)}
                            className="btn btn-danger" type="button">
                            Delete
                        </Link>
                    </td>
                </tr>
        ) : null
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
                    <h1 style={{color:"white"}} className="display-4 text-center">My Cases</h1>
                    <p style={{color:"white"}} className="lead text-center">You can Add View Edit Delete your Cases</p>
                    <br />
                    <br />
                    <div className="lead text-center">
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
                                <option value="court">Court</option>
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
                            <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
                                onClick={this.onFtechDetails}>Search Cases</button>
                        </div>
                    </div>
                    <div style={{ color:"white", marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table style={{color:"white"}} className="table table-striped table-hover hvr-white">
                                <thead className="thead-dark">
                                    <th scope="row">My Cases</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table style={{color:"white"}} className="table  ">
                            <thead style={{color:"white"}} className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Court</th>
                                    <th scope="col">Hearing</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete?</th>
                                </tr>
                            </thead>
                            <tbody  >
                                {tableContent}
                            </tbody>
                        </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="red" /></div>}
                    </div>
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



// import React, { Component } from 'react';
// import classnames from "classnames";
// import ReactLoading from 'react-loading';
// import { withRouter, Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import {
//     registerCase, getCase, getCaseClient,
//     getCaseType, getCaseCourt, DeleteCase, UpdateCase
// } from "../../actions/caseAction";

// class ViewCase extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             findBy: '',
//             val: '',
//             data: {},
//             loading: true,
//             _id: '',
//             title: "",
//             type: "",
//             code: "",
//             client: "",
//             lawyer: "",
//             court: "",
//             hearingDate: "",
//             description: "",
//             status: "",
//             errors: {},
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onDelete = this.onDelete.bind(this);
//         this.onFtechDetails = this.onFtechDetails.bind(this);
//         this.onStatusChange = this.onStatusChange.bind(this);
//     }
//     async onFtechDetails() {
//         const { user } = this.props.auth;
//         this.setState({ loading: true });
//         if (this.state.findBy === 'all') {
//             await this.props.getCase(user.name);
//         }
//         else if (this.state.findBy === 'client') {
//             await this.props.getCaseClient(this.state.val, user.name);
//         }
//         else if (this.state.findBy === 'type') {
//             await this.props.getCaseType(this.state.val, user.name);
//         } else if (this.state.findBy === 'court') {
//             await this.props.getCaseCourt(this.state.val, user.name);
//         }
//     }
//     onChange(event) {
//         this.setState({ [event.target.name]: event.target.value });
//     }
//     async onDelete(_id) {
//         const { user } = this.props.auth;
//         await this.props.DeleteCase(_id);
//         await this.props.getCase(user.name);
//     }
//     async onStatusChange(title, status) {
//         await this.props.StatusChange(title, status);
//         const user = this.props.auth;
//         await this.props.getCase(user.name);
//     }
//     async onSubmit(e) {
//         const { user } = this.props.auth;
//         e.preventDefault();
//         const newCase = {
//             title: this.state.title,
//             type: this.state.type,
//             code: this.state.code,
//             client: this.state.client,
//             lawyer: user.name,
//             court: this.state.court,
//             hearingDate: this.state.hearingDate,
//             description: this.state.description,
//             status: true,
//         };
//         if (this.state._id === '') {
//             await this.props.registerCase(newCase);
//             await this.props.getCase(user.name);
//         } else {
//             await this.props.UpdateCase(this.state._id, newCase);
//             await this.props.getCase(user.name);
//         }
//         this.setState({
//             _id: '',
//             title: "",
//             type: "",
//             code: "",
//             client: "",
//             court: "",
//             hearingDate: "",
//             description: "",
//             errors: {},
//         });
//     }
//     scrollToBottom(_id, title, type, code, client, court, hearingDate, description) {
//         document.getElementById('here').scrollIntoView({ behavior: "smooth", block: "start" })
//         this.setState({
//             _id: _id,
//             title: title,
//             type: type,
//             code: code,
//             client: client,
//             court: court,
//             hearingDate: hearingDate,
//             description: description,
//             errors: {},
//         });
//     }
//     async componentDidMount() {
//         const { user } = this.props.auth;
//         await this.props.getCase(user.name);
//     }
//     render() {
//         const { caseData, loading } = this.props.caseData;
//         let tableContent;
//         (!caseData.length) ? (
//             tableContent = null
//         ) : tableContent = caseData.length ? caseData.map(
//             el =>
//                 <tr key={el._id} >
//                     <th scope="row">{caseData.indexOf(el) + 1}</th>
//                     <td>{el.title ? el.title : "-"}</td>
//                     <td>{el.type ? el.type : "-"}</td>
//                     <td>{el.code ? el.code : "-"}</td>
//                     <td>{el.client ? el.client : "-"}</td>
//                     <td>{el.court ? el.court : "-"}</td>
//                     <td>{el.hearingDate ? el.hearingDate : "-"}</td>
//                     <td>{el.description ? el.description : "-"}</td>
//                     <td>{el.status ? el.status : "-"}</td>
//                     <td>
//                         <button type="button" className="btn btn-primary"
//                             data-toggle="tooltip"
//                             data-placement="right" title="Click to Mark Completed"
//                             onClick={() => this.scrollToBottom(
//                                 el._id,
//                                 el.title,
//                                 el.type,
//                                 el.code,
//                                 el.client,
//                                 el.court,
//                                 el.hearingDate,
//                                 el.description,
//                                 el.status)}
//                         >
//                             Edit
//                         </button>
//                     </td>

//                     <td style={{ cursor: 'pointer', color: '#00a4eb' }}
//                         onClick=
//                         {() => this.onDelete(el._id)}
//                     >
//                         Delete?
//                     </td>
//                 </tr>
//         ) : null
//         const { errors } = this.state;
//         const { user } = this.props.auth;
//         return (
//             <div className="mid container">
//                 <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//                     <div className="container">
//                         <Link to="/CaseRequests" className="btn btn-lg text-white bg-dark">
//                             Case Requests
//                         </Link>
//                         <Link to="/viewCase" className="btn btn-lg text-white bg-dark">
//                             Cases
//                         </Link>
//                         <Link to="/Chat" className="btn btn-lg text-white bg-dark">
//                             Chat
//                         </Link>
//                         <Link to="/Payments" className="btn btn-lg text-white bg-dark">
//                             Payments
//                         </Link>
//                         <Link to="/Dictionary" className="btn btn-lg text-white bg-dark">
//                             Dictionary
//                         </Link>
//                         <Link to="/ProfileLawyer" className="btn btn-lg text-white bg-dark">
//                             Profile
//                         </Link>
//                         <button
//                             className="navbar-toggler"
//                             type="button"
//                             data-toggle="collapse"
//                             data-target="#mobile-nav"
//                         >
//                             <span className="navbar-toggler-icon" />
//                         </button>
//                     </div>
//                 </nav>
//                 <h1 className="display-4 text-center">My Cases</h1>
//                 <p className="lead text-center">You can Add View Edit Delete your Cases</p>
//                 <br />
//                 <br />
//                 <div className="lead text-center">
//                     <div className="col-8 input-group-prepend">
//                         <select className={classnames("form-control", {
//                             "is-invalid": errors.title
//                         })}
//                             id="find" onChange={this.onChange} value={this.state.findBy}
//                             name="findBy"
//                         >   <option value="" defaultValue disabled>Select</option>
//                             <option value="all">All Cases</option>
//                             <option value="type">Type</option>
//                             <option value="client">Clients</option>
//                             <option value="court">Court</option>
//                         </select>
//                         <input type="text" id="val" placeholder="Value"
//                             className={classnames("form-control", {
//                                 "is-invalid": errors.title
//                             })}
//                             onChange={this.onChange}
//                             name="val"
//                             value={this.state.val}
//                             required={true}
//                         />
//                         {errors.title && (
//                             <div className="invalid-tooltip">{errors.title}</div>
//                         )}
//                         <button className="btn btn-primary" style={{ fontSize: '12px', width: '200px' }}
//                             onClick={this.onFtechDetails}>Search Cases</button>
//                     </div>
//                 </div>
//                 <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
//                     <div style={{ textAlign: "center" }}>
//                         <table className="table table-striped table-hover">
//                             <thead className="thead-dark">
//                                 <th scope="row">My Cases</th>
//                             </thead>
//                         </table>
//                     </div>
//                     {!loading ? <table className="table table-striped table-hover">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Title</th>
//                                 <th scope="col">Type</th>
//                                 <th scope="col">Code</th>
//                                 <th scope="col">Client</th>
//                                 <th scope="col">Court</th>
//                                 <th scope="col">Hearing</th>
//                                 <th scope="col">Description</th>
//                                 <th scope="col">Status</th>
//                                 <th scope="col">Edit</th>
//                                 <th scope="col">Delete?</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tableContent}
//                         </tbody>
//                     </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//                 <p id='here' className="lead text-center">Edit Case Details</p>
//                 <br />
//                 <form noValidate onSubmit={this.onSubmit}>
//                     <div className="row">
//                         <div className="col">
//                             <label htmlFor="name">Title</label>
//                             <input type="text" id="title" placeholder="Name"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.name
//                                 })}
//                                 name="title"
//                                 value={this.state.title}
//                                 onChange={this.onChange}
//                             />
//                             {errors.title && (
//                                 <div className="invalid-tooltip">{errors.title}</div>
//                             )}
//                         </div>
//                         <div className="col">
//                             <label htmlFor="type">Type</label>
//                             <input type="type" id="type" placeholder="Case Type"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.type
//                                 })}
//                                 name="type"
//                                 value={this.state.type}
//                                 onChange={this.onChange}
//                             />
//                             {errors.type && (
//                                 <div className="invalid-tooltip">{errors.type}</div>
//                             )}
//                         </div>
//                         <div className="col">
//                             <label htmlFor="code">Code</label>
//                             <input type="text" id="code" placeholder="Case Code"
//                                 alt={user.name}
//                                 title="Unknwon"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.code
//                                 })}
//                                 name="code"
//                                 value={this.state.code}
//                                 onChange={this.onChange}
//                             />
//                             {errors.code && (
//                                 <div className="invalid-tooltip">{errors.code}</div>
//                             )}
//                         </div>
//                         <div className="col">
//                             <label htmlFor="client">Client</label>
//                             <input type="text" id="client" placeholder="Client"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.client
//                                 })}
//                                 name="client"
//                                 value={this.state.client}
//                                 onChange={this.onChange}
//                             />
//                             {errors.client && (
//                                 <div className="invalid-tooltip">{errors.client}</div>
//                             )}
//                         </div>
//                     </div>
//                     <br />
//                     <div className="row">
//                         <div className="col">
//                             <label htmlFor="court">Court</label>
//                             <input type="text" id="court" placeholder="Court"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.court
//                                 })}
//                                 name="court"
//                                 value={this.state.court}
//                                 onChange={this.onChange}
//                             />
//                             {errors.court && (
//                                 <div className="invalid-tooltip">{errors.court}</div>
//                             )}
//                         </div>
//                         <div className="col">
//                             <label htmlFor="hearingDate">Hearing Date</label>
//                             <input type="text" id="hearingDate" placeholder="Date"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.hearingDate
//                                 })}
//                                 name="hearingDate"
//                                 value={this.state.hearingDate}
//                                 onChange={this.onChange}
//                             />
//                             {errors.hearingDate && (
//                                 <div className="invalid-tooltip">{errors.hearingDate}</div>
//                             )}
//                         </div>
//                         <div className="col">
//                             <label htmlFor="description">Description</label>
//                             <input type="text" id="description" placeholder="Description"
//                                 className={classnames("form-control", {
//                                     "is-invalid": errors.description
//                                 })}
//                                 name="description"
//                                 value={this.state.description}
//                                 onChange={this.onChange}
//                             />
//                             {errors.description && (
//                                 <div className="invalid-tooltip">{errors.description}</div>
//                             )}
//                         </div>
//                         <div className="col-auto" >
//                             <button type="submit" style={{ verticalAlign: '-39px' }} className="btn btn-primary">Save</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }
// ViewCase.propTypes = {
//     registerCase: PropTypes.func.isRequired,
//     getCase: PropTypes.func.isRequired,
//     getCaseCourt: PropTypes.func.isRequired,
//     getCaseClient: PropTypes.func.isRequired,
//     getCaseType: PropTypes.func.isRequired,
//     DeleteCase: PropTypes.func.isRequired,
//     StatusChange: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

// const mapStatesToProps = state => ({
//     auth: state.auth,
//     errors: state.errors,
//     caseData: state.caseData

// });
// export default connect(
//     mapStatesToProps,
//     { registerCase, getCase, getCaseCourt, getCaseClient, getCaseType, DeleteCase, UpdateCase }
// )(withRouter(ViewCase));