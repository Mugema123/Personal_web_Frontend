import React from "react";
import aboutImg from "../../assets/images/mugema.jpg";
import { useFetcher } from "../../api";
import DataChecker from "../global/DataChecker";

const About = () => {
  const {
    data,
    isLoading,
    isError,
  } = useFetcher("/about/getAboutContent");
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
        <DataChecker
        title="About Content"
        isLoading={isLoading}
        isError={isError}
        isWhiteMode={true}
        isEmpty={!isLoading && !isError && data?.aboutContent?.length === 0}
      >
        <div className="flex md:flex-row flex-col-reverse items-center md:gap-6 gap-12 px-10 max-w-6xl mx-auto">
          <div className="p-2">
            <div className="text-gray-300 my-3">
              <p className="text-justify leading-7 md:w-11/12 mx-auto">
                {data?.aboutContent?.[0]?.description}
              </p>
              <div className="flex mt-10 items-center gap-7">
                  <div>
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">
                      {data?.aboutContent?.[0]?.yearsOfExperience}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">Years experience</span>
                  </div>
                  <div>
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">
                      {data?.aboutContent?.[0]?.completedProjects}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">Completed Projects</span>
                  </div>
                  <div>
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">
                      {data?.aboutContent?.[0]?.companiesWork}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">Companies Work</span>
                  </div>
              </div>
              <br />
              <br />
              <a href={data?.aboutContent?.[0]?.cv} target="__blank" download>
                <button className="btn-primary">Download CV</button>
              </a>
            </div>
          </div>
          <div className="flex-1 md:mt-0 mt-6 flex justify-center items-center">
            <div className="lg:w-96 h-full relative sm:w-10/12 w-11/12 max-w-sm aboutImg ">
              <div className="about__me-image">
                <img src={data?.aboutContent?.[0]?.image} alt="Mugema" />
              </div>
            </div>
          </div>
        </div>
        </DataChecker>
      </div>
    </section>
  );
};

export default About;
