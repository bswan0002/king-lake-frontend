import React from "react";
import { Jumbotron } from "react-bootstrap";

const MemberJumbo = (props) => {
  return (
    <Jumbotron className="member-jumbo">
      <h2>Welcome back, {`${props.name}`}</h2>
      <h3>{`${props.membership}`} Member</h3>
    </Jumbotron>
  );
};

export default MemberJumbo;
