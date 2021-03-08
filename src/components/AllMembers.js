import React, { useEffect, useState, Fragment } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Container, Button } from "react-bootstrap";
import Transactions from "./member_detail_components/Transactions";
import MemberJumbo from "./member_detail_components/MemberJumbo";

const AllMembers = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });

  const [memberDetail, setMemberDetail] = useState(false);

  const handleRowClick = (e) => {
    let selectedUser = props.allUsers.find(
      (user) => user.square.email === e.email
    );
    setMemberDetail(selectedUser);
  };

  const calculateCommitStatus = (user) => {
    let bottlesPurchased = 0;
    user.transactions?.forEach((transaction) => {
      transaction.line_items?.forEach((line_item) => {
        bottlesPurchased += parseInt(line_item.quantity);
      });
    });
    return bottlesPurchased - user.db.commit_count;
  };

  const createRowData = () => {
    const rows = props.allUsers.map((user) => {
      return {
        name: `${user.square.given_name} ${user.square.family_name}`,
        email: user.square.email,
        membership: user.square.membership_level,
        commit: calculateCommitStatus(user),
        clickEvent: handleRowClick,
      };
    });
    return {
      columns: [
        {
          label: "Name",
          field: "name",
          width: 150,
        },
        {
          label: "Email",
          field: "email",
          width: 150,
        },
        {
          label: "Membership",
          field: "membership",
          width: 150,
        },
        {
          label: "Commitment Status",
          field: "commit",
          width: 150,
        },
      ],
      rows: rows,
    };
  };

  return (
    <Fragment>
      <Container>
        <div style={{ display: memberDetail && "none" }}>
          <h2 className="mt-4">All Members</h2>
          {props.allUsers ? (
            <MDBDataTableV5
              hover
              striped
              materialSearch
              pagingTop
              searchTop
              searchBottom={false}
              entriesOptions={[10, 25, 50]}
              pagesAmount={4}
              data={createRowData()}
            />
          ) : (
            <h3>Retrieving Data from Square...</h3>
          )}
        </div>
      </Container>
      <div style={{ display: !memberDetail && "none" }}>
        {/* <Button className="mb-4" onClick={() => setMemberDetail(false)}>
          Back to All Members
        </Button>
        <h2>{`${memberDetail?.square?.given_name} ${memberDetail?.square?.family_name}`}</h2>
        <hr /> */}
        {memberDetail && (
          <MemberJumbo
            name={`${memberDetail.square.given_name} ${memberDetail.square.family_name}`}
            membership={memberDetail.square.membership_level}
            thisUserData={memberDetail}
            admin={true}
          />
        )}
        <Container>
          <Button className="mb-4" onClick={() => setMemberDetail(false)}>
            Back to All Members
          </Button>
          {memberDetail && <Transactions thisUserData={memberDetail} />}
        </Container>
      </div>
    </Fragment>
  );
};

export default AllMembers;
