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
import MemberDetails from "./components/MemberDetails";
import Footer from "./components/Footer";
import Events from "./components/Events";
import Landing from "./Landing";

class App extends Component {
  state = {
    user: null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    wines: JSON.parse(localStorage.getItem("wines")) || null,
  };

  removeCommitAdjustment = (id) => {
    console.log("im in yr method");
    this.state.userData.forEach((user, index) => {
      console.log("im in yr loop");
      if (user.db.commit_adjustments.find((adj) => adj.id === parseInt(id))) {
        console.log("im in yr if");
        let newCommitAdjustments = user.db.commit_adjustments.filter(
          (adj) => adj.id !== parseInt(id)
        );
        let newUserData = [...this.state.userData];
        newUserData[index].db.commit_adjustments = newCommitAdjustments;
        this.setState({
          userData: newUserData,
        });
        localStorage.setItem("userData", JSON.stringify(newUserData));
      }
    });
  };

  addCommitAdjustment = (newCommit) => {
    console.log(newCommit);
    this.state.userData.forEach((user, index) => {
      if (user.db.id === newCommit.user_id) {
        let newCommitAdjustments = [...user.db.commit_adjustments];
        newCommitAdjustments.push(newCommit);
        let newUserData = [...this.state.userData];
        newUserData[index].db.commit_adjustments = newCommitAdjustments;
        this.setState({
          userData: newUserData,
        });
        localStorage.setItem("userData", JSON.stringify(newUserData));
      }
    });
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
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/persist`, {
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
    fetch(`${process.env.REACT_APP_API_BASE_URL}/all-customers`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data });
        localStorage.setItem("userData", JSON.stringify(data));
      });
  };

  fetchThisMember = (square_id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/members/${square_id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data });
        localStorage.setItem("userData", JSON.stringify(data));
      });
  };

  fetchWines = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/wines`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ wines: data });
        localStorage.setItem("wines", JSON.stringify(data));
      });
  };

  signIn = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
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
          if (this.roleCheck("member", user.user)) {
            this.fetchThisMember(user.user.square_id);
          }
          this.fetchWines();
        }
      });
  };

  signUp = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
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
    this.setState({ user: null, userData: null, wines: null });
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
        <div className="body">
          <Router>
            <MyNav
              roleCheck={this.roleCheck}
              user={this.state.user}
              handleSignOut={this.handleSignOut}
            />
            <Switch>
              {this.roleCheck("admin") && (
                <Fragment>
                  <Route exact path="/">
                    <Landing />
                  </Route>
                  <Route path="/members">
                    <AllMembers
                      checkRole={this.checkRoleFromValidated}
                      allUsers={this.state.userData}
                      fetchUserByToken={this.fetchUserByToken}
                      removeCommitAdjustment={this.removeCommitAdjustment}
                      addCommitAdjustment={this.addCommitAdjustment}
                    />
                  </Route>
                  <Route path="/orders">
                    <Orders
                      role="admin"
                      wines={this.state.wines}
                      userData={this.state.userData}
                    />
                  </Route>
                  <Route path="/events">
                    <Events admin={true} />
                  </Route>
                </Fragment>
              )}
              {this.roleCheck("member") ? (
                <Fragment>
                  <Route exact path="/">
                    <Landing />
                  </Route>
                  <Route path="/membership">
                    <MemberDetails
                      role={"member"}
                      thisUser={this.state.user}
                      thisUserData={this.state.userData}
                    />
                  </Route>
                  <Route path="/orders">
                    <Orders
                      role="member"
                      wines={this.state.wines}
                      fetchUserByToken={this.fetchUserByToken}
                      membershipLevel={
                        this.state.userData?.square?.membership_level
                      }
                    />
                  </Route>
                  <Route path="/events">
                    <Events admin={false} />
                  </Route>
                </Fragment>
              ) : null}
              <Fragment>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route path="/sign-in">
                  {!this.state.user ? (
                    <SignInOrSignUp
                      formType="Sign In"
                      handleSubmit={this.signIn}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Route path="/sign-up">
                  {!this.state.user ? (
                    <SignInOrSignUp
                      formType="Sign Up"
                      handleSubmit={this.signUp}
                    />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>
                <Redirect from="/members" to="/" />
                <Redirect from="/orders" to="/" />
                <Redirect from="/emails" to="/" />
                <Redirect from="/sign-out" to="/" />
              </Fragment>
            </Switch>
          </Router>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
