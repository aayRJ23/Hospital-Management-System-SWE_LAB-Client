import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to MedConnect | Your Health, Our Priority"}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
