import React from "react";

const Person = ({ person }) => {

  return (
    <li>
      <span>
        {person.id} {person.firstName} {person.lastName}
      </span>
    </li>)
};

export default Person;
