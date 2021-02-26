import React, { Fragment, useEffect } from "react";

const Orders = (props) => {
  const fetchCustomerGroups = () => {
    fetch("http://localhost:3000/api/v1/customer-groups")
      .then((res) => res.json())
      .then((data) => {
        debugger;
        console.log(data);
      });
  };

  useEffect(() => {
    props.checkRole("admin");
    fetchCustomerGroups();
  });

  return (
    <Fragment>
      <div>Orders</div>
    </Fragment>
  );
};

export default Orders;
