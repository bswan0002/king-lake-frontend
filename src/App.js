import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInOrSignUp from "./components/SignInOrSignUp";
import MyNav from "./components/MyNav";
import AllMembers from "./components/AllMembers";
import Orders from "./components/Orders";
import Emails from "./components/Emails";
import MemberDetails from "./components/MemberDetails";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    user: null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
  };

  componentDidMount() {
    if (sessionStorage.token) {
      this.setUserFromValidated();
    } else {
      this.setState({
        user: null,
      });
    }
  }

  setUserFromValidated = async () => {
    const validatedUser = await this.fetchUserByToken();
    this.setState({
      user: validatedUser,
    });
  };

  fetchUserByToken = () => {
    return fetch("http://localhost:3000/api/v1/persist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    })
      .then((res) => {
        return res.ok && res.json();
      })
      .then((user) => {
        return user;
      });
  };

  fetchAllCustomers = () => {
    fetch("http://localhost:3000/api/v1/all-customers")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data });
        localStorage.setItem("userData", JSON.stringify(data));
      });
  };

  fetchThisMember = (square_id) => {
    fetch(`http://localhost:3000/api/v1/members/${square_id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data });
        localStorage.setItem("userData", JSON.stringify(data));
      });
  };

  signIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user["status"] === 400) {
          alert(user["error"]);
        } else {
          e.target.reset();
          this.setState({
            user: user.user,
          });
          sessionStorage.setItem("token", user.jwt);
          this.roleCheck("admin", user.user) && this.fetchAllCustomers();
          this.roleCheck("member", user.user) &&
            this.fetchThisMember(user.user.square_id);
        }
      });
  };

  signUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user["status"] === 500) {
          alert(user["error"]);
        } else {
          e.target.reset();
          this.setState({
            user: user.user,
          });
          sessionStorage.setItem("token", user.jwt);
        }
      });
  };

  handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.setState({ user: null, userData: null });
  };

  roleCheck = (role, user = this.state.user) => {
    return user?.roles?.some((userRole) => userRole.role_type === role);
  };

  checkRoleFromValidated = async (role) => {
    const validatedUser = await this.fetchUserByToken();
    const isValidUserRole = this.roleCheck(role, validatedUser);
    if (!isValidUserRole) {
      this.setState({
        user: null,
      });
    }
    return isValidUserRole;
  };

  render() {
    return (
      <Fragment>
        <Router>
          <MyNav
            roleCheck={this.roleCheck}
            user={this.state.user}
            handleSignOut={this.handleSignOut}
          />
          <Switch>
            {this.roleCheck("admin") ? (
              <Fragment>
                <Route path="/members">
                  <AllMembers
                    checkRole={this.checkRoleFromValidated}
                    allUsers={this.state.userData}
                  />
                </Route>
                <Route path="/orders">
                  <Orders checkRole={this.checkRoleFromValidated} />
                </Route>
                <Route path="/emails">
                  <Emails checkRole={this.checkRoleFromValidated} />
                </Route>
              </Fragment>
            ) : null}
            {this.roleCheck("member") ? (
              <Fragment>
                <Route path="/home">
                  <MemberDetails
                    role={"member"}
                    thisUser={this.state.user}
                    thisUserData={this.state.userData}
                  />
                </Route>
                {/* <Route path="/orders">
                  <Orders />
                </Route> */}
              </Fragment>
            ) : null}
            {!this.state.user ? (
              <Fragment>
                <Route path="/sign-in">
                  <SignInOrSignUp
                    formType="Sign In"
                    handleSubmit={this.signIn}
                  />
                </Route>
                <Route path="/sign-up">
                  <SignInOrSignUp
                    formType="Sign Up"
                    handleSubmit={this.signUp}
                  />
                </Route>
                <Redirect from="/members" to="/" />
                <Redirect from="/orders" to="/" />
                <Redirect from="/emails" to="/" />
                <Redirect from="/sign-out" to="/" />
              </Fragment>
            ) : (
              <Fragment>
                <Redirect from="sign-in" to="/" />
                <Redirect from="sign-up" to="/" />
              </Fragment>
            )}
          </Switch>
        </Router>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default App;
