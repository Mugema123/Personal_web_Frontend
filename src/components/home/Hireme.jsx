import React from "react";
import hireMe from "../../assets/images/mugemaHireme.png";
const Hireme = () => {
  const handleClick = () => {
    const element = document.getElementById("contact");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hireme" className="py-10 px-3 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          Hire <span className="text-cyan-600">Me</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">Do you have any work?</p>
      </div>
      <div className="bg-gray-700 relative px-8 rounded-2xl py-5 lg:max-w-4xl mx-auto min-h-[24rem] mt-24 flex gap-6 lg:flex-row flex-col-reverse items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Do you want any work from me?
          </h2>
          <p className="lg:text-left text-justify max-w-lg text-sm mt-4 text-gray-200 leading-6">
            If you have any work that you would like me to do, please feel free
            to contact me. I am always looking for new opportunities to learn
            and grow, and I am confident that I can provide valuable
            contributions to any team. I am a dedicated and results-driven
            professional with a passion for developing innovative solutions to
            complex problems.
          </p>
          <button onClick={handleClick} className="btn-primary mt-10">
            Hire me
          </button>
        </div>
        <img
          src={hireMe}
          alt=""
          className="lg:h-[32rem] h-80 lg:absolute bottom-0 -right-3 object-cover"
        />
      </div>
    </section>
  );
};

export default Hireme;
