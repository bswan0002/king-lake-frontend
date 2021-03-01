import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Container } from "react-bootstrap";

const AllMembers = (props) => {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    props.checkRole("admin");
  });

  const handleRowClick = (e) => {
    console.log(e);
  };

  const datatable = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 150,
      },
      {
        label: "Membership",
        field: "membership",
        sort: "asc",
        width: 150,
      },
      {
        label: "Commitment Status",
        field: "commit",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [
      {
        name: "name1",
        email: "email1",
        membership: "gold",
        commit: "+4",
        clickEvent: handleRowClick,
      },
      {
        name: "name2",
        email: "email2",
        membership: "platinum",
        commit: "-2",
        clickEvent: handleRowClick,
      },
    ],
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
    </Container>
  );
};

export default AllMembers;
