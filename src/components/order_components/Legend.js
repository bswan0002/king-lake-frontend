import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Legend = () => {
  return (
    <div className="d-flex">
      <div className="mx-2">
        Prepared <FontAwesomeIcon icon={faCircle} className="prepared" />
      </div>
      <div className="mx-2">
        Paid for <FontAwesomeIcon icon={faCircle} className="paid_for" />
      </div>
      <div className="mx-2">
        Picked up <FontAwesomeIcon icon={faCircle} className="picked_up" />
      </div>
    </div>
  );
};

export default Legend;
