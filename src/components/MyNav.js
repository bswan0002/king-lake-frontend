// Libraries
import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MyNav = (props) => {
  return (
    <Fragment>
      <Navbar bg="dark-gray" variant="dark">
        <LinkContainer exact to="/">
          <Navbar.Brand>
            <img
              src={process.env.PUBLIC_URL + `/king-lake-logo.png`}
              width="160"
              alt="King Lake Cellars Logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          {props.roleCheck("admin") ? (
            <Fragment>
              <LinkContainer to="/members">
                <Nav.Link>Members</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/orders">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/events">
                <Nav.Link>Events</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : null}
          {props.roleCheck("member") ? (
            <Fragment>
              <LinkContainer to="/membership">
                <Nav.Link>Membership</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/orders">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/events">
                <Nav.Link>Events</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : null}
        </Nav>
        <Nav>
          {!props.user ? (
            <Fragment>
              <LinkContainer to="sign-in">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="sign-up">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Fragment>
          ) : (
            <LinkContainer to="sign-out">
              <Nav.Link onClick={props.handleSignOut}>Sign Out</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
    </Fragment>
  );
};
export default MyNav;
