import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { GetPaymentsRequests, DeletePaymentRequest } from "../../actions/PaymentAction";
import { Link } from "react-router-dom";
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
            client: "",
            type: "",
            lawyer: "",
            description: "",
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    OnStatus(status, id) {
        if (status === "Pay by Cash") {
            return alert('Client will do Cash Payment');
        } else if (status === "Paid by Easypaisa") {
            global.MyPayReqID = id;
        } else if (status === "Paid by Credit Cash") {

        } else if (status === "pending") {
            return alert('Wait for Client Responce');

        }

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onDelete(_id) {
        const { user } = this.props.auth;
        await this.props.DeletePaymentRequest(_id);
        await this.props.GetPaymentsRequests(user.name);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });

        }
    }
    async componentDidMount() {
        const { user } = this.props.auth;
        await this.props.GetPaymentsRequests(user.name);
    }
    render() {
        const { paymentData, loading } = this.props.paymentData;
        let tableContent;
        (!paymentData.length) ? (
            tableContent = null
        ) : tableContent = paymentData.length ? paymentData.map(
            el =>
                <tr key={el._id} >
                    <th scope="row">{paymentData.indexOf(el) + 1}</th>
                    <td>{el.client ? el.client : "-"}</td>
                    <td>{el.case ? el.case : "-"}</td>
                    <td>{el.amount ? el.amount : "-"}</td>
                    <td>{el.description ? el.description : "-"}</td>
                    <td>
                        <Link  onClick={() => this.OnStatus(el.status, el._id)}
                            to="/PaymentStatus" >
                            {el.status}
                        </Link>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger"
                            data-toggle="tooltip"
                            data-placement="right" title="Click to Remove Request"
                            onClick={() => this.onDelete(el._id)}
                        >
                            Remove
                        </button></td>
                </tr>
        ) : null
        //        const { errors } = this.state;
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
                    <h1 style={{color:"white"}} className="display-4 text-center">Payment Requests</h1>
                    <p  style={{color:"white"}} className="lead text-center">Lawyer Send requests for payment shown here!</p>
                    <br />
                    <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <th scope="row">My Payment Requests</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table className="table table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Case</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">status</th>
                                    <th scope="col">Remove?</th>
                                </tr>
                            </thead>
                            <tbody style={{color:"white"}}>
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
                    DeletePaymentRequest: PropTypes.func.isRequired,
                GetPaymentsRequests: PropTypes.func.isRequired,
                auth: PropTypes.object.isRequired,
                errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
                    auth: state.auth,
                errors: state.errors,
                caseData: state.caseData,
                paymentData: state.paymentData

});
                export default connect(
                mapStatesToProps,
                {GetPaymentsRequests, DeletePaymentRequest}
                )(withRouter(Register));