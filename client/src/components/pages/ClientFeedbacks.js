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


    async componentDidMount() {
        await this.props.getLawyerReviews(global.LawyerName);
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
                    <h1 style={{ color: "white" }} className="display-4 text-center">Clients Reviews</h1>
                    <p style={{ color: "white" }} className="lead text-center">You can View client's Review about {global.LawyerName}</p>
                    <br />
                    <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
                        <div style={{ textAlign: "center" }}>
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <th scope="row">Reviews</th>
                                </thead>
                            </table>
                        </div>
                        {!loading ? <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }}>
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