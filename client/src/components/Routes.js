import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./layout/Home";
import Register from "./auth/Register";
import RegisterLawyer from "./auth/RegisterLawyer";
import Login from "./auth/Login";
import Lawyer_Login from "./auth/Lawyer_Login";
import Dashboard from "./pages/Dashboard";
import GuestLawyer from "./pages/GuestLawyer";
import GuestClient from "./pages/GuestClient";
import Lawyer_Dashboard from "./pages/Lawyer_Dashboard";
import PrivateRoute from './common/PrivateRoute';
import Contactus from "./pages/Contactus";
import NewPaymentReq from "./pages/NewPaymentReq";
import Cases from "./pages/Cases";
import ClientPayments from "./pages/ClientPayments";
import Lawyers from "./pages/Lawyers";
import Reviews from "./pages/Reviews";
import Dictionary from "./pages/Dictionary";
import DictionaryClient from "./pages/DictionaryClient";
import ClientFeedbacks from "./pages/ClientFeedbacks";
import Pay from "./pages/Pay";
import PayEasypaisa from "./pages/PayEasypaisa";
import LawyerFeedbacks from "./pages/LawyerFeedbacks";
import Payments from "./pages/Payments";
import MyReviews from "./pages/MyReviews";
import Chat from "./pages/Chat";
import MyRequestsClient from "./pages/MyRequestsClient";
import PaymentStatus from "./pages/PaymentStatus";
import ChatClient from "./pages/ChatClient";
import MyPaymentRequests from "./pages/MyPaymentRequests";
import AddNewLaw from "./auth/AddNewLaw";
import EditCase from "./auth/EditCase";
import MyLaws from "./pages/MyLaws";
import SendCaseRequest from "./pages/SendCaseRequest";
import AddNewReview from "./pages/AddNewReview";
import Profile from "./pages/Profile";
import ProfileLawyer from "./pages/ProfileLawyer";
import AddNewCase from "./auth/AddNewCase";
import viewCase from   "./auth/viewCase";
import viewCaseClient from "./auth/viewCaseClient";
import CaseRequests from "./pages/CaseRequests";
class Routes extends Component {
    render() {
        return (
            < div className="App" >
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/GuestLawyer" component={GuestLawyer} />
                    <Route exact path="/GuestClient" component={GuestClient} />
                    <PrivateRoute exact path="/Lawyer_Dashboard" component={Lawyer_Dashboard} />
                    <PrivateRoute exact path="/Contactus" component={Contactus} />
                    <Route exact path="/AddNewReview" component={AddNewReview} />
                    <Route exact path="/RegisterLawyer" component={RegisterLawyer} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/Lawyer_Login" component={Lawyer_Login} />
                    <Route exact path="/Lawyers" component={Lawyers} />
                    <Route exact path="/SendCaseRequest" component={SendCaseRequest} />
                    <Route exact path="/PaymentStatus" component={PaymentStatus} />
                    <Route exact path="/Cases" component={Cases} />
                    <Route exact path="/MyRequestsClient" component={MyRequestsClient} />
                    <Route exact path="/ChatClient" component={ChatClient} />
                    <Route exact path="/NewPaymentReq" component={NewPaymentReq} />
                    <Route exact path="/Payments" component={Payments} />
                    <Route exact path="/Reviews" component={Reviews} />
                    <Route exact path="/LawyerFeedbacks" component={LawyerFeedbacks} />
                    <Route exact path="/ClientFeedbacks" component={ClientFeedbacks} />
                    <Route exact path="/MyReviews" component={MyReviews} />
                    <Route exact path="/AddNewLaw" component={AddNewLaw} />
                    <Route exact path="/EditCase" component={EditCase} />
                    <Route exact path="/MyLaws" component={MyLaws} />
                    <Route exact path="/MyPaymentRequests" component={MyPaymentRequests} />
                    <Route exact path="/Dictionary" component={Dictionary} />
                    <Route exact path="/DictionaryClient" component={DictionaryClient} />
                    <Route exact path="/Pay" component={Pay} />
                    <Route exact path="/PayEasypaisa" component={PayEasypaisa} />
                    <Route exact path="/ClientPayments" component={ClientPayments} />
                    <Route exact path="/Chat" component={Chat} />
                    <Route exact path="/AddNewCase" component={AddNewCase} />
                    <Route exact path="/CaseRequests" component={CaseRequests} />
                    <Route exact path="/viewCase" component={viewCase} />
                    <Route exact path="/viewCaseClient" component={viewCaseClient} />
                    <Route exact path="/Profile" component={Profile} />
                    <Route exact path="/ProfileLawyer" component={ProfileLawyer} />
                </Switch>
                <Footer />
            </div >
            

        )
    }

}

export default Routes;
