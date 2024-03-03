import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useFetcher } from "../../api";
import DataChecker from "../global/DataChecker";

const Project = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useFetcher("/projects/getAllProjects");

  return (
    <section id="projects" className="py-10 text-white">
      <div className="text-center">
        <h3 className="text-4xl font-semibold">
          My <span className="text-cyan-600">Projects</span>
        </h3>
        <p className="text-gray-400 mt-3 text-lg">My awesome works</p>
      </div>
      <br />
      <DataChecker
        title="Projects"
        isLoading={isLoading}
        isError={isError}
        isWhiteMode={true}
        isEmpty={!isLoading && !isError && projects?.allAvailableProjects?.length === 0}
      >
        <div className="flex max-w-6xl gap-6 px-5 mx-auto items-center relative">
          <div className="w-full">
            <Swiper
              slidesPerview={1.2}
              spaceBetween={20}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
              }}
              loop={true}
              autoplay={{
                delay: 3000,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
            >
              {projects?.allAvailableProjects?.map((project_info, i) => (
                <SwiperSlide key={i}>
                  <div className="h-fit w-full p-4 bg-slate-700 rounded-xl">
                    <img
                      src={project_info?.projectImage}
                      alt=""
                      className="rounded-lg"
                    />
                    <h3 className="text-xl my-4">{project_info?.title}</h3>
                    <div className="flex gap-3">
                      <a
                        href={project_info?.githubLink}
                        target="_blank"
                        className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                      >
                        Github
                      </a>
                      <a
                        href={project_info?.demoLink}
                        target="_blank"
                        className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </DataChecker>
    </section>
  );
};

export default Project;
