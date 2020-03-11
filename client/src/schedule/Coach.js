import React from "react";

const Coach = ({ coach }) => {

  return (
    <li>
      <span>
        {coach.id} {coach.firstName} {coach.lastName}
      </span>
    </li>)
};

export default Coach;
