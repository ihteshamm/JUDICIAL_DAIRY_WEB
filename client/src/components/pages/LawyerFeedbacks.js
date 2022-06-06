import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { getLawyerReviews } from "../../actions/reviewAction";
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async onDelete(_id) {
        const { user } = this.props.auth;
        await this.props.DeleteMyReview(_id);
        await this.props.getMyReviews(user.name);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });

        }
    }
    async componentDidMount() {
        const { user } = this.props.auth;
        await this.props.getLawyerReviews(user.name);
    }
    render() {
        const { reviewData, loading } = this.props.reviewData;
        let tableContent;
        (!reviewData.length) ? (
            tableContent = null
        ) : tableContent = reviewData.length ? reviewData.map(
            el =>
                <tr key={el._id} >
                    <th scope="row">{reviewData.indexOf(el) + 1}</th>
                    <td>{el.title ? el.title : "-"}</td>
                    <td>{el.description ? el.description : "-"}</td>
                    <td>{el.ratings ? el.ratings : "-"}</td>
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
                    <h1 style={{ color: "white" }} className="display-4 text-center">Clients Reviews</h1>
                    <p style={{ color: "white" }} className="lead text-center">You can View Your client's Review about You!</p>
                    <br />
                    <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <th scope="row">Reviews</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table className="table table-striped ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }} >
                                {tableContent}

                            </tbody>
                        </table> : <div style={{ display: 'flex', justifyContent: 'center' }}><ReactLoading type="bars" color="#f56f42" /></div>}
                    </div>
                </div>
            </div >
        );
    }
}
Register.propTypes = {
    getLawyerReviews: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    reviewData: state.reviewData

});
export default connect(
    mapStatesToProps,
    { getLawyerReviews }
)(withRouter(Register));