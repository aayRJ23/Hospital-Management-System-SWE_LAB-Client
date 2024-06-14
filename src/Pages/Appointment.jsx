import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import "./Appointment.css"

const Appointment = () => {
  return (
    <>
      {/* <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      /> */}
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
