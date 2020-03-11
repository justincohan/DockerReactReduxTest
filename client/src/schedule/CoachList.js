import React from "react";
import {useSelector} from "react-redux";
import store from "../store";
import Person from "./Person";
import {fetchCoaches} from "./scheduleActions";
import Coach from "./Coach";

const CoachList = () => {

  React.useEffect(() => {
    store.dispatch(fetchCoaches());
  }, []);

  const coaches = useSelector(state => {
    console.log(state.schedule);
    if (state.schedule.search_coaches) {
      return state.schedule.coaches.filter(person => {
        return person.id.toString().includes(state.schedule.search_coaches);
      })
    }
    return state.schedule.coaches;
  });

  return (
    <ul>
      {coaches && coaches.length
        ? coaches.map((coach) => {
          return <Coach key={`coach-${coach.id}`} coach={coach} />;
        })
        : "No coaches"}
    </ul>
  )};

export default CoachList;
