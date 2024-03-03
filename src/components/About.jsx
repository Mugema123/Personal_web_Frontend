import React from "react";
import aboutImg from "../assets/images/mugema.jpg";
const About = () => {
  const info = [
    { text: "Years experience", count: "04" },
    { text: "Completed Projects", count: "24" },
    { text: "Companies Work", count: "06" },
  ];
  return (
    <section id="about" className="py-10 text-white">
      <div className="text-center mt-8">
        <h3 className="text-4xl font-semibold">
          About <span className="text-cyan-600">Me</span>
        </h3>
        <p className="text-gray-400 my-3 text-lg">My introduction</p>
        <div className="flex md:flex-row flex-col-reverse items-center md:gap-6 gap-12 px-10 max-w-6xl mx-auto">
          <div className="p-2">
            <div className="text-gray-300 my-3">
              <p className="text-justify leading-7 w-11/12 mx-auto">
                I am a highly skilled software developer, deep learning
                developer, and data scientist with a Master's degree in
                Electrical and Computer Engineering from Carnegie Mellon
                University. I have extensive experience working on various
                projects in these fields, and I am confident in my ability to
                provide valuable contributions to any team. My educational
                background in Electrical and Computer Engineering, along with my
                hands-on experience in the industry, has provided me with a
                strong foundation in the latest technologies and methodologies.
                I am a dedicated and results-driven professional with a passion
                for developing innovative solutions to complex problems.
              </p>
              <div className="flex mt-10 items-center gap-7">
                {info.map((content) => (
                  <div key={content.text}>
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">
                      {content.count}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">{content.text}</span>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <a href="./src/assets/MugemaCV.pdf" download>
                <button className="btn-primary">Download CV</button>
              </a>
            </div>
          </div>
          <div className="flex-1 md:mt-0 mt-6 flex justify-center items-center">
            <div className="lg:w-96 h-full relative sm:w-10/12 w-11/12 max-w-sm aboutImg ">
              <div className="about__me-image">
                <img src={aboutImg} alt="Steve Ndicunguye" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
