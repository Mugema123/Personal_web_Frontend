import React from "react";
import { useFetcher } from "../../api";
import DataChecker from "../global/DataChecker";

const Services = () => {
  const {
    data: services,
    isLoading,
    isError,
  } = useFetcher("/services/getAllServices");
  return (
    <section id="services" className="py-10 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="text-cyan-600">Services</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">What I provide</p>
      </div>
      <br />
      <DataChecker
        title="Services"
        isLoading={isLoading}
        isError={isError}
        isWhiteMode={true}
        isEmpty={!isLoading && !isError && services?.allServices?.length === 0}
      >
        <div className="flex flex-col items-center w-full bg-no-repeat bg-cover bg-right-bottom p-8 py-6 md:py-12">
          <div className="flex flex-col max-w-6xl mx-auto">
            <div className="grid gap-10 md:gap-16 sm:grid-cols-2 lg:grid-cols-3">
              {services?.allServices?.map((service, index) => (
                <div
                  key={index}
                  className="relative flex flex-col pt-2 pb-8 -translate-x-4 sm:translate-x-0"
                >
                  <div
                    className="z-10 flex h-full flex-col bg-gray-700 rounded-xl p-8 md:p-12"
                  >
                    <h1 className="font-semibold text-xl tracking-wide">
                      {service?.serviceTitle}
                    </h1>
                    <p className="mt-3 md:mt-4 text-sm text-gray-200">
                      {service?.serviceDescription}
                    </p>
                  </div>
                  <div className="-rotate-2 translate-x-6 z-0 top-0 left-0 absolute flex-grow w-full h-full bg-cyan-600 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DataChecker>
    </section>
  );
};

export default Services;
