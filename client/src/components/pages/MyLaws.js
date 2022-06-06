import React, { Component } from 'react';
import classnames from "classnames";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import PropTypes from "prop-types";
import { AddLaw, getMyLaws, DeleteMyLaw } from "../../actions/dictionaryAction";
const home = require("../../img/home.jpg");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      letter: "--",
      permalink: "--",
      body: "",
      published_at: "--",
      source: "--",
      name: "",

      findBy: '',
      val: '',
      data: {},
      loading: true,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async onDelete(_id) {
    const { user } = this.props.auth;
    await this.props.DeleteMyLaw(_id);
    await this.props.getMyLaws(user.name);
  }
  async onSubmit(e) {
    const { user } = this.props.auth;
    e.preventDefault();
    const newLaw = {
      title: this.state.title,
      letter: this.state.letter,
      permalink: this.state.permalink,
      body: this.state.body,
      published_at: this.state.published_at,
      source: this.state.source,
      name: user.name,
    };
    await this.props.AddLaw(newLaw);
    await this.props.getCase(user.name);
    this.setState({
      title: "",
      letter: "--",
      permalink: "--",
      body: "",
      published_at: "--",
      source: "--",
      name: "",
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
    await this.props.getMyLaws(user.name);
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
        <h1  style={{color:"white"}} className="display-4 text-center">My Laws</h1>
        <p  style={{color:"white"}} className="lead text-center">you can View Your own added laws information</p>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }} className="col-auto" >
          <Link to="/AddNewLaw"
            style={{ verticalAlign: '39px' }}
            //className="btn btn-lg text-white bg-dark"
            className="btn btn-primary"
          >
            Add New Law
          </Link>
        </div>
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
            <tbody style={{color:"white"}}  >
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
  AddLaw: PropTypes.func.isRequired,
  getMyLaws: PropTypes.func.isRequired,
  DeleteMyLaw: PropTypes.func.isRequired,
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
  { AddLaw, getMyLaws, DeleteMyLaw }
)(withRouter(Register));