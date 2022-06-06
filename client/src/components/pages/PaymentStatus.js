import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { getEasypaisaResponce, deleteEasypaisaResponce } from "../../actions/EasypaisaResponceAction";
import { Link } from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            findBy: '',
            val: '',
            data: {},
            loading: true,
            errors: {},
        };
        this.onDelete = this.onDelete.bind(this);
    }
    async onDelete(_id) {
        await this.props.deleteEasypaisaResponce(_id);
        await this.props.getEasypaisaResponce(global.MyPayReqID);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });

        }
    }
    async componentDidMount() {
        await this.props.getEasypaisaResponce(global.MyPayReqID);
    }
    render() {
        const { EasypaisaData, loading } = this.props.EasypaisaData;
        let tableContent;
        (!EasypaisaData.length) ? (
            tableContent = null
        ) : tableContent = EasypaisaData.length ? EasypaisaData.map(
            el =>
                <tr key={el._id} >
                    <th scope="row">{EasypaisaData.indexOf(el) + 1}</th>
                    <td>{el.transitionID ? el.transitionID : "-"}</td>
                    <td>{el.date ? el.date : "-"}</td>
                    <td>{el.clientEasypisaName ? el.clientEasypisaName : "-"}</td>
                    <td>{el.clientEasypaisaNumber ? el.clientEasypaisaNumber : "-"}</td>
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
                <h1 style={{color:"white"}} className="display-4 text-center">Easypaisa Payment Details</h1>
                <p style={{color:"white"}} className="lead text-center">Easypaisa payment details shared by Clients</p>
                <br />
                <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                    <div style={{ textAlign: "center" }}>
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <th scope="row">Easypaisa Payments</th>
                            </thead>
                        </table>
                    </div>
                    {!loading ? <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Transition ID</th>
                                <th scope="col">Date</th>
                                <th scope="col">Client</th>
                                <th scope="col">Client Phone</th>
                                <th scope="col">Remove?</th>
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
    getEasypaisaResponce: PropTypes.func.isRequired,
    deleteEasypaisaResponce: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    caseData: state.caseData,
    EasypaisaData: state.EasypaisaData

});
export default connect(
    mapStatesToProps,
    { getEasypaisaResponce, deleteEasypaisaResponce }
)(withRouter(Register));