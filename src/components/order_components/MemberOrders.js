// Libraries
import React, { useState, useEffect } from "react";
// Components
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";

const MemberOrders = ({ wines, fetchUserByToken, membershipLevel }) => {
  const [fetchAgain, setFetchAgain] = useState(1);
  const [orders, setOrders] = useState(false);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    fetchUserByToken().then((user) => fetchOrders(user.id));
  }, [fetchAgain]);

  const fetchOrders = (id) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`)
      .then((res) => res.json())
      .then((orderRes) => {
        setOrders(orderRes);
        setCompleted(() => {
          let completedOrders = {};
          orderRes.forEach((order) => {
            if (order.prepared && order.paid_for && order.picked_up) {
              completedOrders[order.id] = true;
            } else {
              completedOrders[order.id] = false;
            }
          });
          return completedOrders;
        });
      });
  };

  return (
    <div>
      <OrderForm
        wines={wines}
        fetchUserByToken={fetchUserByToken}
        membershipLevel={membershipLevel}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
      <hr />
      <OrderList orders={orders} completed={completed} />
    </div>
  );
};

export default MemberOrders;
