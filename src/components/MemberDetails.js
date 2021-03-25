// Libraries
import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
// Components
import MemberJumbo from "./member_detail_components/MemberJumbo";
import Transactions from "./member_detail_components/Transactions";

const MemberDetails = (props) => {
  return (
    <Fragment>
      {props.role === "member" ? (
        <MemberJumbo
          name={props.thisUserData?.square?.given_name}
          membership={props.thisUserData?.square?.membership_level}
          thisUserData={props.thisUserData}
          admin={false}
        />
      ) : null}
      <Container>
        <Transactions
          thisUser={props.thisUser}
          thisUserData={props.thisUserData}
        />
      </Container>
    </Fragment>
  );
};

export default MemberDetails;
