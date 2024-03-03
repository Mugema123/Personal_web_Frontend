import React from "react";

const servicesArray = [
  {
    title: "Deep Learning",
    description:
      "I use neural networks and other techniques to analyze and make predictions from large amounts of data. I design and implement deep learning architectures, train and fine-tune models, and deploy them to production environments. I monitor and improve the performance of models and work in a variety of industries to solve complex problems. I work in collaboration with data scientists and software developers to integrate deep learning models into larger systems.",
  },
  {
    title: "Data Science",
    description:
      "I use statistical and machine learning techniques to extract insights from large amounts of data. I analyze and interpret complex data, create predictive models, and communicate my findings to stakeholders. I work in a variety of industries, such as finance, healthcare, and retail, to solve business problems and drive decision making. I use a variety of tools and technologies, such as Python, and SQL, to clean, manipulate and visualize data.",
  },
  {
    title: "App Development",
    description:
      "As Softwareing  and implement new features. As Web develope, I specialize in the development of websites and web applications, I use languages such as HTML, CSS, JavaScript, and PHP to create and design web pages, and they use frameworks like React, Angular to build interactive web applications. I work closely with designers, project managers, and other developers to ensure that their code is functional, efficient and secure.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-10 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="text-cyan-600">Services</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">What I provide</p>
      </div>
      <br />
    <div className="flex flex-col items-center w-full bg-no-repeat bg-cover bg-right-bottom p-8 py-6 md:py-12">
      <div className="flex flex-col max-w-6xl mx-auto">
        <div className="grid gap-10 md:gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {servicesArray.map((service, index) => (
            <div key={index} className="relative flex flex-col pt-2 pb-8 -translate-x-4 sm:translate-x-0">
              <div
                className="z-10 flex h-full flex-col bg-gray-700 rounded-xl p-8 md:p-12"
                data-aos="zoom-in"
              >
                <h1 className="font-semibold text-xl tracking-wide">
                  {service.title}
                </h1>
                <p className="mt-3 md:mt-4 text-sm text-gray-200">
                  {service.description}
                </p>
              </div>
              <div className="-rotate-2 translate-x-6 z-0 top-0 left-0 absolute flex-grow w-full h-full bg-cyan-600 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default Services;
