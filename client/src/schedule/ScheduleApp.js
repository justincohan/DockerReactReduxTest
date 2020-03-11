import React from "react";
import "../styles.css";
import Schedule from "./Schedule";
import PersonList from "./PersonList";
import CoachList from "./CoachList";

export default function ScheduleApp() {

  return (
    <div>
      <h1>Schedule</h1>
      <Schedule />
      <PersonList />
      <CoachList />

    </div>
  );
}
