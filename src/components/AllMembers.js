import React, { useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Container } from "react-bootstrap";

const AllMembers = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });

  const handleRowClick = (e) => {
    console.log(e);
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
    <Container className="mt-4">
      <h2 onClick={() => console.log(createRowData())}>All Members</h2>
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
    </Container>
  );
};

export default AllMembers;
