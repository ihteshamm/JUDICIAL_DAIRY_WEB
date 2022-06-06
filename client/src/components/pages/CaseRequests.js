import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    registerCase, GetRequests, DeleteRequest,
    UpdateStatusAccepted, UpdateStatusRejected
} from "../../actions/caseAction";
import { Link } from "react-router-dom";
const home = require("../../img/home.jpg");

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            findBy: '',
            val: '',
            data: {},
            loading: true,
            _id: '',
            client: "",
            type: "",
            lawyer: "",
            description: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.SendRequest = this.SendRequest.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async SendRequest(client, type, description) {
        const { user } = this.props.auth;
        this.setState({
            type: type,
            code: "--",
            client: client,
            lawyer: user.name,
            court: "--",
            hearingDate: "--",
            description: description,
            status: true,
        });
    }

    async onDelete(_id) {
        const { user } = this.props.auth;
        await this.props.UpdateStatusRejected(_id);
        await this.props.GetRequests(user.name);
    }
    async onSubmit(_id, client, title, type, court, hearingDate, description) {
        const { user } = this.props.auth;
        const newCase = {
            title: title,
            type: type,
            code: "unknown",
            client: client,
            lawyer: user.name,
            court: court,
            hearingDate: hearingDate,
            description: description,
            status: true,
        };
        await this.props.registerCase(newCase);
        await this.props.UpdateStatusAccepted(_id);
        await this.props.GetRequests(user.name);

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });

        }
    }
    AddNewCase(_id, client, type, description) {
        global.MyCaseID = _id;
        global.MyCaseClient = client;
        global.MyCaseType = type;
        global.MyCaseDescription = description;

    }

    async componentDidMount() {
        const { user } = this.props.auth;
        await this.props.GetRequests(user.name);
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
                    <td>{el.client ? el.client : "-"}</td>
                    <td>{el.title ? el.title : "-"}</td>
                    <td>{el.type ? el.type : "-"}</td>
                    <td>{el.court ? el.court : "-"}</td>
                    <td>{el.hearingDate ? el.hearingDate : "-"}</td>
                    <td>{el.description ? el.description : "-"}</td>
                    <td>
                        <button type="button" className="btn btn-primary"
                            data-toggle="tooltip"
                            data-placement="right" title="Click to Accept Request"
                            onClick={() =>
                                this.onSubmit(
                                    el._id,
                                    el.client,
                                    el.title,
                                    el.type,
                                    el.court,
                                    el.hearingDate,
                                    el.description)}
                        >
                            Accept
                        </button></td>
                    <td style={{ cursor: 'pointer', color: '#00a4eb' }}
                        onClick=
                        {() => this.onDelete(el._id)}
                    >
                        Reject?
                    </td>
                </tr>
        ) : null
        //        const { errors } = this.state;
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
                    <h1 style={{color:"white"}} className="display-4 text-center">Case Requests</h1>
                    <p style={{color:"white"}} className="lead text-center">You can View your requests and can accept or reject</p>
                    <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <th scope="row">Client's Requests</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table className="table table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Court</th>
                                    <th scope="col">hearing Date</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Accept</th>
                                    <th scope="col">Reject?</th>
                                </tr>
                            </thead>
                            <tbody style={{color:"white"}} >
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
    DeleteRequest: PropTypes.func.isRequired,
    UpdateStatusAccepted: PropTypes.func.isRequired,
    UpdateStatusRejected: PropTypes.func.isRequired,
    GetRequests: PropTypes.func.isRequired,
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
    { registerCase, GetRequests, DeleteRequest, UpdateStatusRejected, UpdateStatusAccepted }
)(withRouter(Register));




// import React, { Component } from 'react';
// import ReactLoading from 'react-loading';
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import {
//     registerCase, GetRequests, DeleteRequest,
//     UpdateStatusAccepted, UpdateStatusRejected
// } from "../../actions/caseAction";
// import { Link } from "react-router-dom";
// const home = require("../../img/home.jpg");

// class Register extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             status: '',
//             findBy: '',
//             val: '',
//             data: {},
//             loading: true,
//             _id: '',
//             client: "",
//             type: "",
//             lawyer: "",
//             description: "",
//             errors: {},
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//         this.SendRequest = this.SendRequest.bind(this);
//         this.onDelete = this.onDelete.bind(this);
//     }
//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value });
//     }
//     async SendRequest(client, type, description) {
//         const { user } = this.props.auth;
//         this.setState({
//             type: type,
//             code: "--",
//             client: client,
//             lawyer: user.name,
//             court: "--",
//             hearingDate: "--",
//             description: description,
//             status: true,
//         });
//     }

//     async onDelete(_id) {
//         const { user } = this.props.auth;
//         await this.props.UpdateStatusRejected(_id);
//         await this.props.GetRequests(user.name);
//     }
//     async onSubmit(_id, client, type, description) {
//         const { user } = this.props.auth;
//         const newCase = {
//             title: "--",
//             type: type,
//             code: "--",
//             client: client,
//             lawyer: user.name,
//             court: "--",
//             hearingDate: "--",
//             description: description,
//             status: true,
//         };
//         await this.props.registerCase(newCase);
//         await this.props.UpdateStatusAccepted(_id);
//         await this.props.GetRequests(user.name);

//     }
//     UNSAFE_componentWillReceiveProps(nextProps) {
//         if (nextProps.errors) {
//             this.setState({ errors: nextProps.errors });

//         }
//     }
//     async componentDidMount() {
//         const { user } = this.props.auth;
//         await this.props.GetRequests(user.name);
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
//                     <td>{el.client ? el.client : "-"}</td>
//                     <td>{el.type ? el.type : "-"}</td>
//                     <td>{el.description ? el.description : "-"}</td>
//                     <td>
//                         <button type="button" className="btn btn-danger"
//                             data-toggle="tooltip"
//                             data-placement="right" title="Click to Accept Request"
//                             onClick={() =>
//                                 this.onSubmit(el._id,
//                                     el.client,
//                                     el.type,
//                                     el.description,
//                                 )
//                             }
//                         >
//                             Accept
//                         </button></td>
//                     <td style={{ cursor: 'pointer', color: '#00a4eb' }}
//                         onClick=
//                         {() => this.onDelete(el._id)}
//                     >
//                         Reject?
//                     </td>
//                 </tr>
//         ) : null
//         //        const { errors } = this.state;
//         return (
//             <div className="mid container">
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <div style={{ width: "5rem", height: '4rem' }}>
//               <Link to="/Lawyer_Dashboard" className="btn btn-lg  ">
//                 <img src={home} alt="Home" />
//               </Link>
//             </div>
//             <Link to="/CaseRequests" className="btn btn-lg text-white bg-dark">
//               Case Requests
//             </Link>
//             <Link to="/viewCase" className="btn btn-lg text-white bg-dark">
//               Cases
//             </Link>
//             <Link to="/Chat" className="btn btn-lg text-white bg-dark">
//               Chat
//             </Link>
//             <Link to="/Payments" className="btn btn-lg text-white bg-dark">
//               Payments
//             </Link>
//             <Link to="/Dictionary" className="btn btn-lg text-white bg-dark">
//               Dictionary
//             </Link>
//             <Link to="/ProfileLawyer" className="btn btn-lg text-white bg-dark">
//               Profile
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#mobile-nav"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>
//           </div>
//         </nav>
//                 <h1 className="display-4 text-center">Case Requests</h1>
//                 <p className="lead text-center">You can View your requests and can accept or reject</p>
//                 <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
//                     <div style={{ textAlign: "center" }}>
//                         <table className="table table-striped table-hover">
//                             <thead className="thead-dark">
//                                 <th scope="row">Client's Requests</th>
//                             </thead>
//                         </table>
//                     </div>
//                     {!loading ? <table className="table table-striped table-hover">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Client</th>
//                                 <th scope="col">Type</th>
//                                 <th scope="col">Description</th>
//                                 <th scope="col">Accept</th>
//                                 <th scope="col">Reject?</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tableContent}

//                         </tbody>
//                     </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
//                 </div>
//             </div>
//         );
//     }
// }
// Register.propTypes = {
//     registerCase: PropTypes.func.isRequired,
//     DeleteRequest: PropTypes.func.isRequired,
//     UpdateStatusAccepted: PropTypes.func.isRequired,
//     UpdateStatusRejected: PropTypes.func.isRequired,
//     GetRequests: PropTypes.func.isRequired,
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
//     { registerCase, GetRequests, DeleteRequest, UpdateStatusRejected, UpdateStatusAccepted }
// )(withRouter(Register));