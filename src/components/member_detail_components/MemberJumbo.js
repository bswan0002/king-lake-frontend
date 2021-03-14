import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import HandleDate from "../order_components/HandleDate";

const MemberJumbo = (props) => {
  const [adjustments, setAdjustments] = useState([]);

  const fetchAdjustments = () => {
    fetch(
      `http://localhost:3000/api/v1/commit-adjustments/${props.thisUserData?.db?.id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((adjustmentRes) => setAdjustments(adjustmentRes));
  };

  const adjustTotal = () => {
    return adjustments.reduce((total, adjustment) => {
      return total + parseInt(adjustment.adjustment);
    }, 0);
  };

  useEffect(() => {
    fetchAdjustments();
  }, [props.thisUserData?.db?.commit_adjustments]);

  const calculateCommitStatus = (user) => {
    console.log(adjustTotal());
    let bottlesPurchased = 0;
    if (user) {
      user.transactions?.forEach((transaction) => {
        transaction.line_items?.forEach((line_item) => {
          bottlesPurchased += parseInt(line_item.quantity);
        });
      });
      if (bottlesPurchased - user.db?.commit_count + adjustTotal() > 1) {
        return `${
          bottlesPurchased - user.db?.commit_count + adjustTotal()
        } bottles ahead `;
      } else if (
        bottlesPurchased - user.db?.commit_count + adjustTotal() ===
        1
      ) {
        return `${
          bottlesPurchased - user.db?.commit_count + adjustTotal()
        } bottle ahead `;
      } else if (
        bottlesPurchased - user.db?.commit_count + adjustTotal() ===
        -1
      ) {
        return `${Math.abs(
          bottlesPurchased - user.db?.commit_count + adjustTotal()
        )} bottle behind `;
      } else if (
        bottlesPurchased - user.db?.commit_count + adjustTotal() <
        -1
      ) {
        return `${Math.abs(
          bottlesPurchased - user.db?.commit_count + adjustTotal()
        )} bottles behind `;
      } else {
        console.log(adjustTotal());
        return `exactly caught up `;
      }
    }
  };

  return (
    <Jumbotron className="member-jumbo">
      {props.admin ? (
        <h2 className="jumbo-name">{`${props.name}`}</h2>
      ) : (
        <h2>Welcome back, {`${props.name}`}</h2>
      )}

      <h3>
        <span className={`${props.membership}`}>{`${props.membership}`}</span>{" "}
        Member since{" "}
        <HandleDate date={props.thisUserData?.square?.created_at} />
      </h3>
      {props.admin ? (
        <h4>
          Is {calculateCommitStatus(props.thisUserData)}
          on their{" "}
          {props.membership === "Platinum"
            ? "2 bottle/month"
            : "1 bottle/month"}{" "}
          commitment
        </h4>
      ) : (
        <h4>
          You are{" "}
          {props?.thisUserData && calculateCommitStatus(props.thisUserData)}
          on your{" "}
          {props.membership === "Platinum"
            ? "2 bottle/month"
            : "1 bottle/month"}{" "}
          commitment
        </h4>
      )}
    </Jumbotron>
  );
};

export default MemberJumbo;
