import React, { Fragment, useEffect } from "react";

const AllMembers = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });
  return (
    <Fragment>
      <div>All Members</div>
    </Fragment>
  );
};

export default AllMembers;
