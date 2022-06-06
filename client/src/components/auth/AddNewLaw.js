import React, { Component } from 'react';
import classnames from "classnames";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AddLaw } from "../../actions/dictionaryAction";
const home = require("../../img/home.jpg");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      letter: "",
      permalink: "",
      body: "",
      published_at: "",
      source: "",
      name: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    this.setState({
      title: "",
      letter: "",
      permalink: "",
      body: "",
      published_at: "",
      source: "",
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });

    }
  }
  render() {
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
        <div className="register mid container">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 style={{color:"white"}}  className="display-4 text-center">New Laws</h1>
                <p style={{color:"white"}} className="lead text-center">you can add New laws information of your own desire!</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.title
                      })}
                      placeholder="Title"
                      name="title"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.letter
                      })}
                      placeholder="Letter "
                      name="letter"
                      value={this.state.letter}
                      onChange={this.onChange}
                    />
                    {errors.letter && (
                      <div className="invalid-feedback">{errors.letter}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.permalink
                      })}
                      placeholder="Permalink (You may leave blank)"
                      name="permalink"
                      value={this.state.permalink}
                      onChange={this.onChange}
                    />
                    {errors.permalink && (
                      <div className="invalid-feedback">{errors.permalink}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.published_at
                      })}
                      placeholder="published_at (You may Leave Blank)"
                      name="published_at"
                      value={this.state.published_at}
                      onChange={this.onChange}
                    />
                    {errors.published_at && (
                      <div className="invalid-feedback">{errors.published_at}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.source
                      })}
                      placeholder="source"
                      name="source"
                      value={this.state.source}
                      onChange={this.onChange}
                    />
                    {errors.source && (
                      <div className="invalid-feedback">{errors.source}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.body
                      })}
                      placeholder="Body (Description)"
                      name="body"
                      value={this.state.body}
                      onChange={this.onChange}
                    />
                    {errors.body && (
                      <div className="invalid-feedback">{errors.body}</div>
                    )}
                  </div>

                  <input type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  AddLaw: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,

});
export default connect(
  mapStatesToProps,
  { AddLaw }
)(withRouter(Register));