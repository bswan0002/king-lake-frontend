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

  return (
    <Container className="mt-4">
      <h2>All Members</h2>
      <MDBDataTableV5
        hover
        striped
        materialSearch
        pagingTop
        searchTop
        searchBottom={false}
        entriesOptions={[10, 25, 50]}
        pagesAmount={4}
        data={datatable}
      />
    </Container>
  );
};

export default AllMembers;
