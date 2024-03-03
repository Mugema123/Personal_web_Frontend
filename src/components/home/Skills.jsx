import React from "react";
import { useFetcher } from "../../api";
import DataChecker from "../global/DataChecker";

const Skills = () => {
  const {
    data: skills,
    isLoading,
    isError,
  } = useFetcher("/skills/getAllSkills");

  return (
    <section id="skills" className="py-10 bg-gray-800 relative">
      <div className="mt-8 text-gray-100 text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="text-cyan-600">Skills</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">My knowledge</p>
        <DataChecker
          title="Skills"
          isLoading={isLoading}
          isError={isError}
          isWhiteMode={true}
          isEmpty={!isLoading && !isError && skills?.allSkills?.length === 0}
        >
          <div className="flex items-center justify-center mt-12 max-w-6xl mx-auto gap-5 flex-wrap">
            {skills?.allSkills?.map((skill, index) => (
              <div key={index} className="app__skills-item app__flex">
                <div
                  className="app__flex"
                  style={{ backgroundColor: "whitesmoke" }}
                >
                  <img src={skill.image} alt={skill.name} />
                </div>
                <p className="p-text">{skill.name}</p>
              </div>
            ))}
          </div>
        </DataChecker>
      </div>
    </section>
  );
};

export default Skills;
