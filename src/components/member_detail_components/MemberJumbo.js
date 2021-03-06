import React from "react";
import { Jumbotron } from "react-bootstrap";

const MemberJumbo = (props) => {
  return (
    <Jumbotron className="member-jumbo">
      <h2>Welcome back, {`${props.name}`}</h2>
      <h3>
        <span className={`${props.membership}`}>{`${props.membership}`}</span>{" "}
        Member
      </h3>
    </Jumbotron>
  );
};

export default MemberJumbo;
