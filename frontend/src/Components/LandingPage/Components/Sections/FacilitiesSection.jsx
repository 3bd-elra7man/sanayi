import React from "react";
import Workspace from "../../../../images/WorkSpace.jpg"
import LearningCenter from "../../../../images/LearningCenter.jpg"
import OnlinePlatform from "../../../../images/OnlinePlatform.jpg"
import InnovationHub from "../../../../images/InnovationHub.jpg"

function FacilitiesSection() {
  return (
    <section className="mb-16 relative">
      <div className="absolute inset-0 bg-blue-500 bg-opacity-10 blur-3xl -z-10"></div>
      <h3 className="text-3xl font-bold mb-8 text-center text-emerald-300">
        Our Facilities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Community Spaces",
            description: "Safe spaces for meetings and collaborations",
            image: `${Workspace}`,
          },
          {
            title: "Learning Centers",
            description: "Equipped spaces for classes and workshops",
            image: `${LearningCenter}`,
          },
          {
            title: "Online Platform",
            description: "24/7 access to our services and community",
            image: `${OnlinePlatform}`,
          },
          {
            title: "Innovation Hub",
            description: "Collaborative space for creative projects",
            image: `${InnovationHub}`,
          },
        ].map((facility, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-48 object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h4 className="text-xl font-semibold mb-2 text-emerald-300">
                {facility.title}
              </h4>
              <p className="text-green-100 opacity-0 group-hover:opacity-100 transition duration-300">
                {facility.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FacilitiesSection;
