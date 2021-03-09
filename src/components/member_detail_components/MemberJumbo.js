import React from "react";
import { Jumbotron } from "react-bootstrap";
import HandleDate from "../order_components/HandleDate";

const MemberJumbo = (props) => {
  const calculateCommitStatus = (user) => {
    let bottlesPurchased = 0;
    user.transactions?.forEach((transaction) => {
      transaction.line_items?.forEach((line_item) => {
        bottlesPurchased += parseInt(line_item.quantity);
      });
    });
    if (bottlesPurchased - user.db.commit_count > 1) {
      return `${bottlesPurchased - user.db.commit_count} bottles ahead `;
    } else if (bottlesPurchased - user.db.commit_count === 1) {
      return `${bottlesPurchased - user.db.commit_count} bottle ahead `;
    } else if (bottlesPurchased - user.db.commit_count === -1) {
      return `${Math.abs(
        bottlesPurchased - user.db.commit_count
      )} bottle behind `;
    } else if (bottlesPurchased - user.db.commit_count < -1) {
      return `${Math.abs(
        bottlesPurchased - user.db.commit_count
      )} bottles behind `;
    } else {
      return `exactly caught up `;
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
        Member since <HandleDate date={props.thisUserData.square.created_at} />
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
          You are {calculateCommitStatus(props.thisUserData)}
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
