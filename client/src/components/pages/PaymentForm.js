import React, { Component } from 'react';
import { GetPaymentsRequestsClient, DeletePaymentRequest } from "../../actions/PaymentAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import { Link } from "react-router-dom";

class PaymentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      cardBrand: "",
      amount:global.MyAmount,
      marchent:global.MyName,
      accountNo:"",
      nonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false
    }
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  requestCardNonce(){
    this.paymentForm.requestCardNonce();
  }

  componentDidMount(){
    const config = {
      applicationId: "sq0idp-rARHLPiahkGtp6mMz2OeCA",
      locationId: "GMT96A77XABR1",
      inputClass: "sq-input",
      requestId:"12344",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "16px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "1.15em",
          placeholderColor: "#000",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      googlePay: {
        elementId: 'sq-google-pay'
      },
      callbacks: {
        methodsSupported: (methods) => {
          if(methods.googlePay){
            this.setState({
              googlePay: methods.googlePay
            })
          }
          return;
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            requestId:"61acd308827a5426cc0ad8cc",
            returnUrl:"61acd308827a5426cc0ad8cc",
            currencyCode: "PKR",
            countryCode: "PK",
            total: {
              label: global.MyName,
              amount: global.MyAmount,
              pending: false
            }
          };
        },
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function(error) {
              console.log("123" + error.message);
            });

            return;
          }
          this.setState({
            nonce: nonce
          })
        },
        unsupportedBrowserDetected: () => {
        },
        inputEventReceived: (inputEvent) => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              document.getElementById("error").innerHTML =
                "Please fix card information errors before continuing.";
              break;
            case "errorClassRemoved":
              document.getElementById("error").style.display = "none";
              break;
            case "cardBrandChanged":
              if(inputEvent.cardBrand !== "unknown"){
                this.setState({
                  cardBrand: inputEvent.cardBrand
                })
              } else {
                this.setState({
                  cardBrand: ""
                })
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        },
        paymentFormLoaded: function() {
          document.getElementById('name').style.display = "inline-flex";
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  render(){
    return (
      <div className="container">
        <h1 className="display-4 text-center">Are You Sure!</h1>
        <p className="lead text-center">You want to pay : {global.MyAmount}</p>
        <p className="lead text-center">Your Lawyer : {global.MyName}</p>
        <p className="lead text-center">Your Lawyer_ID : {global.lawyer_ID}</p>
            <br />
        <div id="form-container">
          <div id="sq-walletbox">
            <button style={{display: (this.state.googlePay) ? 'inherit': 'none'}}
                    className="wallet-button"
                    id="sq-google-pay"></button>
            <hr />
          </div>
          </div>

          <div id="sq-ccbox">
            <div id="cc-field-wrapper">
              <div id="sq-card-number"></div>
              <div id="name"></div>
              <div id="sq-cvv"></div>
            </div>
            <div  id="sq-postal-code"></div>
          </div>
        <p style={styles.center} id="error"></p>
      </div>
    )
  }
}
PaymentForm.propTypes = {
  DeletePaymentRequest: PropTypes.func.isRequired,
  GetPaymentsRequestsClient: PropTypes.func.isRequired,
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
  { DeletePaymentRequest, GetPaymentsRequestsClient }
)(withRouter(PaymentForm));

const styles = {
  name: {
    verticalAlign: 'top',
    display: 'none',
    margin: 0,
    border: 'none',
    fontSize: "16px",
    fontFamily: "Helvetica Neue",
    padding: "16px",
    color: "#373F4A",
    backgroundColor: "transparent",
    lineHeight: "1.15em",
    placeholderColor: "#000",
    _webkitFontSmoothing: "antialiased",
    _mozOsxFontSmoothing: "grayscale",
  },
  leftCenter: {
    float: 'left',
    textAlign: 'center'
  },
  blockRight: {
    display: 'block',
    float: 'right'
  },
  center: {
    textAlign: 'center'
  }
}

