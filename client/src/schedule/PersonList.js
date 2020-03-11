import React from "react";
import {useSelector} from "react-redux";
import store from "../store";
import {fetchPersons} from "./scheduleActions";
import Person from "./Person";

const PersonList = () => {

  React.useEffect(() => {
    store.dispatch(fetchPersons());
  }, []);

  const persons = useSelector(state => {
    console.log(state.schedule.persons);
    console.log(state.schedule);
    if (state.schedule.search_persons) {
      return state.schedule.persons.filter(person => {
        return person.id.toString().includes(state.schedule.search_persons);
      })
    }
    return state.schedule.persons;
  });

  return (
    <ul>
      {persons && persons.length
        ? persons.map((person) => {
          return <Person key={`person-${person.id}`} person={person} />;
        })
        : "No people"}
    </ul>
  )};

export default PersonList;
