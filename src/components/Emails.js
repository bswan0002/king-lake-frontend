import React, { Fragment, useEffect } from "react";

const Emails = (props) => {
  useEffect(() => {
    props.checkRole("admin");
  });
  return (
    <Fragment>
      <div>Emails</div>
    </Fragment>
  );
};

export default Emails;
