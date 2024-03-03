import React from "react";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Project from "./Project";
import Hireme from "./Hireme";
import Contact from "./Contact";
import Bot from "./Bot";
import Services from "./Services";

const HomePage = () => {
  return (
    <div>
      <Bot />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Hireme />
      <Project />
      <Contact />
    </div>
  );
};

export default HomePage;
