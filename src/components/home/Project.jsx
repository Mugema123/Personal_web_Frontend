import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import { useFetcher } from "../../api";
import DataChecker from "../global/DataChecker";
import PopupModal from "../global/PopupModal";

const Project = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useFetcher("/projects/getAllProjects");
  const [openModal, setOpenModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentProject(null);
  };

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
        isEmpty={
          !isLoading && !isError && projects?.allAvailableProjects?.length === 0
        }
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
                delay: 5000,
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
                      className="rounded-lg h-48 object-cover w-full"
                    />
                    <h3 className="text-xl my-4">{project_info?.title}</h3>
                    <div className="flex gap-3">
                      {project_info?.githubLink &&
                        project_info?.githubLink !== "" && (
                          <a
                            href={project_info?.githubLink}
                            target="_blank"
                            className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                          >
                            Github
                          </a>
                        )}
                      {project_info?.demoLink &&
                        project_info?.demoLink !== "" && (
                          <a
                            href={project_info?.demoLink}
                            target="_blank"
                            className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                          >
                            Live Demo
                          </a>
                        )}
                      {project_info?.description &&
                        project_info?.description !== "" && (
                          <span
                            onClick={() => {
                              setOpenModal(true);
                              setCurrentProject(project_info);
                            }}
                            className="text-cyan-600 cursor-pointer bg-gray-800 px-2 py-1 inline-block"
                          >
                            Description
                          </span>
                        )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </DataChecker>

      <PopupModal
        onClose={handleCloseModal}
        show={openModal}
        title={"Project Description"}
      >
        <div className="flex gap-5 items-center h-fit w-fullrounded-xl">
          <img
            src={currentProject?.projectImage}
            alt=""
            className="rounded-2xl w-24 h-24 object-cover"
          />
          <div>
            <h3 className="text-xl mb-4">{currentProject?.title}</h3>
            <div className="flex gap-3">
              {currentProject?.githubLink &&
                currentProject?.githubLink !== "" && (
                  <a
                    href={currentProject?.githubLink}
                    target="_blank"
                    className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                  >
                    Github
                  </a>
                )}
              {currentProject?.demoLink && currentProject?.demoLink !== "" && (
                <a
                  href={currentProject?.demoLink}
                  target="_blank"
                  className="text-cyan-600 bg-gray-800 px-2 py-1 inline-block"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
        <p className="my-4">
          {currentProject?.description}
        </p>
        <div className="flex justify-end space-x-2 text-sm text-white">
          <button
            className="bg-red-400 rounded-md text-md px-4 py-1 hover:shadow-lg mx-4 my-2"
            onClick={() => handleCloseModal()}
          >
            Close
          </button>
        </div>
      </PopupModal>
    </section>
  );
};

export default Project;
