import React from "react";

const Skills = () => {
  const skills = [
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/34be54263e18fa2aea611c6b3b388b76e978e7d7-64x64.png",
      name: "Advance",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/37ae5c7e00f0a14cb7e3f7fb1a82d0b5ec5de27a-2560x1534.png",
      name: "Expect",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/64f3e20f8ad906d56dea96863b6db87fad6efb52-64x64.png",
      name: "Beginner",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/34be54263e18fa2aea611c6b3b388b76e978e7d7-64x64.png",
      name: "Advance",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/37ae5c7e00f0a14cb7e3f7fb1a82d0b5ec5de27a-2560x1534.png",
      name: "Expect",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/64f3e20f8ad906d56dea96863b6db87fad6efb52-64x64.png",
      name: "Beginner",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/34be54263e18fa2aea611c6b3b388b76e978e7d7-64x64.png",
      name: "Advance",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/37ae5c7e00f0a14cb7e3f7fb1a82d0b5ec5de27a-2560x1534.png",
      name: "Expect",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/64f3e20f8ad906d56dea96863b6db87fad6efb52-64x64.png",
      name: "Beginner",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/34be54263e18fa2aea611c6b3b388b76e978e7d7-64x64.png",
      name: "Advance",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/37ae5c7e00f0a14cb7e3f7fb1a82d0b5ec5de27a-2560x1534.png",
      name: "Expect",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/64f3e20f8ad906d56dea96863b6db87fad6efb52-64x64.png",
      name: "Beginner",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/34be54263e18fa2aea611c6b3b388b76e978e7d7-64x64.png",
      name: "Advance",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/37ae5c7e00f0a14cb7e3f7fb1a82d0b5ec5de27a-2560x1534.png",
      name: "Expect",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/64f3e20f8ad906d56dea96863b6db87fad6efb52-64x64.png",
      name: "Beginner",
    },
    {
      logo: "https://cdn.sanity.io/images/8pxlhxp7/production/66bbf9242b1ccffebb5d46f376f5036b527fad48-480x480.png",
      name: "Intermediate",
    },
  ];
  return (
    <section id="skills" className="py-10 bg-gray-800 relative">
      <div className="mt-8 text-gray-100 text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="text-cyan-600">Skills</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">My knowledge</p>
        <div className="flex items-center justify-center mt-12 max-w-6xl mx-auto gap-5 flex-wrap">
          {skills?.map((skill, i) => (
            <div className="app__skills-item app__flex" key={skill.name}>
              <div
                className="app__flex"
                style={{ backgroundColor: "whitesmoke" }}
              >
                <img src={skill.logo} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
