import React, { Component } from 'react';
import classnames from "classnames";
import ReactLoading from 'react-loading';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import 'react-slideshow-image/dist/styles.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from "prop-types";
import { registerCase, getCase_Client, getCaseType, DeleteCase, UpdateCase } from "../../actions/caseAction";
import { getmessages, addmessage } from "../../actions/chatAction";
import moment from 'moment';
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
      sender: "",
      reciever: "",
      message: "",
      date: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onGetMessages = this.onGetMessages.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
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

  async onSubmit(event) {
    event.preventDefault();
    const { user } = this.props.auth;
    const newCase = {
      message: this.state.message,
      sender: user.name,
      reciever: this.state.reciever,
      date: moment().format("DD-MM-YYYY hh:mm:ss"),
    };
    await this.props.addmessage(newCase);
    //   await this.props.getCase(user.name);
    this.setState({
      message: "",
      date: "",
      reciever: this.state.reciever,
      errors: {},
    });
    await this.props.getmessages(user.name, this.state.reciever);
    this.setState({
      reciever: this.state.reciever
    });
  }

  async onGetMessages(client) {
    const { user } = this.props.auth;
    await this.props.getmessages(user.name, client);
    this.setState({
      reciever: client
    });

  }
  //   componentWillUnmount() {
  //     clearInterval(this.timer);
  // }
  // componentWillReceiveProps(nextProps) {
  //   const { user } = this.props.auth;
  //     setInterval(() => {
  //       this.props.getmessages(user.name, this.state.reciever);
  //      this.setState({
  //        reciever: this.state.reciever
  //      });
  //    }, 1000);
  // }
  async componentDiDMount() {
    const { user } = this.props.auth;
    await this.props.getCase(user.name);
    this.props.getmessages(user.name, this.state.reciever);
    this.setState({
      reciever: this.state.reciever
    });
  }

  render() {
    const { caseData, loading } = this.props.caseData;
    let tableContent;
    (!caseData.length) ? (
      tableContent = null
    ) : tableContent = caseData.length ? caseData.map(
      el =>
        <tr key={el._id} >
          <td style={{ cursor: 'pointer', color: '#00a4eb' }}
            onClick={() => this.onGetMessages(el.lawyer)}
          >
            {el.lawyer ? el.lawyer : "-"}</td>
        </tr>
    ) : null

    const { chatData } = this.props.chatData;
    let MessageContent;
    (!chatData.length) ? (
      MessageContent = null
    ) : MessageContent = chatData.length ? chatData.map(
      el =>
        <table>
          <tr>
            <td style={{ cursor: 'pointer', color: 'red' }}>
              {el.sender ? el.sender : "\n"}
            </td>
            {el.message ? el.message : "\n"}
          </tr>
        </table>

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
        <div className="mid container"  >
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
          <div className="mid container">
            <div className="row">
              <div className="col">
                <div style={{ marginTop: '50px', width: 200, maxHeight: 250 }}>
                  {!loading ? <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Chat Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableContent}
                    </tbody>
                  </table> : <div style={{ display: 'flex' }}><ReactLoading color="#f56f42" /></div>}
                </div>
              </div>
              <div className="col" >
                <style dangerouslySetInnerHTML={{ __html: "\n#messages{marginTop:5px;height:320px;width:800px}\n" }} />
                <div className="container">
                  <div className="row">
                    <div className="col-md-100 offset-md--3 col-sm-0">
                      <div style={{ marginTop: '50px' }} className="card" >
                        <ScrollToBottom>
                          <div id="messages" className="card-block">
                            <div ><span className="author">{this.state.reciever}</span> Hello!</div>
                            <br />
                            <div
                            //                          style={{ display: 'flex', justifyContent: 'right' }}
                            ><span className="author">{MessageContent}</span></div>
                            <br />
                          </div>
                        </ScrollToBottom>
                      </div>
                    </div>

                    <form noValidate onSubmit={this.onSubmit}>
                      <div style={{ width: 850, }} className="row">
                        <div className="col">
                          <input
                            type="text" id="message" placeholder="Enter Message..."
                            className={classnames("form-control", {
                              "is-invalid": errors.message
                            })}
                            name="message"
                            value={this.state.message}
                            onChange={this.onChange}

                          />
                          {errors.message && (
                            <div className="invalid-tooltip">{errors.message}</div>
                          )}
                        </div>
                        <div className="col-auto" >
                          <button type="submit" style={{
                            verticalAlign: '39px',
                            marginTop: '0px', width: 150,
                            maxHeight: 2500
                          }} className="btn btn-primary">Send Message</button>
                          {/* <button type="submit" style={{
                          verticalAlign: '39px',
                          marginTop: '0px', width: 150,
                          maxHeight: 2500
                        }} className="btn btn-danger">Clear Chat!</button> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
};
Register.propTypes = {
  registerCase: PropTypes.func.isRequired,
  getCase_Client: PropTypes.func.isRequired,
  addmessage: PropTypes.func.isRequired,
  getCaseType: PropTypes.func.isRequired,
  DeleteCase: PropTypes.func.isRequired,
  getmessages: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  caseData: state.caseData,
  chatData: state.chatData
});
export default connect(
  mapStatesToProps,
  { registerCase, getCase_Client, getmessages, addmessage, getCaseType, DeleteCase, UpdateCase }
)(withRouter(Register));