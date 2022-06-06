import React, { Component } from 'react';
import classnames from "classnames";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { getLaws, SearchLaws } from "../../actions/dictionaryAction";
const home = require("../../img/home.jpg");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      findBy: '',
      val: "",
      data: {},
      loading: true,
      title: "",
      section: "",
      description: "",
      errors: {},
    };
    this.onFtechDetails = this.onFtechDetails.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async onFtechDetails() {
    this.setState({ loading: true });
    if (!(this.state.val === null)) {
      await this.props.SearchLaws(this.state.val);
    } else {
      return alert('Enter Some Text');
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await this.props.getLaws();
  }
  render() {
    const { dictionaryData, loading } = this.props.dictionaryData;
    let tableContent;
    (!dictionaryData.length) ? (
      tableContent = null
    ) : tableContent = dictionaryData.length ? dictionaryData.map(
      el =>
        <tr key={el._id} >
          <th scope="row">{dictionaryData.indexOf(el) + 1}</th>
          <td>{el.letter ? el.letter : "-"}</td>
          <td>{el.title ? el.title : "-"}</td>
          <td>{el.permalink ? el.permalink : "-"}</td>
          <td>{el.published_at ? el.published_at : "-"}</td>
          <td>{el.source ? el.source : "-"}</td>
          <td>{el.body ? el.body : "-"}</td>
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
        <h1 style={{color:"white"}} className="display-4 text-center">Law Dictionary</h1>
        <p style={{color:"white"}} className="lead text-center">you can view all laws information here!</p>
        <br />
        <div className="col-8 input-group-prepend">
          <input type="text" id="val" placeholder="Search by Letter or Title"
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
            onClick={this.onFtechDetails}>Search Laws</button>
        </div>
        <div style={{ marginTop: '50px', overflow: 'scroll', maxHeight: 800 }}>
          {!loading ? <table className="table table-striped ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Letter</th>
                <th scope="col">title</th>
                <th scope="col">Permalink</th>
                <th scope="col">published_at</th>
                <th scope="col">source</th>
                <th scope="col">Body</th>
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
  getLaws: PropTypes.func.isRequired,
  SearchLaws: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  dictionaryData: state.dictionaryData

});
export default connect(
  mapStatesToProps,
  { getLaws, SearchLaws }
)(withRouter(Register));